import axios from 'axios'
import { Link, useLocation } from "react-router-dom";
import { useState } from 'react';
import InfoTable from '../components/print_confirm/InfoTable';

function PrintConfirm(){

    const confirm_api_url = `${process.env.REACT_APP_SERVER_URL}/confirm`;
    const update_balance_api_url = `${process.env.REACT_APP_SERVER_URL}/minusPages`;
    
    const user = {
        id: 2112444,
        balance: 1000
    }

    const { state } = useLocation();

    const config = state.config;
    const num_pages = state.num_pages;

    const countNumPages = (pages_to_be_printed, num_pages) => {
        let num_pages_to_be_printed = 0;

        if (pages_to_be_printed === 'All') num_pages_to_be_printed = num_pages;
        else if (pages_to_be_printed === 'Odd') num_pages_to_be_printed = Math.floor((num_pages+1)/2);
        else if (pages_to_be_printed === 'Even') num_pages_to_be_printed = Math.floor(num_pages/2);
        else{
            const pageSpecs = pages_to_be_printed.split(',');

            const uniquePages = new Set();

            pageSpecs.forEach(pageSpec => {
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

            num_pages_to_be_printed = uniquePages.size;
        }

        const pagesPerSheet = config['pages_per_sheet'];
        const side = config['side'];
        const pageSizeFactor = Math.pow(2, 4 - config['page_size']);
    
        num_pages_to_be_printed = Math.ceil(num_pages_to_be_printed / pagesPerSheet);
        num_pages_to_be_printed = Math.ceil(num_pages_to_be_printed / side);
        num_pages_to_be_printed = Math.ceil(num_pages_to_be_printed * pageSizeFactor);    

        return num_pages_to_be_printed;
    }

    let num_pages_to_be_printed = countNumPages(config['pages'], num_pages);

    const updated_balance = user.balance - num_pages_to_be_printed; // Update later

    const handleSubmission = async () => {
        const confirm_data = {
            name: state.name,
            file_type: state.name.split('.').pop(),
            no_of_pages: num_pages,
            user_id: user.id,
            printer_id: config['device'],
            side: config['side'],
            page_size: 'A' + config['page_size'],
            orientation: config['orientation'],
            pages_per_sheet: config['pages_per_sheet'],
            scale: config['scale']/100.0,
            pages_to_be_printed: config['pages']
        };

        const update_data = {
            user_id: user.id,
            updatedBalance: updated_balance
        }

        try {
            const response = await axios.post(confirm_api_url, confirm_data);
        } 
        catch (error) {
            console.error('Error making post request:', error);
        }

        try {
            const response = await axios.put(update_balance_api_url, update_data);
        } 
        catch (error) {
            console.error('Error making put request:', error);
        }
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
                <InfoTable name={state.name} num_pages={num_pages_to_be_printed}/>
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