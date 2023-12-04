import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import InfoTable from '../components/print_confirm/InfoTable';
import ConfirmModal from '../components/print_confirm/ConfirmModal';

function PrintConfirm() {
    const confirm_api_url = `${process.env.REACT_APP_SERVER_URL}/print/confirm`;
    const update_balance_api_url = `${process.env.REACT_APP_SERVER_URL}/print/minusPages`;

    const user = {
        id: 2112444,
        balance: 100
    };

    const { state } = useLocation();

    const [name, setName] = useState('');
    const [numPagesToBePrinted, setNumPagesToBePrinted] = useState(0);
    const [updatedBalance, setUpdatedBalance] = useState(0);

    const [confirmData, setConfirmData] = useState({});
    const [updateData, setUpdateData] = useState({});

    const [modalState, setModalState ] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedName = state.name;
                const fetchedConfig = state.config;
                const fetchedNumPages = Number(state.num_pages);

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
                temp = Math.ceil(temp / side);
                temp = Math.ceil(temp * pageSizeFactor);

                setNumPagesToBePrinted(temp);
                setUpdatedBalance(user.balance - temp);

                setConfirmData({
                    name: fetchedName,
                    file_type: fetchedName.split('.').pop(),
                    no_of_pages: fetchedNumPages,
                    user_id: user.id,
                    printer_id: fetchedConfig.device,
                    side: fetchedConfig.side,
                    page_size: 'A' + fetchedConfig.page_size,
                    orientation: fetchedConfig.orientation,
                    pages_per_sheet: fetchedConfig.pages_per_sheet,
                    scale: fetchedConfig.scale / 100.0,
                    pages_to_be_printed: fetchedConfig.pages,
                });

                setUpdateData({
                    user_id: user.id,
                    updatedBalance: user.balance - temp,
                });
            } 
            catch (error) {
                console.error('Error setting state:', error);
            }
        };

        fetchData();
    }, [state]);

    const handleSubmission = async () => {
        try {
            const response = await axios.post(confirm_api_url, confirmData);
            if (response.data.status === "Success") {
                try {
                    const updateResponse = await axios.put(update_balance_api_url, updateData);
                    if (updateResponse.data.status === "Success") {
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
    };
    

    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{
                background: 'linear-gradient(180deg, #70D2E5 0%, #FFFFFF 100%)',
                padding: '7% 0%',
            }}
        >
            <div
                className="container rounded-4 w-50 p-3"
                style={{ background: 'rgba(255, 255, 255, 0.76)' }}
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
                    num_remain_pages={updatedBalance}
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
                    to="/print/config"
                    state={{ name: name }}
                >
                    Hủy
                </Link>
                </div>
            </div>
            <ConfirmModal state={modalState} />
        </div>
    );
}

export default PrintConfirm;