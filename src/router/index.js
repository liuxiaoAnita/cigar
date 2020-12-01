import React from "react";
import {  HashRouter as Routers, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getUserInfo } from "@/store/actions";
import Layout from "@/views/layout";
import Login from "@/views/login";
class Router extends React.Component {
  state = {
    isPC: true,
    windowWidth: 0,
  }
  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
    let clientW = document.documentElement.clientWidth;
    this.handleClientW(clientW,1040);
  };

  //移除监听器，防止多个组件之间导致this的指向紊乱
  componentWillUnmount() { 
    window.removeEventListener('resize', this.handleResize.bind(this));
  }

  handleClientW = (width, num = 1000) => {
    const originWidth = 375;
    const fontValue = ((62.5 * width) /originWidth).toFixed(2);
    document.documentElement.style.fontSize = (width / 375) + 'px';
    if (width < 375) {
      document.documentElement.style.fontSize = (width / 375) + 'px';
    }
    if(width >= num){
      this.setState({
        isPC: true,
        windowWidth: width,
      })
    }else{
      this.setState({
        windowWidth: width,
        isPC: false,
      })
    }
  }

  handleResize = e => {
    //e.target.innerWidth是浏览器窗口的宽度
    // 根据宽度不同，进行你所要进行的操作
    const e_width = e.target.innerWidth;
    this.handleClientW(e_width);
  }
  
  render() {
    const { token, role, getUserInfo } = this.props;
    const {isPC, windowWidth} = this.state;
    
    return (
      <Routers>
        <Switch>
          {/* <Route exact path="/login" component={Login} /> */}
          <Route
            path="/"
            render={() => {
              // if (!token) {
              //   return <Redirect to="/login" />;
              // } else {
              //   if (role) {
                  return <Layout isPC={isPC} windowWidth={ windowWidth } />;
              //   } else {
                  // getUserInfo(token).then(() => <Layout />);
              //   }
              // }
            }}
          />
        </Switch>
      </Routers>
    );
  }
}

export default connect((state) => state.user, { getUserInfo })(Router);
