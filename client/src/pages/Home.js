import axios from "axios";
import { useEffect, useState } from "react";

function Home() {
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
    <div>
      <h1>Home</h1>
      <p>Test CORS and Axios: {state}</p>
      <p>Test CORS and Axios: {state}</p>
      <p>Test CORS and Axios: {state}</p>
      <p>Test CORS and Axios: {state}</p>
      <p>Test CORS and Axios: {state}</p>
      <p>Test CORS and Axios: {state}</p>
      <p>Test CORS and Axios: {state}</p>
      <p>Test CORS and Axios: {state}</p>
    </div>
  );
}

export default Home;