import axios from "axios";
import { useEffect, useState } from "react";
import FileUpload from "../components/FileUpload";

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
  }, [state]);
  
  return (
    <div>
      <FileUpload />
    </div>
  );
}

export default Home;