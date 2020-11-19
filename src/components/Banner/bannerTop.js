import React , { useState, useEffect } from 'react';
import { connect } from "react-redux";

import "./bannerTop.less";

const BannerTop = (props) => {
  const { title = '', descr = ''} = props
  const [titleArr, setTitleArr] = useState([]);

  useEffect(() => {
    if (title) setTitleArr(title.split(''))
  }, [title])

  return (
    <div className='title-box bannerTop'>
      <span className='title-name'>
        {titleArr.map((item, index) => (
          <em key={`name-icon-${index}`} className='name-icon'>{item}</em>
        ))}
      </span>
      {descr && <span className='title-descr'>{descr}</span>}
    </div>
  );
};

export default BannerTop;
