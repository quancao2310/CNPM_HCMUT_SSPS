import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ConfigArea from '../components/print_config/ConfigArea';
import ConfigModal from '../components/print_config/ConfigModal';

function PrintConfig(){
    const custom_fields = ['numpages', 'numperpage', 'proportion'];
    const { state } = useLocation();
    const [modalState, setModalState] = useState(false);
    const [configSubmitState, setConfigSubmitState] = useState(false);

    const handleHideModal = () => setModalState(false);

    const handleSubmission = () => {
        const config = {
            device: document.getElementById('device-select').value,
            numpages: document.getElementById('numpages-select').value,
            side: document.getElementById('side-select').value,
            pagesize: document.getElementById('pagesize-select').value,
            direction: document.getElementById('direction-select').value,
            numperpage: document.getElementById('numperpage-select').value,
            proportion: document.getElementById('proportion-select').value,
        };
    
        for (let i of custom_fields){
            if (config[i] === 'custom'){
                config[i] = document.getElementById(`${i}-entry`).value;
            }
        }

        const hasEmptyValue = Object.values(config).some(value => (value === ""));

        if (hasEmptyValue){
            setConfigSubmitState(false);
        }
        else{
            /**********
             * Handling user's inputs (if needed)
             **********/
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
                style = {{
                    backgroundColor: 'rgba(160, 241, 236, 1)'
                }}    
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
            file_name={ state.name } 
            state={modalState}
            submit_state={configSubmitState}
            support_function={handleHideModal} 
        />
        </>
    );
}

export default PrintConfig;