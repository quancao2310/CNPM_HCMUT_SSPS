import { useLocation } from "react-router-dom";

function BuyConfirm() {
  const { state } = useLocation();
  
  const handleCancel = (e) => {
    console.log(e);
  }
  
  const handleUnpaid = (e) => {
    console.log(e);
  }
  
  const handlePaid = (e) => {
    console.log(e);
  }
  
  return (
    <div className="container-md mt-3">
      <div className="row justify-content-center">
        <h1 className="col-12 text-center">Xác nhận thanh toán</h1>
        <div className="col-5">
          <table className="table table-borderless" id="buy-confirm">
            <tbody>
              <tr>
                <td>Số trang:</td>
                <td className="text-end">{state.numPages}</td>
              </tr>
              <tr>
                <td>Đơn giá:</td>
                <td className="text-end">500 &#8363;</td>
              </tr>
              <tr className="fw-bold border-top">
                <td>Tổng cộng:</td>
                <td className="text-end">{state.numPages * 500} &#8363;</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-12 text-center mb-3">
          <button
            type="button"
            className="btn btn-secondary mx-3"
            onClick={handleCancel}
          >
            Hủy
          </button>
          <button
            type="button"
            className="btn btn-primary mx-3"
            onClick={handleUnpaid}
          >
            Thanh toán sau
          </button>
          <button
            type="button"
            className="btn btn-success mx-3"
            onClick={handlePaid}
          >
            Xác nhận thanh toán
          </button>
        </div>
      </div>
    </div>
  );
}

export default BuyConfirm;