import axios from "axios";
import { useEffect, useState } from "react";
import homeBG from '../assets/img/home_bg.png'

function Home() {
  const [state, setState] = useState(null);
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/test')
      .then((response) => {
        setState(response.data);
      })
      .catch((err) => {
        setState('Error');
        console.error(err);
      });
  }, [state]);
  
  return (
    <>
      <div className="text-center text-uppercase text-danger" id="i-am-angry">
        <h1 className="text-dark">Test CORS and Axios: <i className={state === "OK" ? "text-success" : "text-danger"}>{state}</i></h1>
        <h1>Dòng trên được để lại để những ai chưa từng chạy code này test. Tất cả bắt buộc phải ra <i className={state === "OK" ? "text-success" : "text-danger"}>"OK"</i>.</h1>
        <h1>Nếu ai ra Error vui lòng báo lại và sẽ càng tốt nếu có thể tự tìm cách sửa (nhưng vẫn phải báo lại).</h1>
        <h1>Sẽ xóa đoạn này sau khi tất cả đều commit ít nhất 1 lần.</h1>
        <h1>Làm ơn hãy chú ý. Vui lòng không phớt lờ nó!!!!!!!!!!!</h1>
      </div>
      <div 
        className="position-relative" 
        style={{
          height: 'auto',
          background: `url(${homeBG})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <img 
          src={homeBG} 
          alt="Home Background" 
          style={{
            width: '100%',
            objectFit: 'contain',
            visibility: 'hidden',
          }}
        />
        <div className="container-fluid position-absolute top-0 h-100">
          <div className="row h-100">
            <div className="col-6 d-flex justify-content-center align-items-center">
              <p 
                className="text-white text-center fw-semibold"
                style={{
                  width: '70%',
                  fontSize: '5vw'
                }}
              >
                Chào mừng đến với SSPS
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;