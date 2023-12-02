import axios from 'axios'
import { Link, useLocation } from "react-router-dom";
import { useState } from 'react';
import InfoTable from '../components/print_confirm/InfoTable'

function PrintConfirm(){

    const { state } = useLocation();

    const [data, setData] = useState([]);

    const config = null;

    const handleSubmission = () => {
        const baseURL = "https://localhost:3000";
        axios
        .post(baseURL, config)
        .then((response) => {
            setData(response.data);
        })
        .catch((error) => {
            console.error('Error making post request:', error);
        });
    }

    return (
        <div
            className = "d-flex justify-content-center align-items-center"
            style = {{
                background: 'linear-gradient(180deg, #70D2E5 0%, #FFFFFF 100%)',
                padding: '7% 0%'
            }}
        >
            <div 
                className = "container rounded-4 w-50 p-3"
                style={{ background: 'rgba(255, 255, 255, 0.76)' }}
            
            >
                <div 
                    className = "text-center fs-1 fw-bold w-50 mx-auto"
                    style = {{
                        borderBottom: `1px solid var(--color-bk1)`,
                        color: 'var(--color-bk1)'
                    }}
                >
                    Xác nhận in
                </div>
                <InfoTable name={state.name}/>
                <div class = "d-flex justify-content-center">
                    <Link 
                        className="col-3 btn btn-primary fw-medium mx-2" 
                        onclick = {handleSubmission}
                    >
                        Xác nhận
                    </Link>
                    <Link 
                        className="col-3 btn btn-danger fw-medium mx-2" 
                        to='/print/config' 
                        state={{ name: state.name }}
                    >
                        Hủy
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default PrintConfirm;