import { Route, Routes } from "react-router-dom";
import FileUpload from "../components/FileUpload.js";

// This is just a sample, can be changed later
function CustomerRoutes() {
  return (
    <Routes>
      <Route path='print'>
        <Route index element={<FileUpload />} /> {/* Route dich vu dat in */}
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
    </Routes>
  );
}

export default CustomerRoutes;