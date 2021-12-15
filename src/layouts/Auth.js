import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import routes from "auth_routes.js";
import styles from "assets/jss/material-dashboard-pro-react/layouts/authStyle.js";
import register from "assets/img/register.jpeg";
import login from "assets/img/login.jpeg";
import lock from "assets/img/lock.jpeg";
import error from "assets/img/clint-mckoy.jpg";
import pricing from "assets/img/bg-pricing.jpeg";

import {observer,useObserver} from 'mobx-react-lite';
import {userStore} from 'store/userStore.js';

const useStyles = makeStyles(styles);
const AuthLayout = (props) => {
  const { ...rest } = props;
  const wrapper = React.createRef();
  // styles
  const classes = useStyles();
  const userData =useObserver( ()=>{
    console.log('service.js userData',userStore.user)
    return  userStore.user
    })
  
  React.useEffect(() => {
    document.body.style.overflow = "unset";
    // Specify how to clean up after this effect:
    return function cleanup() {};
  });

  const getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/authpage") {
        return (
          <Route
            path={prop.layout + prop.path}
            // component={prop.component}
            render={() => <prop.component userData={userData} 
                    {...rest}/>}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  const getBgImage = () => {
    if (window.location.pathname.indexOf("/authpage/register") !== -1) {
      return register;
    } else if (window.location.pathname.indexOf("/authpage/authcheck") !== -1) {
      return login;
    } else if (window.location.pathname.indexOf("/authpage/pricing") !== -1) {
      return pricing;
    } else if (
      window.location.pathname.indexOf("/authpage/lock-screen") !== -1
    ) {
      return lock;
    } else if (window.location.pathname.indexOf("/authpage/error") !== -1) {
      return error;
    }
  };
  const getActiveRoute = routes => {
    let activeRoute = "Plism Plus+";
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].views);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };
  return (
    <div>
      <AuthNavbar brandText={getActiveRoute(routes)} {...rest} />
      <div className={classes.wrapper} ref={wrapper}>
        <div
          className={classes.fullPage}
          style={{ backgroundImage: "url(" + getBgImage() + ")"}}
        >
          <Switch>
            {getRoutes(routes)}
            <Redirect from="/authpage" to="/authpage/register" />
          </Switch>
        </div>
      </div>
    </div>
  );
}

//))

export default observer(AuthLayout);
