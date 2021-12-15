/*!

=========================================================
* Material Dashboard PRO React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import ServiceLayout from "layouts/Service.js";
import NewHomeLayout from "layouts/NewHomeLayout.js";
import ReportLayout from "layouts/ReportLayout.js";
import CertifyLayout from 'layouts/CertifyLayout.js';
import ReturnLoginLayout from 'layouts/ReturnLoginLayout.js';
import Schedule from 'views/inlandDrive/index.js';

import "assets/css/bootstrap.min.css";
import "assets/scss/material-dashboard-pro-react.scss?v=1.8.0";
import "assets/css/dashboard.css";

const hist = createBrowserHistory();

const NoMatch = (arg) => {
  console.log(arg);
  return (
  <h3>Not Found Page</h3>
  );
}

ReactDOM.render(
  // <Provider>
  // <Provider rootStore={rootStore}>
 // <Provider UserStore={useStore}>
    <Router history={hist}>
      <Switch>
        <Route path="/" exact component={NewHomeLayout} /> 
        <Route path="/authpage" component={AuthLayout} />
        <Route path="/admin" component={AdminLayout} />
        <Route path="/svc" component={ServiceLayout} />
        <Route path="/newhome" component={NewHomeLayout} />
        <Route path="/return_certify" component={CertifyLayout} />
        <Route path="/reportViewer"
          render={(props) => <ReportLayout {...props} />}
        />
        <Route path="/returnClose" exact component={ReturnLoginLayout}/>
        <Route path="/schedule" component={Schedule} />
        <Route component={NoMatch} />
      </Switch>
    </Router>,
   // </Provider>,
  document.getElementById("root")
);
