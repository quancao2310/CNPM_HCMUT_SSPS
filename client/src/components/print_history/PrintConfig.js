import { useEffect, useState } from "react";
import GeneralDetailTable from "./GeneralDetailTable";

function PrintConfig({ id }) {
  const [printConfigData, setPrintConfigData] = useState([]);
  
  useEffect(() => {
    // fetch print order data, then
    setPrintConfigData([
      {
        name: 'Cỡ giấy',
        value: dummyData.page_size
      },
      {
        name: 'Mặt giấy (1 hay 2 mặt)',
        value: dummyData.side
      },
      {
        name: 'Hướng giấy',
        value: dummyData.orientation
      },
      {
        name: 'Số trang trên 1 mặt in',
        value: dummyData.pages_per_sheet
      },
      {
        name: 'Tỉ lệ',
        value: dummyData.scale
      },
      {
        name: 'Những trang được in',
        value: dummyData.pages_to_be_printed
      }
    ]);
  }, []);
  
  return (
    <section>
      <h3 className='ps-2'>Cấu hình trang in</h3>
      <GeneralDetailTable data={printConfigData} />
    </section>
  );
}

export default PrintConfig;

const dummyData = {
  page_size: 'A4',
  side: 1,
  orientation: 'Ngang',
  pages_per_sheet: 1,
  scale: '100%',
  pages_to_be_printed: 'Tất cả'
}