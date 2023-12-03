function StatusTag({ status }) {
  let bgColor, message;
  switch (status) {
    case 'success':
      bgColor = 'success';
      message = 'In thành công';
      break;
    case 'failed':
      bgColor = 'danger';
      message = 'In thất bại';
      break;
    case 'progress':
      bgColor = 'warning';
      message = 'Đang in';
      break;
    case 'pending':
      bgColor = 'secondary';
      message = 'Chưa in';
      break;
    default:
      bgColor = 'primary';
      message = '';
  }
  
  return (
    <span 
      className={`badge rounded-pill text-bg-${bgColor}`}
      style={{
        fontSize: '0.88rem'
      }}
    >
      {message}
    </span>
  );
}

export default StatusTag;