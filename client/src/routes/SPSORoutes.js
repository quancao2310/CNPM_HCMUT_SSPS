import { Route, Routes } from "react-router-dom";

// This is just a sample, can be changed later
function SPSORoutes() {
  return (
    <Routes>
      <Route path='printer'> {/* Route quan ly may in */}
        <Route index element={<h1>abc</h1>} /> {/* Route trang tong hop */}
        <Route path='add' element={<h1>ghi</h1>} />
      </Route>
    </Routes>
  );
}

export default SPSORoutes;