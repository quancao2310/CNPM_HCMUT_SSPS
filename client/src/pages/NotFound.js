import { Link } from 'react-router-dom';
import { FaGhost } from 'react-icons/fa';
import '../assets/styles/not_found.css';

function NotFound() {
  return (
    <div className='px-3 text-light text-center d-flex flex-column justify-content-center align-items-center' id='not-found'>
      <h1>
        4
        <span><FaGhost /></span>
        4
      </h1>
      <h2>Chúng tôi không có trang bạn cần tìm</h2>
      <Link to='/' className='btn btn-primary mt-3'>Quay lại trang chủ</Link>
    </div>
  );
}

export default NotFound;