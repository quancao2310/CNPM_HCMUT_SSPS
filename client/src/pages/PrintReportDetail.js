import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { useCookies } from 'react-cookie';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { IoPrintOutline } from "react-icons/io5";
import Loading from '../components/utils/Loading';
import DetailTable from '../components/print_report/DetailTable';
import ReportChart from '../components/print_report/Chart';

function PrintReportDetail(){
    const [cookies, setCookie, removeCookie] = useCookies();
    const token = cookies.auth;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');

    const { year, month } = useParams();
    const [ data, setData ] = useState({});

    const [ print, setPrint ] = useState(false);

    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        onBeforeGetContent: () => {
            setPrint(true);
            setTimeout(()=>{}, 200);
        },
        onAfterPrint: () => {
            setPrint(false);
        },
    });

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

        axios
            .get(`${process.env.REACT_APP_SERVER_URL}/report/getReport?year=${year}&month=${month}`)
            .then((response) => {
                setData(response.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [cookies]);

    if (loading) return <Loading />;

    return (
        <div className="container-fluid">
            <div className = "row justify-content-center m-3 rounded-4"
                style = {{
                    boxShadow: '4px 4px 4px 4px rgba(0, 0, 0, 0.25)',
                    overflow: 'hidden'
                }}
                
            >
                <div className="col-12" ref={componentRef}>
                    <h1 className='text-center py-4'>
                        Báo cáo hệ thống{month?` tháng ${month}`:''} năm {year}
                    </h1>
                   
                    <h3 className='text-center mt-3'>Bảng thống kê chi tiết</h3>
                    {data.length > 0
                    ?(
                        <>
                        <DetailTable data={data} />
                        <ReportChart data={data}/>
                        </>
                    )
                    :(
                        <div className="text-center text-secondary py-5">
                            <h2>Không tìm thấy dữ liệu</h2>
                        </div>
                    )}
                </div>
                <div className="col-12 mb-2">
                    <div className="row justify-content-center">
                        {data.length > 0 && (
                            <button className="col-1 btn m-2 btn-primary" onClick={handlePrint}>
                                <IoPrintOutline style = {{ width: '25px', height: '25px' }}/>
                            </button>
                        )}
                        <Link className="col-2 btn btn-danger m-2" to='/report'>Quay lại trang chính</Link>
                    </div> 
                </div>
            </div>
        </div>
    );
}

export default PrintReportDetail;