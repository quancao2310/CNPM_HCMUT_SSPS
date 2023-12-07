import { Route, Routes } from "react-router-dom";
import PrintService from "../pages/PrintService";
import PrintHistory from "../pages/PrintHistory";
import PrintHistoryDetail from "../pages/PrintHistoryDetail";
import BuyPages from "../pages/BuyPages";
import NotFound from "../pages/NotFound";
import PrintConfig from "../pages/PrintConfig";
import PrintConfirm from "../pages/PrintConfirm";
import PrintStatus from "../pages/PrintStatus";
import BuyConfirm from "../pages/BuyConfirm";

// This is just a sample, can be changed later
function CustomerRoutes() {
  return (
    <Routes>
      <Route path='print'>
        <Route index element={<PrintService />} /> {/*Route dich vu dat in */}
        <Route path='config' element={<PrintConfig />} />
        <Route path='confirm' element={<PrintConfirm />} />
        <Route path='status' element={<PrintStatus />} />
        <Route path='log'>
          <Route index element={<PrintHistory />} />
          <Route path=':id' element={<PrintHistoryDetail />} />
        </Route>
      </Route>
      <Route path='buy'>
        <Route index element={<BuyPages />} />
        <Route path='confirm' element={<BuyConfirm />} />
        <Route path='log'>
          <Route index element={<h1>def</h1>} /> {/* Route trang tong hop lich su */}
          <Route path=':id' element={<h1>ghi</h1>} /> {/* Route xem tung lich su */}
        </Route>
      </Route>
      <Route path='support'>
        <Route index element={<h1>mnp</h1>} />
      </Route>
      <Route path='*' element={<NotFound />}/>
    </Routes>
  );
}

export default CustomerRoutes;