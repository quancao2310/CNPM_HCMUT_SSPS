import { useState } from "react";
import { useNavigate } from "react-router-dom";

function BuyForm() {
  const [numPages, setNumPages] = useState(0);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setNumPages(e.target.value);
    setShowError(false);
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (numPages <= 0 || !Number.isInteger(Number(numPages))) {
      setShowError(true);
      return;
    }
    document.getElementById('modal-close').click();
    setTimeout(() => {
      navigate('confirm', { state: {numPages: numPages} });
    }, 200);
  }
  
  return (
    <div
      className="col-12"
      style={{
        position: "relative",
      }}
    >
      <button
        type="button"
        className="btn btn-primary my-2 my-md-0"
        data-bs-toggle="modal"
        data-bs-target="#buy-modal"
        id="buy-modal-trigger"
      >
        Mua
      </button>
      <div
        className="modal fade"
        id="buy-modal"
        tabIndex="-1"
        aria-labelledby="buy-form-label"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="buy-form-label">
                Mua trang in
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id='modal-close'></button>
            </div>
            <div className="modal-body">
              <form id='buy-form'>
                <div className="mb-3">
                  <label htmlFor="num-pages" className="form-label">Nhập số trang cần mua</label>
                  <input 
                    type="number"
                    className="form-control"
                    id="num-pages"
                    name="num-pages"
                    onChange={handleChange}
                  />
                </div>
              </form>
              {showError &&
              <div 
                className="alert alert-danger py-3 " 
                role="alert"
              >
                <p className='m-0'>Vui lòng nhập một số hợp lệ.</p>
              </div>}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
              <button type="button" className="btn btn-primary" onClick={handleSubmit}>Xác nhận</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuyForm;