import { Route, Routes } from "react-router-dom";
import PrintHistory from "../pages/PrintHistory";
import PrintHistoryDetail from "../pages/PrintHistoryDetail";
import PrintReport from "../pages/PrintReport";
import PrintReportDetail from "../pages/PrintReportDetail";
import NotFound from "../pages/NotFound";
import PrinterManagement from "../pages/PrinterManagement";

// This is just a sample, can be changed later
function SPSORoutes() {
  return (
    <Routes>
      <Route path='printer'> {/* Route quan ly may in */}
        <Route index element={<PrinterManagement />} /> {/* Route trang tong hop */}
        <Route path='add' element={<h1>ghi</h1>} />
      </Route>
      <Route path='printlog'> {/* Route xem lich su in cua nguoi dung */}
        <Route index element={<PrintHistory />} />
        <Route path=':id' element={<PrintHistoryDetail />} />
      </Route>
      <Route path='report'>
        <Route index element={<PrintReport />} />
        <Route path=':year/:month?' element={<PrintReportDetail />} />
      </Route>
      <Route path='*' element={<NotFound />}/>
    </Routes>
  );
}

export default SPSORoutes;