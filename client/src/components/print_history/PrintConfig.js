import GeneralDetailTable from "./GeneralDetailTable";

function PrintConfig({ data }) {
  const printConfigData = [
    {
      name: 'Cỡ giấy',
      value: data.page_size
    },
    {
      name: 'Mặt giấy (1 hay 2 mặt)',
      value: data.side
    },
    {
      name: 'Hướng giấy',
      value: data.orientation === 'landscape' ? 'Ngang' : 'Đứng'
    },
    {
      name: 'Số trang trên 1 mặt in',
      value: data.pages_per_sheet
    },
    {
      name: 'Tỉ lệ',
      value: data.scale * 100 + '%'
    },
    {
      name: 'Những trang được in',
      value: data.pages_to_be_printed === 'All' ? 'Tất cả' : data.pages_to_be_printed
    }
  ];
  
  return (
    <section>
      <h3 className='ps-2'>Cấu hình trang in</h3>
      <GeneralDetailTable data={printConfigData} />
    </section>
  );
}

export default PrintConfig;