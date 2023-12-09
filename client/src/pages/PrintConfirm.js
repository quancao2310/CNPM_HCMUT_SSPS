import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate  } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Loading from "../components/utils/Loading.js";
import InfoTable from '../components/print_confirm/InfoTable';
import ConfirmModal from '../components/print_confirm/ConfirmModal';

function PrintConfirm() {
    const confirm_api_url = `${process.env.REACT_APP_SERVER_URL}/print/confirm`;
    const update_balance_api_url = `${process.env.REACT_APP_SERVER_URL}/print/minusPages`;

    const { state } = useLocation();

    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies();
    const [loading, setLoading] = useState(true);

    const [name, setName] = useState('');
    const [numPagesToBePrinted, setNumPagesToBePrinted] = useState(0);
    const [processedNumPages, setProcessedNumPages] = useState(0);
    const [pageSize, setPageSize] = useState('');
    const [balance, setBalance] = useState(0);
    const [campus, setCampus] = useState('');
    const [room, setRoom] = useState('');

    const [confirmData, setConfirmData] = useState({});
    const [updateData, setUpdateData] = useState({});

    const [modalState, setModalState ] = useState(false);
    const [confirmState, setConfirmState] = useState(true);

    useEffect(() => {
        setLoading(true);

        const fetchData = () => {
            if (!cookies.auth) {
                navigate('/login');
                return;
            }
          
            if (!state) {
                navigate('/');
                return;
            }
          
            const object = JSON.parse(JSON.stringify(state));
            const userId = object.user_id;
            const userBalance = object.user_balance;
            const fetchedName = object.name;
            const fetchedConfig = object.config;
            const fetchedNumPages = Number(object.num_pages);
          
            setName(fetchedName);
          
            let temp = 0;
          
            if (fetchedConfig.pages === 'All') temp = fetchedNumPages;
            else if (fetchedConfig.pages === 'Odd') temp = Math.floor((fetchedNumPages + 1) / 2);
            else if (fetchedConfig.pages === 'Even') temp = Math.floor(fetchedNumPages / 2);
            else {
                const pageSpecs = fetchedConfig.pages.split(',');
            
                const uniquePages = new Set();
            
                pageSpecs.forEach((pageSpec) => {
                if (pageSpec.includes('-')) {
                    const [start, end] = pageSpec.split('-').map(Number);
                    for (let i = start; i <= end; i++) {
                        uniquePages.add(i);
                    }
                } 
                else {
                    uniquePages.add(Number(pageSpec));
                }
                });
            
                temp = uniquePages.size;
            }
          
            const pagesPerSheet = fetchedConfig.pages_per_sheet;
            const side = fetchedConfig.side;
            const pageSizeFactor = Math.pow(2, 4 - fetchedConfig.page_size);
          
            temp = Math.ceil(temp / pagesPerSheet);
            if (side === 1) temp *= 2;
            else temp = ((temp % 2) == 0)?temp:temp+1;
    
            setNumPagesToBePrinted(temp);
            setPageSize('A' + fetchedConfig.page_size);
            setProcessedNumPages(pageSizeFactor * temp);
            setBalance(userBalance);
            setCampus(fetchedConfig.campus===1?'Cơ sở Lý Thường Kiệt':'Cơ sở Dĩ An');
            setRoom(fetchedConfig.room);
          
            if (userBalance < pageSizeFactor*temp) {
                setConfirmState(false);
            } 
            else {
                setConfirmState(true);
            
                setConfirmData({
                    name: fetchedName,
                    file_type: fetchedName.split('.').pop(),
                    no_of_pages: fetchedNumPages,
                    user_id: userId,
                    printer_id: fetchedConfig.device,
                    side: fetchedConfig.side,
                    page_size: 'A' + fetchedConfig.page_size,
                    orientation: fetchedConfig.orientation,
                    pages_per_sheet: fetchedConfig.pages_per_sheet,
                    scale: fetchedConfig.scale / 100.0,
                    pages_to_be_printed: fetchedConfig.pages,
                    num_pages_printed: temp
                });
            
                setUpdateData({
                    user_id: userId,
                    updatedBalance: userBalance - temp
                });
            }
          
            setTimeout(() => {
                setLoading(false);
            }, 200);
        };
          
        fetchData(); 
    }, [cookies]);

    const handleSubmission = async () => {
        if (confirmState){
            try {
                const response = await axios.post(confirm_api_url, confirmData);
                if (response.data.status === "Success") {
                    try {
                        const updateResponse = await axios.put(update_balance_api_url, updateData);
                        if (updateResponse.data.status === "Success") {
                            const storedFiles = localStorage.getItem("files");
                            if (storedFiles) {
                                const currentFiles = JSON.parse(storedFiles);
                                const updatedFiles = currentFiles.filter(file => file !== name);
                                localStorage.setItem('files', JSON.stringify(updatedFiles));
                            }
                            setModalState(true);
                        } 
                        else {
                            console.error('Error updating balance. Unexpected response:', updateResponse.data);
                        }
                    } 
                    catch (updateError) {
                        console.error('Error making put request:', updateError);
                    }
                } 
                else {
                    console.error('Error confirming print. Unexpected response:', response.data);
                }
            } 
            catch (postError) {
                
                console.error('Error making post request:', postError);
            }
        }
        else{
            setModalState(true);
        }
    };
    
    if (loading) return <Loading loading={loading}/>;

    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{
                background: 'linear-gradient(180deg, #70D2E5 0%, #FFFFFF 100%)',
                padding: '7% 0%',
            }}
        >
            <div
                className="container rounded-4 p-3"
                style={{ background: 'rgba(255, 255, 255, 0.76)', width: '60%' }}
            >
                <div
                    className="text-center fs-1 fw-bold w-50 mx-auto"
                    style={{
                        borderBottom: `1px solid var(--color-bk1)`,
                        color: 'var(--color-bk1)',
                    }}
                >
                    Xác nhận in
                </div>
                <InfoTable
                    name={name}
                    num_pages={numPagesToBePrinted}
                    page_size={pageSize}
                    processed_num_pages={processedNumPages}
                    num_remain_pages={balance}
                    campus={campus} room={room}                    
                />
                <div className="d-flex justify-content-center">
                <button
                    className="col-3 btn btn-primary fw-medium mx-2"
                    onClick={handleSubmission}
                >
                    Xác nhận
                </button>
                <Link
                    className="col-3 btn btn-danger fw-medium mx-2"
                    to="/print"
                >
                    Hủy
                </Link>
                </div>
            </div>
            <ConfirmModal state={modalState} confirm_state={confirmState} campus={campus} room={room}/>
        </div>
    );
}

export default PrintConfirm;