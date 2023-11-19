import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [state, setState] = useState(null);
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/test')
      .then((response) => {
        setState(response.data);
      })
      .catch((err) => {
        setState('Error');
        console.error(err);
      });
  }, []);
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>Test CORS and Axios: {state}</p>
      </header>
    </div>
  );
}

export default App;