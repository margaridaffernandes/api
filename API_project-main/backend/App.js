const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ObjectId = require('mongodb').ObjectId;
const app = express();
const mysql = require('mysql2');

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:9000/CAIBE", { useNewUrlParser: true });

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + 'index.html'))
})

const UserCredentials = mongoose.model('UserCredentials', new mongoose.Schema({
  _id: ObjectId,
  username: String,
  email: String,
  password: String
}), 'user_credentials');

app.post('/login', (req, res) => {
  console.log(req)
  const { username, password } = req.body;
  console.log('Received login request with username:', username, 'and password:', password);
  UserCredentials.findOne({ username: username, password: password })
    .then((user) => {
      console.log(user)
      if (user) {
        console.log('User found:', user);
        res.redirect('/dashboard')
      } else {
        console.log('User not found');
        res.send('Invalid username or password!');
      }
    })
    .catch(error => {
      console.log('Error: ', error);
      res.send('An error occurred!');
    });
});

app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;
  console.log('Received signup request with username:', username, ', email:', email, 'and password:', password);
  const newUserCredentials = new UserCredentials({
    _id: new mongoose.Types.ObjectId(),
    username,
    email,
    password
  });
  newUserCredentials.save()
    .then(() => {
      console.log('User registered:', newUserCredentials);
      res.redirect('/login')
    })
    .catch(error => {
      console.log('Error: ', error);
      res.send('An error occurred!');
    });
});

app.use(express.json());
const Compositions = mongoose.model('Compositions', new mongoose.Schema({
  composition_id: Number,
  items: Object

}), 'Compositions');


//to save the excel as a composition in mongo when the doctor makes the upload of the excel
app.post('/savejson', (req, res) => {
  const json = req.body;
  console.log(json);
  const newComposition = new Compositions({
    composition_id: json["items.0.0.items.0.value"],
    items: json

  });
  newComposition.save()
    .then(() => {
      console.log('Composition saved:', newComposition);
    })
    .catch(error => {
      console.log('Error: ', error);
      res.send('An error occurred while saving JSON to database');
    });
})


//to get only one composition for the patient with the number that the doctor searches for
app.get('/findjson/:id', (req, res) => {
  const Id = req.params.id;

  Compositions.findOne({ composition_id: Id })

    .then((composition) => {
      if (composition) {
        const json = composition.items;
        console.log(json);
        res.send(json);
      } else {
        console.log('Episode not found');
        res.send('Episode not found');
      }
    })
    .catch(error => {
      console.log('Error: ', error);
      res.send('An error occurred while fetching JSON');
    });
});

//to get all the compositions saved in our db
app.get('/alljson', (req, res) => {
  Compositions.find({})
    .then((compositions) => {
      if (compositions.length > 0) {
        console.log(compositions);
        res.send(compositions);
      } else {
        console.log('No forms found');
        res.send('No forms found');
      }
    })
    .catch((error) => {
      console.log('Error: ', error);
      res.send('An error occurred while fetching the forms');
    });
});


const connection = mysql.createConnection({
  host: "localhost",
  port: '3306',
  user: "root",
  password: "pessegosekiwis123",
  database: "projectAPI"
});

connection.connect((error) => {
  if (error) {
    console.error("Error connecting to MySQL database:", error);
  } else {
    console.log("Connected to MySQL database");
  }
});

app.get("/stats1", (req, res) => {
  const query1 = "SELECT `items.items.0.0.items.7.items.0.value.text`, COUNT(*) AS frequency FROM projectAPI.episodes GROUP BY `items.items.0.0.items.7.items.0.value.text`;"
  connection.query(query1, [], (error, results) => {
    if (error) {
      console.error("Error executing MySQL query:", error);
      res.status(500).send("An error occurred");
      return;
    }
    res.json(results);
  });
});

app.get("/stats2", (req, res) => {
  const query2 = "SELECT MONTH(`items.items.0.0.items.1.value.date`) AS month, COUNT(*) as frequency FROM projectAPI.episodes GROUP BY MONTH(`items.items.0.0.items.1.value.date`);"
  connection.query(query2, [], (error, results) => {
    if (error) {
      console.error("Error executing MySQL query:", error);
      res.status(500).send("An error occurred");
      return;
    }
    res.json(results);
  });
});

app.get("/stats3", (req, res) => {
  const query3 = "SELECT `items.items.0.0.items.2.value.text` AS options, COUNT(*) as frequency FROM projectAPI.episodes GROUP BY options;"
  connection.query(query3, [], (error, results) => {
    if (error) {
      console.error("Error executing MySQL query:", error);
      res.status(500).send("An error occurred");
      return;
    }
    res.json(results);
  });
});

app.get("/stats4", (req, res) => {
  const query4 = "SELECT `items.items.0.0.items.5.value.text` as urgencia, `items.items.0.2.items.4.items.1.value` as peso, `items.items.0.2.items.0.items.0.value.value` as temperatura FROM projectAPI.episodes WHERE `items.items.0.0.items.5.value.text` = 'Urgente';"
  connection.query(query4, [], (error, results) => {
    if (error) {
      console.error("Error executing MySQL query:", error);
      res.status(500).send("An error occurred");
      return;
    }
    res.json(results);
  });
});

const PORT = 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

///npm run dev
///state 05.05.