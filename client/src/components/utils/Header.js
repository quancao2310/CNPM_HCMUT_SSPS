import { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { customerLinks, spsoLinks, profileLinks } from './page_links';
import '../../assets/styles/header.css';
import sampleAvt from '../../assets/img/standard_avt.jpg';

export default function Header() {
  const user = useContext(UserContext);
  const [pageLinks, setPageLinks] = useState([]);
  
  const isLogin = (user.token !== null);
  
  useEffect(() => {
    if (user.isSPSO) {
      setPageLinks(spsoLinks);
    }
    else {
      setPageLinks(customerLinks);
    }
  }, []);
  
  return (
    <header className="sticky-xl-top">
      <nav className="navbar navbar-expand-lg p-1 navbar-light bg-light sticky-top">
        <div className="container">
          <ToggleBtnSmallScreen />
          <NavLink className="navbar-brand my-brand" to="/">SSPS</NavLink>
          { isLogin ?
            <DropdownAvatar />
          :
            <NavLink to="/" role="button" className="btn btn-primary fw-medium text-white order-lg-last login-btn">Đăng nhập</NavLink>
          }
          <div className="collapse navbar-collapse" id="ssps-nav">
            <NavbarMenu pageLinks={pageLinks} />
          </div>
        </div>
      </nav>
    </header>
  );
}

function ToggleBtnSmallScreen() {
  return (
    <button
      className="navbar-toggler" 
      id="nav-toggler" 
      type="button" 
      data-bs-toggle="collapse" 
      data-bs-target="#ssps-nav" 
      aria-controls="ssps-nav" 
      aria-expanded="false" 
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
  );
}

function DropdownAvatar() {
  const links = profileLinks;
  
  return (
    <div className="dropdown order-lg-last mx-lg-3">
      <button 
        className="btn dropdown-toggle" 
        type="button" 
        data-bs-toggle="dropdown" 
        aria-expanded="false"
      >
        <img src={sampleAvt} alt="Avatar" width="32" height="32" className="rounded-circle" />
      </button>
      <ul className="dropdown-menu dropdown-menu-end text-small my-dropdown">
        {links.map(({ name, to }, index) => 
        <li key={index}>
          <Link className="dropdown-item" to={to}>{name}</Link>
        </li>
        )}
        <li><hr className="dropdown-divider" /></li>
        <li>
          <Link className="dropdown-item" to="/">Đăng xuất</Link>
        </li>
      </ul>
    </div>
  );
}

function NavbarMenu({ pageLinks }) {
  return (
    <ul className="navbar-nav fw-semibold fs-5 upper text-lg-center me-auto">
      {pageLinks.map(({ name, to }, index) => 
      <li key={index} className='nav-item m-2'>
        <NavLink to={to} className="nav-link text-secondary-emphasis">{name}</NavLink>
      </li>
      )}
    </ul>
  );
}