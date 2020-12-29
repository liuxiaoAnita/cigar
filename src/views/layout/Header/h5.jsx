import React from "react";
import { withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import homeLogo from "@/assets/images/home_logo.png";
import "./index.less";

const arrHide = [
  '/search',
  '/myself',
  '/myaddress',
  '/car',
  '/myorder',
  '/detail',
]

const Footer = (props) => {

  const isShowHeader = arrHide.indexOf(props.location.pathname) >= 0
  const renderLogo = () => (
    <div className='header-logo'>
      <a href='/#/home'><img className='img' src={homeLogo} /></a>
      <div className='search-box'>
      </div>
    </div>
  );

  return (
    <React.Fragment>
      {!isShowHeader && (
        <>
          <div className='h5-header-content'>
            {renderLogo()}
          </div>
          <div style={{minHeight: '54rem', width: '100%'}}></div>
        </>
      )}
    </React.Fragment>
  );
};

export default withRouter(Footer);
