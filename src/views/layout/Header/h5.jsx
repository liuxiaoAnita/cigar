import React from "react";
import { connect } from "react-redux";
import homeLogo from "@/assets/images/home_logo.png";
import "./index.less";

const Footer = (props) => {
  const renderLogo = () => (
    <div className='header-logo'>
      <a href='/#/home'><img className='img' src={homeLogo} /></a>
      <div className='search-box'>
      </div>
    </div>
  );

  return (
    <React.Fragment>
    <div className='h5-header-content'>
      {renderLogo()}
    </div>
    <div style={{minHeight: '54rem', width: '100%'}}></div>
    </React.Fragment>
  );
};

export default connect(null, { })(Footer);
