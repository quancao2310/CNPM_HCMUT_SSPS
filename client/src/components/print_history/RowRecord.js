import StatusTag from '../utils/StatusTag';
import { Link } from 'react-router-dom';
import { BsBoxArrowInUpRight } from "react-icons/bs";

function RowRecord({ data }) {
  return (
    <tr>
      <td className='text-center'>{data.print_id}</td>
      <td>{data.document_name}</td>
      <td>{new Date(data.time_start).toLocaleString('en-GB')}</td>
      <td>{new Date(data.time_end).toLocaleString('en-GB')}</td>
      <td className='text-center'><StatusTag status={data.status} /></td>
      <td className='text-center'>
        <Link to={`${data.print_id}`}>
          <BsBoxArrowInUpRight />
        </Link>
      </td>
    </tr>
  );
}

export default RowRecord;