import { useState, useEffect, Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';
import { UserContext } from './context/UserContext';
import Header from './components/utils/Header';
import Footer from './components/utils/Footer';
import Home from './pages/Home';
import NotFound from './components/utils/NotFound';

export default function App() {
  
  
  const [user, setUser] = useState({ token: 'user1', isSPSO: false });
  useEffect(() => {
    // Log in/out signal
    // Take user credentials from cookies
    setUser({...user});
  }, [user]);
  
  return (
    <UserContext.Provider value={user}>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        {/* <Fragment>
          {
          user.isSPSO ? 
            <SPSORoutes />
          :
            <CustomerRoutes />
          }
        </Fragment> */}
        <Route path='*' element={<NotFound />}/>
      </Routes>
      <Footer />
    </UserContext.Provider>
  );
}

function CustomerRoutes() {
  return (
    <Fragment>
      <Route path='print'>
        <Route index element={<></>} /> {/* Route dich vu dat in */}
        <Route path='log'> {/* Route lich su in */}
          <Route index element={<></>} /> {/* Route trang tong hop lich su */}
          <Route path=':id' element={<></>} /> {/* Route xem tung lich su */}
        </Route>
      </Route>
      <Route path='purchase'>
        <Route />
      </Route>
      <Route path='support'>
        <Route />
      </Route>
    </Fragment>
  );
}

function SPSORoutes() {
  return (
    <>
      <Route path='printer'> {/* Route quan ly may in */}
        <Route index element={<></>} /> {/* Route trang tong hop */}
        <Route path='add' />
      </Route>
    </>
  );
}