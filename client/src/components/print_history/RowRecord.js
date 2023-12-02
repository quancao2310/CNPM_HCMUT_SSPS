import StatusTag from '../utils/StatusTag';
import { Link } from 'react-router-dom';
import { BsBoxArrowInUpRight } from "react-icons/bs";

function RowRecord({ data }) {
  return (
    <tr>
      <td className='text-center'>{data.id}</td>
      <td>{data.document_name}</td>
      <td>{data.time_start}</td>
      <td>{data.time_end}</td>
      <td className='text-center'><StatusTag status={data.status} /></td>
      <td className='text-center'>
        <Link to={`${data.id}`}>
          <BsBoxArrowInUpRight />
        </Link>
      </td>
    </tr>
  );
}

export default RowRecord;