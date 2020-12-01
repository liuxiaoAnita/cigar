import React, {useState, useEffect} from "react";
import { Redirect, withRouter, Route, Switch } from "react-router-dom";
import DocumentTitle from "react-document-title";
import { connect } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Layout } from "antd";
import { getMenuItemInMenuListByProperty } from "@/utils";
import routeList from "@/config/routeMap";
import routeListH5 from "@/config/routeMapH5";
import menuList from "@/config/menuConfig";
const { Content } = Layout;

const getPageTitle = (menuList, pathname) => {
  let title = "Cigar";
  // let item = getMenuItemInMenuListByProperty(menuList, "path", pathname);
  // if (item) {
  //   title = `${item.title} - Cigar`;
  // }
  return title;
};

const LayoutContent = (props) => {
  const { role, location, windowWidth } = props;
  const { pathname } = location;
  const [routeArr, setRouteArr] = useState(routeList)
  const [isPC, setPCStatus] = useState(true)
  const handleFilter = (route) => {
    // 过滤没有权限的页面
    return role === "admin" || !route.roles || route.roles.includes(role);
  };

  useEffect(() => {
    if (windowWidth < 1000) {
      setRouteArr(routeListH5);
      setPCStatus(false)
    } else {
      setRouteArr(routeList)
      setPCStatus(true)
    }
  }, [windowWidth])
  return (
    <DocumentTitle title={getPageTitle(menuList, pathname)}>
      <Content className={isPC ? 'PC-content' : 'H5-content'} style={{ minHeight: "max-content" }}>
        <TransitionGroup>
          <CSSTransition
            key={location.pathname}
            timeout={500}
            classNames="fade"
            exit={false}
          >
            <Switch location={location}>
              <Redirect exact from="/" to="/home" />
              {routeArr.map((route) => {
                return (
                  handleFilter(route) && (
                    <Route
                      component={route.component}
                      key={route.path}
                      path={route.path}
                    />
                  )
                );
              })}
              <Redirect to="/error/404" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </Content>
    </DocumentTitle>
  );
};

export default connect((state) => state.user)(withRouter(LayoutContent));
