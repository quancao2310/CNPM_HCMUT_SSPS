import { Route, Routes } from "react-router-dom";
import PrintService from "../pages/PrintService";
import NotFound from "../pages/NotFound";

// This is just a sample, can be changed later
function CustomerRoutes() {
  return (
    <Routes>
      <Route path='print'>
        <Route index element={<PrintService />} /> {/* Route dich vu dat in */}
        <Route path='log'> {/* Route lich su in */}
          <Route index element={<h1>def</h1>} /> {/* Route trang tong hop lich su */}
          <Route path=':id' element={<h1>ghi</h1>} /> {/* Route xem tung lich su */}
        </Route>
      </Route>
      <Route path='purchase'>
        <Route index element={<h1>jkl</h1>} />
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