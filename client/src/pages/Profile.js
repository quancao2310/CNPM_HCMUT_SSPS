import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { UserContext } from "../context/UserContext";
import sampleAvt from "../assets/img/standard_avt.jpg";

function Profile() {
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState({});
  const [cookies, , removeCookie] = useCookies();
  
  useEffect(() => {
    const token = cookies.auth;
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/user`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        const last_used = new Date(response.data.last_used);
        setUserData({ ...response.data, last_used: last_used });
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          removeCookie('auth', { path: '/' });
          localStorage.clear();
          window.location.assign('/');
        }
      });
  }, [cookies]);
  
  return (
    <div className="container my-4">
      <div className="row justify-content-around align-items-center">
        <div
          className="col-12 col-md-4"
          style={{
            maxWidth: "300px",
            maxHeight: "300px"
          }}
        >
          <img
            src={sampleAvt} 
            alt="Profile Avatar" 
            className="w-100 rounded-circle" 
          />
        </div>
        <div className="col-12 col-md-7 col-lg-5">
          <h3 className="px-2 mt-3">Thông tin người dùng</h3>
          <table className="table">
            <tbody>
              <tr>
                <th scope="row">Mã số{ user.isSPSO ? '' : ' sinh viên'}:</th>
                <td>{user.isSPSO ? userData.spso_id : userData.customer_id}</td>
              </tr>
              <tr>
                <th scope="row">Họ và tên:</th>
                <td>{userData.name}</td>
              </tr>
              <tr>
                <th scope="row">Đối tượng:</th>
                <td>{user.isSPSO ? 'SPSO' : (userData.type === 'student' ? 'Sinh viên' : (userData.type === 'lecturer' ? 'Giảng viên' : undefined ))}</td>
              </tr>
              <tr>
                <th scope="row">Email:</th>
                <td>{userData.email}</td>
              </tr>
              { user.isSPSO ?
              <>
              <tr>
                <th scope="row">Ngày sinh:</th>
                <td>{new Date(userData.dob).toLocaleDateString('en-GB')}</td>
              </tr>
              <tr>
                <th scope="row">Số điện thoại:</th>
                <td>{userData.phone}</td>
              </tr>
              </>
              :
              <tr>
                <th scope="row">Số dư (trang A4):</th>
                <td>{userData.balance}</td>
              </tr>
              }
              <tr>
                <th scope="row">Lần đăng nhập gần nhất:</th>
                <td>{`${userData.last_used && userData.last_used.toLocaleString('en-GB')}`}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Profile;