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

export default function App() {
  const [user, setUser] = useState({ token: null, isSPSO: false, listFiles: [] });
  const [cookies, setCookie] = useCookies();
  
  useEffect(() => {
    // Log in/out signal
    // Take user credentials from cookies
    setUser({...user});
  }, []);
  
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