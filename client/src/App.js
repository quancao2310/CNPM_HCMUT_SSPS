import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContext } from './context/UserContext';
import Header from './components/utils/Header';
import Footer from './components/utils/Footer';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import SPSORoutes from './routes/SPSORoutes';
import CustomerRoutes from './routes/CustomerRoutes';

export default function App() {
  const [user, setUser] = useState({ token: 'user1', isSPSO: false });
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
            <Route path='*' element={ user.isSPSO ? <SPSORoutes /> : <CustomerRoutes /> } />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </UserContext.Provider>
  );
}