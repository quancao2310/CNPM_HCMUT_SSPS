import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GoAlertFill } from "react-icons/go";

function ConfigArea({ num_pages, set_pages_state, support_function  }){

    const [originalData, setOriginalData] = useState([]);
    const [data, setData] = useState([]);
    const [validation, setValidation] = useState(true);
    const [alertContent, setContent] = useState('');
    const [campusChange, setCampusChange] = useState(0);
    const [roomValue, setRoomValue] = useState('');

    useEffect(() => {
        axios
          .get(`${process.env.REACT_APP_SERVER_URL}/print/getInfoPrinter`)
          .then((response) => {
            setOriginalData(response.data);
          })
          .catch((err) => {
            console.error(err);
          });
      }, []);

    useEffect(() => {
        const newData = originalData.filter(item => Number(item.loc_campus) === campusChange);
        setData(newData);
        const firstData = newData[0];
        setRoomValue(roomValue ===''?'':firstData.loc_building + '-' + firstData.loc_room);
      }, [campusChange]);

    const [customEntries, setCustomEntries] = useState({
        'pages': 'd-none',
        'pages_per_sheet': 'd-none',
        'scale': 'd-none'
    });

    const pagePattern = /^([1-9]\d*|[1-9]\d*-[1-9]\d*)(,([1-9]\d*|[1-9]\d*-[1-9]\d*))*$/;

    const validateInput = (input) => {
        let sanitizedValue = input.value.replace(/[^0-9]/g, '');
        sanitizedValue = sanitizedValue.replace(/^0+/, '');
        input.value = sanitizedValue;
        input.setSelectionRange(sanitizedValue.length, sanitizedValue.length);
    };

    const isValidPageFormat = (value) => {
        if (pagePattern.test(value)){
            setValidation(true);
            set_pages_state(true);
            const pageSpecs = value.split(',');
        
            for (let pageSpec of pageSpecs){
                if (pageSpec.includes('-')) {
                    const [start, end] = pageSpec.split('-').map(Number);
                    if (start > end){
                        setContent('Trang bắt đầu phải không vượt quá trang kết thúc: ' + pageSpec);
                        setValidation(false);
                        set_pages_state(false);
                        break;
                    }
                    if (start > num_pages || end > num_pages){
                        setContent('Bạn đã nhập trang vượt quá số trang của tài liệu!');
                        setValidation(false);
                        set_pages_state(false);
                        break;
                    }
                } 
                else {
                    if (pageSpec > num_pages){
                        setContent('Bạn đã nhập trang vượt quá số trang của tài liệu!');
                        setValidation(false);
                        set_pages_state(false);
                        break;
                    }
                }
            };
        }
        else{
            setContent('Vui lòng nhập đúng định dạng!');
            setValidation(false);
            set_pages_state(false);
        }
    };

    const customSelection = (id) => {
        let selectTag = document.getElementById(id);
        const idHeader = id.slice(0, -7);

        if (selectTag.value !== 'custom') {
            setCustomEntries({ ...customEntries, [idHeader]: 'd-none' });
        } 
        else {
            const { [idHeader]: __, ...rest } = customEntries;
            setCustomEntries(rest);
        }
    }

    return (
        <>
        <div className="row p-2">
            <div className="col-8 fw-bold fs-5">Thiết lập cấu hình in</div>
        </div>
        <div className = "row p-2">
            <div className = "col">
                Cơ sở
            </div>
            <select 
                className="col form-select" 
                id="campus-select"
                onChange={(event) => setCampusChange(Number(event.target.value))}
            >
                <option value="" disabled selected hidden>
                    Chọn cơ sở
                </option>
                <option value="1">Lý Thường Kiệt</option>
                <option value="2">Dĩ An</option>
            </select>
        </div>
        <div className = "row p-2">
            <div className = "col">
                Máy in
            </div>
            <select 
                className="col form-select" 
                id="device-select"
                onChange={(event) => {
                    const input = Number(event.target.value);
                    const filteredData = data.filter(item => item.printer_id === input)[0];
                    setRoomValue(filteredData.loc_building + '-' + filteredData.loc_room);
                }}
            >
                <option value="" disabled selected hidden>
                    Chọn máy in
                </option>
                {data.map(({ printer_id, name, loc_building, loc_room  }) => (
                    <option key={printer_id} value={printer_id}>
                        {name} - Phòng {loc_building}-{loc_room}
                    </option>
                ))}
            </select>
        </div>
        <div className = "row p-2">
            <div className = "col">
                Phòng
            </div>
            <input className="col form-control" id="room-input" value={roomValue} disabled />
        </div>
        <div className = "row p-2">
            <div className = "col">
                Số trang
            </div>
            <select className="col form-select" id = "pages-select" onChange={() => customSelection('pages-select')}>
                <option value="" disabled selected hidden>Chọn trang in</option>
                <option value="All">Toàn bộ</option>
                <option value="Odd">In trang lẻ</option>
                <option value="Even">In trang chẵn</option>
                <option value="custom">Tùy chỉnh</option>
            </select>
        </div>
        <div className = "row px-2">
            <div className = "col"></div>
            <input 
                type='text'
                className={`col form-control ${customEntries['pages']}`}
                id='pages-entry'
                placeholder = 'VD. 1-3,7,9-15'
                onBlur={(event) => isValidPageFormat(event.target.value)}
            />
        </div>
        <div className = {`row p-2 ${validation?'d-none':''}`}>
            <div className = "col"></div>
            <div class="col alert alert-danger">
                <span><GoAlertFill style={{ width: '0.9em', height: '0.9em' }}/></span>
                <span>{' ' + alertContent}</span>
            </div>
        </div>
        <div className = "row p-2">
            <div className = "col">
                Mặt in
            </div>
            <select className="col form-select" id = "side-select">
                <option value="" disabled selected hidden>Mặt in</option>
                <option value="1">Một mặt</option>
                <option value="2">Hai mặt</option>
            </select>
        </div>
        <div className = "row p-2">
            <div className = "col">
                Khổ giấy
            </div>
            <select className="col form-select" id = "page_size-select"> 
                <option value="" disabled selected hidden>Khổ giấy</option>
                <option value="4">A4</option>
                <option value="3">A3</option>
            </select>
        </div>
        <div className="row p-2">
            <div className='col'>
                Hướng in
            </div>
            <select className="col form-select" id = "orientation-select">
                <option value="" disabled selected hidden>Hướng in</option>
                <option value="portrait">Dọc</option>
                <option value="landscape">Ngang</option>
            </select>
        </div>
        <div className="row p-2">
            <div className='col'>
                Số trang/1 giấy in
            </div>
            <select className="col form-select" id = "pages_per_sheet-select" onChange={() => customSelection('pages_per_sheet-select')}>
                <option value="" disabled selected hidden>Số trang/1 giấy in</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="4">4</option>
                <option value="6">6</option>
                <option value="custom">Tùy chỉnh</option>
            </select>
        </div>
        <div className = "row px-2">
            <div className = "col"></div>
            <input 
                type='text'
                className={`col form-control ${customEntries['pages_per_sheet']}`}
                id='pages_per_sheet-entry'
                placeholder = 'VD. 5, 7'
                onInput={(event) => validateInput(event.target)}
            />
        </div>
        <div className="row p-2">
            <div className='col'>
                Tỷ lệ
            </div>
            <select className="col form-select" id = "scale-select" onChange={() => customSelection('scale-select')}>
                <option value="" disabled selected hidden>Tỷ lệ</option>
                <option value="100">Mặc định</option>
                <option value="custom">Tùy chỉnh</option>
            </select>
        </div>
        <div className = "row px-2">
            <div className = "col"></div>
            <input 
                type='text'
                className={`col form-control ${customEntries['scale']}`}
                id='scale-entry'
                placeholder = 'VD. 75'
                onInput={(event) => validateInput(event.target)}
            />
        </div>
        <div className = "d-flex justify-content-around px-2 py-4">
            <button
                className = "btn fw-medium" 
                onClick = {support_function}
                style = {{ 
                    backgroundColor: 'rgba(100, 168, 231, 1)',
                    color: 'white'
                }}
            >
                Xác nhận
            </button>
            <Link
                className = "btn btn-danger fw-medium"
                to='/print'
            >
                Quay lại
            </Link>
        </div>
        </>
    );
}

export default ConfigArea;