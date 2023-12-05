import { useContext } from 'react';
import { UserContext } from '../../../context/UserContext';
import { Link } from 'react-router-dom';
import { BsBoxArrowInUpRight } from "react-icons/bs";
import StatusTag from '../../utils/StatusTag';

function RowRecord({ data }) {
  const { user } = useContext(UserContext);
  return (
    <tr className='text-center'>
      <td>{data.print_id}</td>
      {user.isSPSO && <td className='text-start'>{data.customer_name}</td>}
      <td className='text-start'>{data.document_name}</td>
      <td className='text-start'>{data.printer_name}</td>
      <td>{data.time_start.toLocaleString('en-GB')}</td>
      <td>{data.time_end.toLocaleString('en-GB')}</td>
      <td><StatusTag status={data.status} /></td>
      <td>
        <Link to={`${data.print_id}`}>
          <BsBoxArrowInUpRight />
        </Link>
      </td>
    </tr>
  );
}

export default RowRecord;