function FilterBar() {
  return (
    <div className="row">
      {/* <label className='col-auto form-label'>Tên</label>
      <div className='col-4'>
        <input 
          type="text" 
          id='name'
          className='w-100'
        />
      </div> */}
      <label 
        htmlFor="select-printer" 
        className="col-4 col-md-3 col-lg-auto col-form-label"
      >
        Chọn máy in
      </label>
      <div className='col-8 col-md-9 col-lg mb-2'>
        <select 
          className="form-select"
          id="select-printer"
          aria-label="Select printer"
          onChange={() => {}}
        >
          {}
        </select>
      </div>
      <label 
        htmlFor="start-date" 
        className="col-4 col-md-3 col-lg-auto col-form-label"
      >
        Chọn ngày bắt đầu
      </label>
      <div className="col-8 col-md-9 col-lg mb-2">
        <input 
          type="date" 
          className="form-control" 
          id="start-date"
          name="start-date"
          onChange={(e) => {console.log(e.target.value);}}
        />
      </div>
      <label 
        htmlFor="end-date" 
        className="col-4 col-md-3 col-lg-auto col-form-label"
      >
        Chọn ngày kết thúc
      </label>
      <div className="col-8 col-md-9 col-lg mb-2">
        <input 
          type="date" 
          className="form-control" 
          id="end-date"
          name="end-date"
          onChange={() => {}}
        />
      </div>
    </div>
  );
}

export default FilterBar;