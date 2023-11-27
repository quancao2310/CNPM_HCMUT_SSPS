import { useState } from 'react';

function PrintConfig(){
    const [customEntries, setCustomEntries] = useState({});
    const [modalState, setModalState] = useState(false);
    const [submitState, setSubmitState] = useState(false);  

    const example = {
        'numpages': 'VD. 1-3, 7, 9-15',
        'numperpage': 'VD. 5, 7',
        'proportion': 'VD. 40%'
    };

    const customSelection = (id) => {
        let selectTag = document.getElementById(id);
        const idHeader = id.slice(0, -7);
        
        if (selectTag.value === 'custom') {
            let customEntry = (
                <div className = "row px-2">
                    <div className = "col"></div>
                    <input 
                        type="text"
                        className=" col form-control"
                        id={`${idHeader}-entry`}
                        key={`${idHeader}-entry`}
                        placeholder = {`${example[idHeader]}`}
                    />
                </div>
            );

            setCustomEntries({ ...customEntries, [idHeader]: customEntry });
        } else {
            const { [idHeader]: _, ...rest } = customEntries;
            setCustomEntries(rest);
        }
    }

    const handleConfig = () => {
        const config = {
            device: document.getElementById('device-select').value,
            numpages: document.getElementById('numpages-select').value,
            side: document.getElementById('side-select').value,
            pagesize: document.getElementById('pagesize-select').value,
            direction: document.getElementById('direction-select').value,
            numperpage: document.getElementById('numperpage-select').value,
            proportion: document.getElementById('proportion-select').value,
        };
        alert(!"");
        const hasEmptyValue = Object.values(config).some(value => !value);

        if (hasEmptyValue){
            alert("Vui lòng điền đầy đủ thông tin");
            setModalState('show');
        }
        else{
            
        }
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
                    <div className="d-flex justify-content-between">
                        <div className="col-9 fw-bold fs-5">Xem trước khi in</div>
                        <button 
                            className = "btn"
                            style = {{
                                backgroundColor: 'rgba(100, 168, 231, 1)',
                            }}
                        >
                            Xác nhận
                        </button>
                    </div>
                    <div id = "document-preview">

                    </div>
                </div>
                <div className="col-12 col-md-6 border-right border-dark">
                    <div className = "d-flex justify-content-center p-2">
                        <button type="button" 
                                className = "btn" 
                                onclick = {() => handleConfig()}
                                style = {{ 
                                    backgroundColor: 'rgba(100, 168, 231, 1)',
                                }}
                        >
                            Xác nhận thông số in
                        </button>
                    </div>
                    <div className = "row p-2">
                        <div className = "col">
                            Máy in
                        </div>
                        <select class="col form-select" id = "device-select">
                            <option value="" disabled selected hidden>Chọn máy in</option>
                        </select>
                    </div>
                    <div className = "row p-2">
                        <div className = "col">
                            Số trang
                        </div>
                        <select class="col form-select" id = "numpages-select" onChange={() => customSelection('numpages-select')}>
                            <option value="" disabled selected hidden>Chọn trang in</option>
                            <option value="all">Toàn bộ</option>
                            <option value="odd">In trang lẻ</option>
                            <option value="even">In trang chẵn</option>
                            <option value="custom">Tùy chỉnh</option>
                        </select>
                    </div>
                    {customEntries['numpages']}
                    <div className = "row p-2">
                        <div className = "col">
                            Mặt in
                        </div>
                        <select class="col form-select" id = "side-select">
                            <option value="" disabled selected hidden>Mặt in</option>
                            <option value="single">Một mặt</option>
                            <option value="both">Hai mặt</option>
                        </select>
                    </div>
                    <div className = "row p-2">
                        <div className = "col">
                            Khổ giấy
                        </div>
                        <select class="col form-select" id = "pagesize-select"> 
                            <option value="" disabled selected hidden>Khổ giấy</option>
                            <option value="3">A3</option>
                            <option value="4">A4</option>
                        </select>
                    </div>
                    <div className="row p-2">
                        <div className='col'>
                            Hướng in
                        </div>
                        <select class="col form-select" id = "direction-select">
                            <option value="" disabled selected hidden>Hướng in</option>
                            <option value="vertical">Dọc</option>
                            <option value="horizontal">Ngang</option>
                        </select>
                    </div>
                    <div className="row p-2">
                        <div className='col'>
                            Số trang/1 giấy in
                        </div>
                        <select class="col form-select" id = "numperpage-select" onChange={() => customSelection('numperpage-select')}>
                            <option value="" disabled selected hidden>Số trang/1 giấy in</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="4">4</option>
                            <option value="6">6</option>
                            <option value="custom">Tùy chỉnh</option>
                        </select>
                    </div>
                    {customEntries['numperpage']}
                    <div className="row p-2">
                        <div className='col'>
                            Tỷ lệ
                        </div>
                        <select class="col form-select" id = "proportion-select" onChange={() => customSelection('proportion-select')}>
                            <option value="" disabled selected hidden>Tỷ lệ</option>
                            <option value="default">Mặc định</option>
                            <option value="custom">Tùy chỉnh</option>
                        </select>
                    </div>
                    {customEntries['proportion']}
                </div>
            </div>
        </div>
        <div class="modal fade" id="submit-modal" tabindex="-1" role="dialog" aria-labelledby="submit-modal-title" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="submit-modal-title">Chú ý</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        Vui lòng điền đầy đủ thông tin!
                    </div>
                    <div class="modal-footer d-flex justify-content-center">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default PrintConfig;