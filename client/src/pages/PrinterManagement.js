import Searchbar from "../components/printer_management/Searchbar"
import PrinterList from "../components/printer_management/PrinterList"
import Loading from "../components/utils/Loading";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import axios from "axios";

export default function PrinterManagement() {
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
    }, [cookies]);

    if (loading){
        return (
            <div className='col-12 my-3 text-center'>
                <h3>Dữ liệu đang tải, vui lòng chờ</h3>
                <Loading />
            </div>
        );
    }
    return (
        <div>
            <Searchbar />
            <PrinterList />
        </div>
    )
}