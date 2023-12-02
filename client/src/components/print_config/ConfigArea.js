import { useState } from 'react';
import { Link } from 'react-router-dom';

function ConfigArea({ support_function }){

    const example = {
        'numpages': 'VD. 1-3, 7, 9-15',
        'numperpage': 'VD. 5, 7',
        'proportion': 'VD. 40%'
    };

    const [customEntries, setCustomEntries] = useState({});

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

    return (
        <>
        <div className = "d-flex justify-content-around p-2">
            <button
                className = "btn fw-medium" 
                onClick = {support_function}
                style = {{ 
                    backgroundColor: 'rgba(100, 168, 231, 1)',
                    color: 'white'
                }}
            >
                Xác nhận thông số in
            </button>
            <Link
                className = "btn btn-danger fw-medium"
                to='/print'
            >
                Quay lại
            </Link>
        </div>
        <div className = "row p-2">
            <div className = "col">
                Máy in
            </div>
            <select class="col form-select" id = "device-select">
                <option value="" disabled selected hidden>Chọn máy in</option>
                <option value="1">Máy in 1</option>
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
                <option value="0">A0</option>
                <option value="1">A1</option>
                <option value="2">A2</option>
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
        </>
    );
}

export default ConfigArea;