import { Link } from 'react-router-dom';
import { BsBoxArrowInUpRight } from "react-icons/bs";

function RowRecord({ data }) {
  return (
    <tr className='text-center'>
      <td>{data.purchase_id}</td>
      <td>{data.amount}</td>
      <td>{data.price} &#8363;</td>
      <td>{data.time.toLocaleString('en-GB')}</td>
      <td>{data.status === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}</td>
      <td>
        {data.status !== 'paid' &&
        <Link to='confirm' state={{ purchase_id: data.purchase_id}}>
          <BsBoxArrowInUpRight />
        </Link>}
      </td>
    </tr>
  );
}

export default RowRecord;