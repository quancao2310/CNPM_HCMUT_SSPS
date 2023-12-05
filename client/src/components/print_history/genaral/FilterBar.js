import { useContext } from 'react';
import { UserContext } from '../../../context/UserContext';

function FilterBar({ printerList, handleChoosePrinter, handleTimeChange, handleCustomerChange }) {
  const { user } = useContext(UserContext);
  return (
    <div className='row'>
      {user.isSPSO &&
      <>
      <label 
        htmlFor='customer-name'
        className='col-4 col-md-3 col-lg-auto col-form-label'
      >
        Tên
      </label>
      <div className='col-8 col-md-9 col-lg mb-2'>
        <input 
          type='text'
          className='form-control w-100'
          id='customer-name'
          name='customer-name'
          onChange={handleCustomerChange}
        />
      </div>
      </>}
      <label 
        htmlFor='select-printer' 
        className='col-4 col-md-3 col-lg-auto col-form-label'
      >
        Chọn máy in
      </label>
      <div className='col-8 col-md-9 col-lg mb-2'>
        <select 
          className='form-select'
          id='select-printer'
          name='select-printer'
          aria-label='Select printer'
          onChange={handleChoosePrinter}
        >
          <option value='default'>Chọn máy in</option>
          {printerList.map((printer, index) =>
          <option key={index} value={printer}>{printer}</option>
          )}
        </select>
      </div>
      <label 
        htmlFor='timeStart' 
        className='col-4 col-md-3 col-lg-auto col-form-label'
      >
        Chọn ngày bắt đầu
      </label>
      <div className='col-8 col-md-9 col-lg mb-2'>
        <input 
          type='date' 
          className='form-control' 
          id='timeStart'
          name='timeStart'
          onChange={handleTimeChange}
        />
      </div>
      <label 
        htmlFor='timeEnd' 
        className='col-4 col-md-3 col-lg-auto col-form-label'
      >
        Chọn ngày kết thúc
      </label>
      <div className='col-8 col-md-9 col-lg mb-2'>
        <input 
          type='date' 
          className='form-control' 
          id='timeEnd'
          name='timeEnd'
          onChange={handleTimeChange}
        />
      </div>
    </div>
  );
}

export default FilterBar;