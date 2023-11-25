import LoginRole from "../components/login/LoginRole";
import LoginForm from "../components/login/LoginForm";

function Login({ role }) {
  return (
    <div className='container-sm'>
      <div className='row justify-content-center align-items-center py-4'>
        <div 
          className='col col-sm-9 col-md-7 col-lg-6 col-xl-5 bg-light p-4 p-lg-5 rounded-4'
          style={{
            boxShadow: '0rem 0rem 1.5rem rgba(0, 0, 0, 0.2)'
          }}
        >
          {
          role === undefined ? <LoginRole /> : <LoginForm role={role} />
          }
        </div>
      </div>
    </div>
  );
}

export default Login;