import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import Loading from "../components/utils/Loading.js";
import FileUpload from "../components/file_upload/FileUpload";

function PrintService() {
  const [cookies, setCookie, removeCookie] = useCookies();
  const token = cookies.auth;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [ user_id, setUserId ] = useState('');

  useEffect(() => {
    setLoading(true);
    
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/user`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        setUserId(response.data.id);
        setTimeout(() => {
          setLoading(false);
        }, 200);
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          if (cookies.auth) {
            removeCookie('auth', { path: '/' });
          }
          setTimeout(() => {
            navigate('/login');
          }, 200);
        } 
        else {
          console.error(err);
        }
      });
  }, []);

  if (loading) return <Loading loading={loading}/>

  return (
    <FileUpload id = {user_id} />
  );
}

export default PrintService;