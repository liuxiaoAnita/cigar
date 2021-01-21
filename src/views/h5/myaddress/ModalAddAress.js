import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import intl from 'react-intl-universal';
import {  Button, Input, message } from "antd";
import { Drawer, Form,  } from 'antd'
import { connect } from "react-redux";
import CascaderCity from '@/components/CascaderCity'
import "./index.less";
import { login, getUserInfo } from "@/store/actions";


const { TextArea } = Input;
const ColorItemContent = (props) => {
  const { data = {}, onChange } = props;
  const { name, phone, cityCode, address, province_city_town } = data;
  const [loading, setLoading] = useState(false);

  const [nameNew, setNameNew] = useState('')
  const [phoneNew, setPhoneNew] = useState('')
  const [cityCodeNew, setCityCodeNew] = useState([])
  const [addressNew, setAddressNew] = useState('')
  const [provinceCityTown, setCityTown] = useState('')

  useEffect(() => {
    setNameNew(name)
    setPhoneNew(phone)
    setCityCodeNew(cityCode)
    setAddressNew(address)
    setCityTown(province_city_town)
  },[name, phone, cityCode, address, province_city_town])


    // 地址弹窗中的js
    const handleOkAdd = () => {
      if (nameNew === ''){
        message.error('填写姓名')
        return;
      } else if (phoneNew === ''){
        message.error('填写电话')
        return;
      } else if (cityCodeNew === []){
        message.error('填写省市区')
        return;
      } else if (addressNew === ''){
        message.error('填写详细地址')
        return;
      }
      const newData = {
        ...data,
        name: nameNew,
        phone: phoneNew,
        cityCode: cityCodeNew,
        address: addressNew,
        province_city_town: provinceCityTown,
      }
      console.log(newData)
      onChange({newData})
    }

  const handleCancelAdd = () => {
    onChange()
  }
  

  const changeModalMesCity = (value) => {
    console.log(value)
    setCityTown(value.messageZH || '')
    setCityCodeNew(value.message || [])
  }
  return (
    <Drawer
        title="收货地址"
        width={300}
        // closable={false}
        visible={true}
        // onOk={handleOkAdd}
        onClose={handleCancelAdd}
        // className="modalAddress_h5"
      >
        <div className='add_edit_address'>
          <div className='address_item name_phone'>
            <Input className='receive-name' placeholder="姓名" value={nameNew} onChange={e => setNameNew(e.target.value)} />
            <Input placeholder="电话" className='receive-phone' value={phoneNew} onChange={e => setPhoneNew(e.target.value)}/>
          </div>
          <div className='address_item provice_city'>
            <CascaderCity defaultValue={cityCodeNew} onChange={value => changeModalMesCity(value)} />
          </div>
          <div className='address_item detail_address'>
              <TextArea placeholder='详细地址' rows={4} value={addressNew}  onChange={e => setAddressNew(e.target.value)}/>
          </div>
        </div>
        <div className='modal-address-button'>
          <Button onClick={handleCancelAdd}>取消</Button>
          <Button type='primary' onClick={handleOkAdd}>保存</Button>
        </div>
      </Drawer>
  );
};

const ColorContent = Form.create()(ColorItemContent);

export default connect((state) => state.user, { login })(
  ColorContent
);
