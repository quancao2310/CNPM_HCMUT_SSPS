import { Link } from 'react-router-dom';
import { FaGhost } from 'react-icons/fa';
import '../assets/styles/not_found.css';

function NotFound() {
  return (
    <div className='px-3 text-light text-center' id='not-found'>
      <h1 className='mt-3'>
        4
        <span><FaGhost /></span>
        4
      </h1>
      <h2>Chúng tôi không có trang bạn cần tìm</h2>
      <Link to='/' className='btn btn-primary fw-semibold my-3' id='return-homepage'>Quay về trang chủ</Link>
    </div>
  );
}

export default NotFound;