import React, { useState } from 'react';

import { Link } from 'react-router-dom';
/// Scroll
import PerfectScrollbar from 'react-perfect-scrollbar';

/// Image
// import profile from '../../../images/profile/pic1.jpg';

const Header = ({ onNote }) => {
  const [searchBut, setSearchBut] = useState(false);
  var path = window.location.pathname.split('/');
  var name = path[path.length - 1].split('-');
  var filterName = name.length >= 3 ? name.filter((n, i) => i > 0) : name;
  var finalName = filterName.includes('app')
    ? filterName.filter((f) => f !== 'app')
    : filterName.includes('ui')
    ? filterName.filter((f) => f !== 'ui')
    : filterName.includes('uc')
    ? filterName.filter((f) => f !== 'uc')
    : filterName.includes('basic')
    ? filterName.filter((f) => f !== 'basic')
    : filterName.includes('jquery')
    ? filterName.filter((f) => f !== 'jquery')
    : filterName.includes('table')
    ? filterName.filter((f) => f !== 'table')
    : filterName.includes('page')
    ? filterName.filter((f) => f !== 'page')
    : filterName.includes('email')
    ? filterName.filter((f) => f !== 'email')
    : filterName.includes('ecom')
    ? filterName.filter((f) => f !== 'ecom')
    : filterName.includes('chart')
    ? filterName.filter((f) => f !== 'chart')
    : filterName.includes('editor')
    ? filterName.filter((f) => f !== 'editor')
    : filterName;

  const userDetails = localStorage.getItem('userDetails');
  const userInfo = JSON.parse(userDetails);
  const Profile = userInfo.user.profile;
  return (
    <div className='header'>
      <div className='header-content'>
        <nav className='navbar navbar-expand'>
          <div className='collapse navbar-collapse justify-content-between'>
            <div className='header-left'>
              <div
                className='dashboard_bar'
                style={{ textTransform: 'capitalize' }}></div>
              <div className='nav-item d-flex align-items-center'></div>
            </div>
            {/* <ul className='navbar-nav header-right main-notification'>
              <li className='nav-item header-profile'>
                <Link
                  to={'#'}
                  className='nav-link'
                  role='button'
                  data-bs-toggle='dropdown'>
                  <img src={Profile} width='20' alt='' />
                </Link>
              </li>
            </ul> */}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
