import { useContext, useEffect } from "react";
import { UserContext } from '../context/UserContext';
import homeBG from "../assets/img/home_bg.png";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function Home() {
  const { user } = useContext(UserContext);
  const [cookies] = useCookies();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!cookies.auth && localStorage.length > 0) {
      localStorage.clear();
      navigate('/');
    }
  }, [cookies]);
  
  return (
    <div
      className='position-relative'
      style={{
        height: "auto",
        background: `url(${homeBG})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
      }}
    >
      <img
        src={homeBG}
        alt='Home Background'
        style={{
          width: "100%",
          objectFit: "contain",
          visibility: "hidden",
        }}
      />
      <div className='container-fluid position-absolute top-0 h-100'>
        <div className='row h-100'>
          <div className='col-6 d-flex justify-content-center align-items-center'>
            <p
              className='text-white text-center fw-semibold'
              style={{
                width: "70%",
                fontSize: "5vw",
              }}
            >
              { user.isSPSO ? 'Xin chào SPSO' : 'Chào mừng đến với SSPS' }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;