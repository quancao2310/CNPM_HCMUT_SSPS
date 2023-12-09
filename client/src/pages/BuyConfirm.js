import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useLocation, useNavigate } from "react-router-dom";

function BuyConfirm() {
  const { state } = useLocation();
  const [data, setData] = useState({
    amount: Number(state?.numPages ?? 0),
    price: Number(state?.numPages ?? 0) * 500
  });
  const navigate = useNavigate();
  const [cookies, , removeCookie] = useCookies();
  const token = cookies.auth;
  
  useEffect(() => {
    if (!state) {
      navigate('/not-found');
    }
    if (state?.purchase_id) {
      axios
        .get(`${process.env.REACT_APP_SERVER_URL}/buy/${state.purchase_id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        })
        .then((response) => {
          console.log(response);
          setData({ amount: response.data.amount, price: response.data.price });
        })
        .catch((error) => {
          if (error.response?.status === 401) {
            removeCookie('auth', { path: '/' });
            localStorage.clear();
            window.location.assign('/');
          }
        });
    }
  }, []);
  
  const handleUnpaid = (e) => {
    if (state.purchase_id) {
      navigate('/buy');
    } else {
      axios
        .put(`${process.env.REACT_APP_SERVER_URL}/buy`, {
          amount: data.amount,
          price: data.price,
          status: 'unpaid'
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response) => {
          console.log(response.data);
          setTimeout(() => {
            navigate('/buy');
          }, 200);
        })
        .catch((error) => {
          console.log('Mua trang không thành công: ', error);
          setTimeout(() => {
            navigate('/buy');
          }, 200);
        });
    }
  }
  
  const handlePaid = (e) => {
    if (state.purchase_id) {
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/buy/${state.purchase_id}`, {
          amount: data.amount,
          status: 'paid'
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response) => {
          console.log(response.data);
          setTimeout(() => {
            navigate('/buy');
          }, 200);
        })
        .catch((error) => {
          console.error(error);
          setTimeout(() => {
            navigate('/buy');
          }, 200);
        })
    } else {
      axios
        .put(`${process.env.REACT_APP_SERVER_URL}/buy`, {
          amount: data.amount,
          price: data.price,
          status: 'paid'
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response) => {
          console.log(response.data);
          setTimeout(() => {
            navigate('/buy');
          }, 200);
        })
        .catch((error) => {
          console.error(error);
          setTimeout(() => {
            navigate('/buy');
          }, 200);
        });
    }
  }
  
  return (
    <div className="container-md mt-3">
      <div className="row justify-content-center">
        <h1 className="col-12 text-center">Xác nhận thanh toán</h1>
        <div className="col-5">
          <table className="table table-borderless" id="buy-confirm">
            <tbody>
              <tr>
                <td>Số trang:</td>
                <td className="text-end">{data.amount}</td>
              </tr>
              <tr>
                <td>Đơn giá:</td>
                <td className="text-end">500 &#8363;</td>
              </tr>
              <tr className="fw-bold border-top">
                <td>Tổng cộng:</td>
                <td className="text-end">{data.price} &#8363;</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-12 text-center mb-3">
          <Link
            to='/buy'
            role="button"
            className="btn btn-secondary mx-3"
          >
            Hủy
          </Link>
          <button
            type="button"
            className="btn btn-primary mx-3"
            onClick={handleUnpaid}
          >
            Thanh toán sau
          </button>
          <button
            type="button"
            className="btn btn-success mx-3"
            onClick={handlePaid}
          >
            Xác nhận thanh toán
          </button>
        </div>
      </div>
    </div>
  );
}

export default BuyConfirm;