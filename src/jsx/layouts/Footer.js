import React from 'react';

const Footer = () => {
  var d = new Date();
  return (
    <div className='footer'>
      <div className='copyright'>
        <p>
          Copyright {d.getFullYear()} © Designed &amp; Developed by{' '}
          <a href='https://nyxwolves.com/' target='_blank' rel='noreferrer'>
            Nyx Wolves
          </a>{' '}
        </p>
      </div>
    </div>
  );
};

export default Footer;
