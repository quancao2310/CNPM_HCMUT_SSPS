
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie'
import { useNavigate } from "react-router-dom";
import PagingTable from '../components/print_status/PagingTable';

function PrintStatus(){
    const [user_id, setUserId] = useState('');
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies();
    const token = cookies.auth;

    useEffect(() => {
        axios
          .get(`${process.env.REACT_APP_SERVER_URL}/user`, {
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` 
            }
          })
          .then((response) => {
            setUserId(response.data.customer_id);
          })
          .catch((err) => {
            if (err.response.status === 401){
                if (cookies.auth){
                    removeCookie('auth', {path: '/'});
                }
                navigate('/login');
            }
            else{
                console.err(err);
            }
          });

        axios
          .get(`${process.env.REACT_APP_SERVER_URL}/print/status/${user_id}`, {
            headers:{
                'Content-Type': 'application/json'
            }
          })
          .then((response) => {
            setData(response.data);
          })
          .catch((err) => {
            console.error(err);
          });
      }, []);

    return (
        <div
            className = "d-flex justify-content-center align-items-center"
            style = {{
                background: 'linear-gradient(180deg, #70D2E5 0%, #FFFFFF 100%)',
                padding: '6% 0%'
            }}
        >
            <div 
                className = "container rounded-4 w-50 px-5 py-2"
                style={{ background: 'rgba(255, 255, 255, 0.76)' }}
            >
                <div 
                    className = "text-center text-primary fs-1 fw-bold p-2"
                    style = {{
                        borderBottom: `1px solid var(--color-bk1)`,
                        color: 'var(--color-bk1)'
                    }}
                >
                    Trạng thái in
                </div>
                <PagingTable data={data} items_per_page={5}/>
                <div className = "d-flex justify-content-center p-2">
                    <Link className = "btn btn-primary" to='/print'>Thoát</Link>
                </div>
            </div>
        </div>
    );
}

export default PrintStatus;