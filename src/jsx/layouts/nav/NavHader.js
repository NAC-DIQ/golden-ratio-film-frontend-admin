import React, { Fragment, useContext, useState } from 'react';
/// React router dom
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../../context/ThemeContext';
import Logo from '../../../images/logo-full.png';

const NavHader = () => {
  const [toggle, setToggle] = useState(false);
  const { navigationHader, openMenuToggle, background } =
    useContext(ThemeContext);
  return (
    <div className='nav-header'>
      <Link to='/dashboard' className='brand-logo'>
        {background.value === 'dark' || navigationHader !== 'color_1' ? (
          <Fragment>
            <img src={Logo} alt='' width={'50%'} />
          </Fragment>
        ) : (
          <Fragment>
            <img src={Logo} alt='' width={'50%'} />
          </Fragment>
        )}
      </Link>

      <div
        className='nav-control'
        onClick={() => {
          setToggle(!toggle);
          openMenuToggle();
        }}>
        <div className={`hamburger ${toggle ? 'is-active' : ''}`}>
          <span className='line'></span>
          <span className='line'></span>
          <span className='line'></span>
        </div>
      </div>
    </div>
  );
};

export default NavHader;
