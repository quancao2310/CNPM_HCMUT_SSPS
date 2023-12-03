import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContext } from './context/UserContext';
import Header from './components/utils/Header';
import Footer from './components/utils/Footer';
import Home from './pages/Home';
import SPSORoutes from './routes/SPSORoutes';
import CustomerRoutes from './routes/CustomerRoutes';
import Login from './pages/Login';
import { useCookies } from 'react-cookie';
import axios from 'axios';

export default function App() {
  const [user, setUser] = useState({ token: null, isSPSO: false, listFiles: [] });
  const [cookies, setCookies, removeCookie] = useCookies();
  // Note: The react-cookie is having some bugs. The useCookies does not re-render when cookies are changed.
  // More info: https://stackoverflow.com/questions/73078198/react-cookies-dont-re-render-the-components-with-new-value-after-a-modify
  // I am just using this module right now without expecting the re-rendering behavior.
  
  // useEffect(() => {
  //   // Take user credentials from cookies
  //   let token = cookies.auth;
  //   let isSPSO = false;
  //   if (token === null || token === undefined) {
  //     token = null;
  //   }
    
  //   let fetchData = async () => {
  //     try {
  //       let userInfo = await axios.get(`${process.env.REACT_APP_SERVER_URL}/user`, {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${token}`
  //         }
  //       });
  //       console.log(userInfo);
  //     }
  //     catch (err) {
  //       if (err.response.status === 401) {
  //         if 
  //       }
  //     }
  //   }
    
  //   fetchData();
    
  //   setUser({ ...user, token: token, isSPSO: isSPSO });
  // }, [cookies]);
  
  return (
    <UserContext.Provider value={user}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/'>
            <Route index element={<Home />} />
            <Route path='login'>
              <Route index element={<Login />}/>
              <Route path='customer' element={<Login role='customer' />}/>
              <Route path='spso' element={<Login role='spso' />}/>
            </Route>
            <Route path='*' element={ user.isSPSO ? <SPSORoutes /> : <CustomerRoutes /> } />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </UserContext.Provider>
  );
}