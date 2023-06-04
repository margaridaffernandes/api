import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Composition = () => {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [composition, setComposition] = useState('');
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setId(event.target.value);
  };

  const fetchComposition = async () => {
    try {
      const response = await axios.get(`/findjson/${id}`);
      const compositionData = response.data;
      console.log(compositionData)
      setComposition(compositionData);
      setError(null);
    } catch (error) {
      setComposition('');
      setError('Error: ' + error.message);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchComposition();
  };

  //direcionamento para forms
  useEffect(() => {
    if (Object.keys(composition).length > 0) {
      console.log(composition);
      navigate("/forms", { state: composition })

    }
  })

  return (
    <div>
      <h1 style={{ color: 'white', fontSize: '45px', textAlign: 'center', padding: '5px', marginBottom: '18px' }}>Episodes</h1>
      <form onSubmit={handleSubmit}>
        <label style={{ color: 'white', fontSize: '24px' }}>
          Episode ID:
        </label>
        <input type="text" value={id} onChange={handleInputChange} style={{ marginRight: '12px' }} />
        <button type="submit" style={{ color: 'white', fontSize: '24px', cursor: 'pointer', marginLeft: '8px' }}>Search the episode ID</button>
      </form>
      {error ? (
        <p style={{ color: 'white', fontSize: '24px', marginTop: '15px' }}>{error}</p>
      ) : composition ? (
        <pre style={{ color: 'white', fontSize: '24px', marginTop: '15px' }}>{JSON.stringify(composition, null, 2)}</pre>
      ) : (
        <p style={{ color: 'white', fontSize: '24px', marginTop: '15px' }}>No episode ID found yet.</p>
      )}
    </div>
  );
};

export default Composition;