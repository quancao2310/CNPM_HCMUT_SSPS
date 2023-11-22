import { Route, Routes } from "react-router-dom";
import NotFound from "../pages/NotFound";

// This is just a sample, can be changed later
function SPSORoutes() {
  return (
    <Routes>
      <Route path='printer'> {/* Route quan ly may in */}
        <Route index element={<h1>abc</h1>} /> {/* Route trang tong hop */}
        <Route path='add' element={<h1>ghi</h1>} />
      </Route>
      <Route path='*' element={<NotFound />}/>
    </Routes>
  );
}

export default SPSORoutes;