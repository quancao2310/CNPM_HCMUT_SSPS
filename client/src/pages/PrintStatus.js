
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie'
import { useNavigate } from "react-router-dom";
import Loading from "../components/utils/Loading.js";
import PagingTable from '../components/print_status/PagingTable';

function PrintStatus(){
    const [data, setData] = useState(null);
    
    const [cookies, setCookie, removeCookie] = useCookies();
    const token = cookies.auth;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

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
          axios
            .get(`${process.env.REACT_APP_SERVER_URL}/print/status/${response.data.customer_id}`)
            .then((response) => {
              setData(response.data);
              setTimeout(() => {
                setLoading(false);
              }, 200);
            })
            .catch((err) => {
              console.error(err);
            });
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

    if (loading) return <Loading loading={loading}/>;

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