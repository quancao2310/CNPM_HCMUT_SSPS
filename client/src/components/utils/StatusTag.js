function StatusTag({ status }) {
  let bgColor;
  switch (status) {
    case 'In thành công':
      bgColor = 'success';
      break;
    case 'In thất bại':
      bgColor = 'danger';
      break;
    case 'Đang in':
      bgColor = 'warning';
      break;
    case 'Chưa in':
      bgColor = 'secondary';
      break;
    default:
      bgColor = 'primary';
  }
  
  return (
    <span 
      className={`badge rounded-pill text-bg-${bgColor}`}
      style={{
        fontSize: '0.88rem'
      }}
    >
      {status}
    </span>
  );
}

export default StatusTag;