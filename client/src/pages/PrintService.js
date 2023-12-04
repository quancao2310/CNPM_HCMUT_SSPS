import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import FileUpload from "../components/file_upload/FileUpload";

function PrintService() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.token){
      navigate('/login');
    }
  }, []);

  return (
    <FileUpload />
  );
}

export default PrintService;