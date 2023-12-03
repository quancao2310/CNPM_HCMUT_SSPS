import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ConfigArea from '../components/print_config/ConfigArea';
import ConfigModal from '../components/print_config/ConfigModal';

function PrintConfig(){
    const { state } = useLocation();

    const [modalState, setModalState] = useState(false);
    const [configSubmitState, setConfigSubmitState] = useState(false);

    const [config, setConfig] = useState([]);

    const handleHideModal = () => setModalState(false);

    const handleSubmission = () => {
        const configData = {
            device: document.getElementById('device-select').value,
            pages: document.getElementById('pages-select').value,
            side: document.getElementById('side-select').value,
            page_size: document.getElementById('page_size-select').value,
            orientation: document.getElementById('orientation-select').value,
            pages_per_sheet: document.getElementById('pages_per_sheet-select').value,
            scale: document.getElementById('scale-select').value,
        };
    
        for (let i of ['pages', 'pages_per_sheet', 'scale']){
            if (configData[i] === 'custom'){
                configData[i] = document.getElementById(`${i}-entry`).value; 
            }
        }

        const hasEmptyValue = Object.values(configData).some(value => (value === ""));

        if (hasEmptyValue){
            setConfigSubmitState(false);
        }
        else{
            const keys = ['device', 'side', 'page_size', 'pages_per_sheet', 'scale'];
            keys.forEach(key => {
                configData[key] = Number(configData[key]);
            });
            /**** 
             * Check configuration data condition
             * ****/
            setConfig(configData);
            setConfigSubmitState(true);
        }
        setModalState(true);
    }

    return (
        <>
        <div 
            className = "mx-2 rounded-4"
            style = {{
                boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                overflow: 'hidden'
            }}
        >
            <div 
                className = "p-2 fw-bold fs-4"
                style = {{ backgroundColor: 'rgba(160, 241, 236, 1)' }}    
            >
                Thiết lập trang in
            </div>
            <div className="row p-3">
                <div className="col-12 col-md-6">
                    <div className="row">
                        <div className="col-8 fw-bold fs-5">Xem trước khi in</div>
                        <div className="col-8">{state.name}</div>
                    </div>
                    <div id = "document-preview">
                    </div>
                </div>
                <div className="col-12 col-md-6 border-right border-dark">
                    <ConfigArea support_function={handleSubmission}/>
                </div>
            </div>
        </div>
        <ConfigModal 
            file_name= {state.name}
            file_num_pages = "100"
            file_config = {config} 
            state={modalState}
            submit_state={configSubmitState}
            support_function={handleHideModal} 
        />
        </>
    );
}

export default PrintConfig;