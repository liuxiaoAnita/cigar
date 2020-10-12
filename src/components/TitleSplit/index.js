import React from "react";
import { connect } from "react-redux";

import "./index.less";
const TitleSplitPage = (props) => {
  const {title, descr, contentStyle = {}, fontSize = '58px', detailMes = ''} = props
  const titleArr = title.split('')

  return (
    <div className='title-split-box'>
      <span className='title-name' style={{fontSize}}>
        {titleArr.map((item, index) => (
          <em key={`name-icon-${index}`} className='name-icon'>{item}</em>
        ))}
      </span>
      {descr && <span className='title-descr'>{descr}</span>}
      {detailMes && <span className='title-detailMes' dangerouslySetInnerHTML={{__html: detailMes}}></span>}
    </div>
  );
};

export default connect(null)(TitleSplitPage);
