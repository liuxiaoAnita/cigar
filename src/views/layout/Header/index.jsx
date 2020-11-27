import React , { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import { Icon, Menu, Dropdown, Modal, Layout, Avatar,Input, Popconfirm, Divider, Button, message, Spin  } from "antd";
import homeDH from "@/assets/images/home_dh.png";
import homeGWC from "@/assets/images/home_gwc.png";
import homeLogo from "@/assets/images/home_logo.png";
import { Link } from "react-router-dom";
import { logout, getUserInfo, login } from "@/store/actions";
import FullScreen from "@/components/FullScreen";
import Settings from "@/components/Settings";
import "./index.less";
const { Header } = Layout;
const { Search } = Input;

const LayoutHeader = (props) => {
  const {
    token,
    avatar,
    name,
    sidebarCollapsed,
    logout,
    login,
    getUserInfo,
    showSettings,
    fixedHeader,
  } = props;
  token && getUserInfo(token);
  
  const [loading, setLoading] = useState(false);
  const [tabChild, setTabChild] = useState([]);
  const [isShowChild, setShowChild] = useState(false);
  const [isShowShopCar, setShowShopCar] = useState(false);
  const [categoryList, setCategoryList] = useState([]); //
  const [shopaData, setShopaData] = useState([]); //
  const [uid, setUid] = useState('')
  const [infoMes, setInfoMes] = useState({})
  
  useEffect(() => {
    const userUid = localStorage.getItem('userUid') || ''
    setUid(userUid)
    const userInfoMes = JSON.parse(localStorage.getItem('userInfoMes') || '{}')
    setInfoMes(userInfoMes)
    if (userUid && userUid !== '') {
      getCarMes(userUid)
      getHomeMes(userUid)
    }
  }, [])

  const confirm = (menuData) => {
    const uid = localStorage.getItem('userUid') || ''
    login({
      uid,
      cmd: 'delCart',
      cartIds: [menuData.id],
    })
      .then(res => {
        if (`${res.result}` === '0') {
          message.success('删除成功！')
          getCarMes(uid)
        } else {
          message.error('删除失败！')
        }
      })
  }

  const getCarMes = (uid) => {
    setLoading(true)
    login({cmd: 'cartList', uid})
      .then(res => {
        console.log(res)
        if(`${res.result}` === '0'){
          const {body = {}} = res
          const {dataList = []} = body
          setShopaData(dataList)
        } else {
          message.error(`${res.resultNote}`);
        }
        setLoading(false)
      })
      .catch((error) => {
        message.error(error);
        setLoading(false)
      });
  }

  const getHomeMes = (uid) => {
    login({cmd: 'getHomepage', uid})
      .then(res => {
        if (`${res.result}` === '0') {
          console.log(res.body)
          setCategoryList(res.body.categoryList || [])
        } else {
          message.error(`${res.resultNote}`);
        }
      })
      .catch((error) => {
        message.error(error);
      });
  }

  const handleLogout = () => {
    Modal.confirm({
      title: "注销",
      content: "确定要退出系统吗?",
      okText: "确定",
      cancelText: "取消",
      onOk: () => {
        localStorage.clear();
        window.location.reload();
      },
    });
  };
  const handelkMySetting = ({ key }) => {
    switch (key) {
      case "logout":
        handleLogout(token);
        break;
      default:
        break;
    }
  };
  const menu = (
    <Menu onClick={handelkMySetting}>
      <Menu.Item key="dashboard">
        <Link to="/myself">账户信息</Link>
      </Menu.Item>
      <Menu.Item key="meau">
        <Link to="/myorder">我的订单</Link>
      </Menu.Item>
      <Menu.Item key="heart">
        <Link to="/heart">心愿单</Link>
      </Menu.Item>
      <Menu.Item key="heart">
        <Link to="/myrate">我的评价</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">注销</Menu.Item>
    </Menu>
  );
  const onChangeNumber = (value) => {
    console.log('changed', value);
  }
  const carBox = () => {
    return (
      <div
        className='hover-shop-bus'
        onMouseEnter={() => setShowShopCar(true)} 
        onMouseLeave={() => setShowShopCar(false)} 
      >
        <div className='shop-car-box'>
        <Spin spinning={loading} >
          {shopaData.map((item, index) => {
            return (
              <div className='item-box'  key={`shop-header-${index}`}>
                <img className='item-image' src={item.image} />
                <div className='item-detail'>
                  <span className='item-name'>{item.zh_name}{item.en_name}</span>
                  <div className='item-action'>
                    <span className='item-qty'>{item.qty} </span>
                    {/* <InputNumber className='item-num-input' size="large" min={1} max={100000} defaultValue={item.qty} 
                      onChange={onChangeNumber}
                    /> */}
                      <Button className='item-btn-delete' shape="circle" onClick={() => confirm(item)} icon="delete"  title="删除" />
                  </div>
                </div>
              </div>
            )
          })}
        </Spin>
        </div>
        
        <Divider />
        <Button className='go-car-btn'  type="primary" key="logout" onClick={() => {
          props.history.push('/car?isPay=paying')
          window.location.reload()
        }}>去结账</Button>
      </div>
    )
  }
  const computedStyle = () => {
    let styles;
    if (fixedHeader) {
      if (sidebarCollapsed) {
        styles = {
          width: "calc(100% - 80px)",
        };
      } else {
        styles = {
          // padding: "0 calc((100% - 1200px) /2)",
          left: "0",
          display: 'flex',
          flexDirection: 'column',
          height: 'auto',
        };
      }
    } else {
      styles = {
        width: "100%",
      };
    }
    return styles;
  };

  const handleEnter = (data) => {
    console.log('ttt')
    setTabChild(data)
    setShowChild(true)
  }
  const handleOut = () => {
    console.log('fff')
    setShowChild(false)

  }
  const renderTabs = () => (
    <div className='tabs_content'>
      <div className='tab-father-content'>
        {categoryList && categoryList.map((item, index) => (
          <div key={`dropdown_item_${index}`} className='tab-item'>
          {
            item.category2List.length > 0 && 
                <div
                  className='tab-name'
                  onMouseEnter={() => handleEnter(item.category2List)} 
                  onMouseLeave={handleOut}
                >
                {item.zh_name}<Icon style={{ color: "#fff" }} type="caret-down" />
                </div>
          }
          { item.category2List && item.category2List.length === 0 &&  
            <div
              className='tab-name'
              onClick={() => {
                localStorage.setItem('categoryId', item.id)
                localStorage.setItem('categoryType', item.type)
                if (`${item.type}` === '1') {
                  props.history.push(`/cigardetail?type=${item.type}&categoryId=${item.id}`)
                  window.location.reload()
                } else if (`${item.type}` === '2') {
                  props.history.push(`/myplatter?type=${item.type}&categoryId=${item.id}`)
                  window.location.reload()
                } else if (`${item.type}` === '3') {
                  props.history.push(`/cigardetail?type=${item.type}&categoryId=${item.id}`)
                  window.location.reload()
                }
                
              }}
            >
              {item.zh_name}
            </div> 
          }
        </div>
        ))}
      </div>
      <div onMouseEnter={() => setShowChild(true)} onMouseLeave={handleOut} className={`tab-children ${isShowChild ? 'show-child' : 'not-show-child'}`}>
        {
          tabChild.length > 0 && tabChild.map((item, index) => (
            <div
              key={`tab-child-${index}`}
              className='child-item'
              onClick={() => {
                console.log(item.id);
                localStorage.setItem('categoryId', item.id)
                props.history.push(`/cigardetail?type=${item.type}&categoryId=${item.id}`)
                window.location.reload()
              }}
            >
              {item.zh_name}
            </div>
          ))
        }
      </div>
    </div>
  )
  
  const handleClick = (lang) => {
      localStorage.setItem("lang", lang)
      window.location.reload();
  }
  const renderLogo = () => (
    <div className='header-logo'>
      <a href='/#/home'><img src={homeLogo} /></a>
      <div className='search-box'>
        <Search
          placeholder="搜寻"
          onSearch={value => console.log(value)}
          style={{ width: 200 }}
        />
        {/* <span className='changeLanuge'>
          <i onClick={() => handleClick('zh')} className='itemBtn'>中文</i>
          /
          <i onClick={() => handleClick('en')} className='itemBtn'>英文</i>
        </span> */}
      </div>
    </div>
  );

  return (
    <>
      {/* {fixedHeader ? <Header style={{height: '270px'}} /> : null} */}
      {fixedHeader ? <Header /> : null}
      <Header
        style={computedStyle()}
        className={fixedHeader ? "fix-header" : ""}
      >
        <div className='header-top'>
          <div className='phone-call-me'>
          <img src={homeDH} />&nbsp;&nbsp;400-842-4625
          </div>
          {/* <BreadCrumb /> */}
          <div className="right-menu">
            {showSettings ? <FullScreen /> : null}
            {showSettings ? <Settings /> : null}
            <div
              className='car-top'
              onMouseEnter={() => setShowShopCar(true)} 
              onMouseLeave={() => setShowShopCar(false)} 
              onClick={() =>{ props.history.push("/car")}}
            >
              <img src={homeGWC} />
              <span>购物车 <i className='car-num'>{2}</i></span>
            </div>
            {infoMes.nickname ?
            <div className="dropdown-wrap">
              <Dropdown overlay={menu}>
                <div>
                  <Avatar shape="square" size="medium" src={infoMes.nickname} />
                  <span className='name'>{infoMes.nickname}</span>
                  <Icon style={{ color: "rgba(0,0,0,.3)" }} type="caret-down" />
                </div>
              </Dropdown>
            </div>
             : 
             <div className='noLogin'>
               <span className='btn-login' onClick={() => { props.history.push("/login")}}>登录</span>
               <span className='btn-register' onClick={() =>{ props.history.push("/register")}}>注册</span>
             </div>
             }
          </div>
        </div>
      {/* {renderLogo()} */}
      </Header>
      {renderLogo()}
      {renderTabs()} 
      { isShowShopCar && carBox() } 
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state,
    ...state.app,
    ...state.user,
    ...state.settings,
  };
};
export default withRouter(connect(mapStateToProps, { login, logout, getUserInfo })(LayoutHeader));
