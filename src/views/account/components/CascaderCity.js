import React from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import { Cascader } from "antd";
import provinces from "china-division/dist/provinces.json";
import cities from "china-division/dist/cities.json";
import areas from "china-division/dist/areas.json";

import "./CascaderCity.less";
areas.forEach(area => {
  const matchCity = cities.filter(city => city.code === area.cityCode)[0];
  if (matchCity) {
    matchCity.children = matchCity.children || [];
    matchCity.children.push({
      label: area.name,
      value: area.code
    });
  }
});

cities.forEach(city => {
  const matchProvince = provinces.filter(
    province => province.code === city.provinceCode
  )[0];
  if (matchProvince) {
    matchProvince.children = matchProvince.children || [];
    matchProvince.children.push({
      label: city.name,
      value: city.code,
      children: city.children
    });
  }
});

const options = provinces.map(province => ({
  label: province.name,
  value: province.code,
  children: province.children
}));
console.log(options)

const CascaderCity = (props) => {
  const {defaultValue, onChange} = props
  // const onChange = (value) => {
  //   console.log(value);
  // }
  return (
    <Cascader
      defaultValue={defaultValue}
      options={options}
      showSearch
      placeholder="选择 省/市/区"
      onChange={onChange}
      style={{ width: '100%' }}
    />
  );
};

export default withRouter(connect(null, { })(CascaderCity));
