import { useEffect, useState } from "react";
import GeneralDetailTable from "./GeneralDetailTable";

function DocumentDetail({ id }) {
  const [documentDetailData, setDocumentDetailData] = useState([]);
  
  useEffect(() => {
    // fetch document detail data, then
    setDocumentDetailData([
      {
        name: 'Tên tài liệu',
        value: dummyData.document_name
      },
      {
        name: 'Kiểu tệp',
        value: dummyData.file_type
      },
      {
        name: 'Số trang của tài liệu',
        value: dummyData.no_of_pages
      }
    ]);
  }, []);
  
  return (
    <section>
      <h3 className='ps-2'>Thông tin tài liệu</h3>
      <GeneralDetailTable data={documentDetailData} />
    </section>
  );
}

export default DocumentDetail;

const dummyData = {
  document_name: 'abc.doc',
  file_type: 'doc',
  no_of_pages: 50
}