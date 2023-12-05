function GeneralDetailTable({ data }) {
  return (
    <table className='table table-borderless mb-0'>
      <tbody>
        {data.map(({ name, value }, index) =>
        <tr key={index}>
          <th scope='row'>{name}</th>
          <td>{value}</td>
        </tr>
        )}
      </tbody>
    </table>
  );
}

export default GeneralDetailTable;