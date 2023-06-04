import React, { useState } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  return (
    <form action="/login" method="post" className="form" style={{ backgroundColor: '#f2f2f2', border: '2px solid #ccc', borderRadius: '5px', padding: '20px' } } >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{ fontSize: '24px', textAlign: 'center', padding: '5px' }}>Login</h2>
        <label>Username:
          <input type="text" name="username" value={username} onChange={handleUsernameChange} style={{ border: '1px solid #ddd', borderRadius: '3px', padding: '5px', marginBottom: '10px' }} />
        </label>
        <label>Password:
          <input type="password" name="password" value={password} onChange={handlePasswordChange} style={{ border: '1px solid #ddd', borderRadius: '3px', padding: '5px' }} />
        </label>
        <button type="submit" style={{ marginTop: '10px' }}>Login</button>
      </div>
    </form>
  );
}

export default Login;

///npm start