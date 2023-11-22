import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate(-1);
    }, 2000);
    return () => { clearTimeout(); }
    
  });
  return (
    <h1>Not Found</h1>
  );
}

export default NotFound;