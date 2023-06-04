import React, { useState } from 'react';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  return (
    <form action="/signup" method="post" className="form" style={{ backgroundColor: '#f2f2f2', border: '2px solid #ccc', borderRadius: '5px', padding: '20px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{ fontSize: '24px', textAlign: 'center', padding: '5px' }}>Signup</h2>
        <label>Username:
          <input type="text" name="username" value={username} onChange={handleUsernameChange} style={{ border: '1px solid #ddd', borderRadius: '3px', padding: '5px', marginBottom: '10px' }} />
        </label>
        <label>Email:
          <input type="text" name="email" value={email} onChange={handleEmailChange} style={{ border: '1px solid #ddd', borderRadius: '3px', padding: '5px', marginBottom: '10px' }} />
        </label>
        <label>Password:
          <input type="password" name="password" value={password} onChange={handlePasswordChange} style={{ border: '1px solid #ddd', borderRadius: '3px', padding: '5px' }} />
        </label>
        <button type="submit" style={{ marginTop: '10px' }}>Signup</button>
      </div>
    </form>
  );
}

export default Signup;

///npm start