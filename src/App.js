import React, { Component } from 'react';
import intl from 'react-intl-universal';
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import store from "./store";
import Router from "./router";

const locales = {
  "en": require('./locales/en-US.json'),
  "zh": require('./locales/zh-CN.json'),
};

class App extends Component {
  state = {initDone: false}
  componentDidMount() {
    this.loadLocales();
  };

  loadLocales() {
    const currentLocale = localStorage.getItem("lang") || 'zh'
    intl.init({
      currentLocale, 
      locales,
    })
    .then(() => {
	  this.setState({initDone: true});
    });
  };

  render() { 
    console.log('store')
    console.log(store)
    return (
      this.state.initDone && <ConfigProvider >
        <Provider store={store}>
          <Router />
        </Provider>
      </ConfigProvider>
    );
  }
}
 
export default App;
