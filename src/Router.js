/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ResetRequest from "./components/Auth/ResetRequest";
import Welcome from "./components/Landing/Welcome";
import FrontAdmin from "./components/Admin/FrontAdmin";
import Depots from "./components/Landing/Depots";
import Profile from "./components/Auth/Profile";
import CompanyAdmin from "./components/Admin/CompanyAdmin";
import CompanyAdminEdit from "./components/Admin/CompanyAdminEdit";
import FrontAdminEdit from "./components/Admin/FrontAdminEdit";
import Reset from "./components/Auth/Reset";
import CompanyAdminCreate from "./components/Admin/CompanyAdminCreate";
import FrontAdminCreate from "./components/Admin/FrontAdminCreate";
import Admin from "./components/SuperAdmin/Admin/Admin";
import AdminCreate from "./components/SuperAdmin/Admin/AdminCreate";
import AdminEdit from "./components/SuperAdmin/Admin/AdminEdit";
import Company from "./components/SuperAdmin/Company/Company";
import CompanyCreate from "./components/SuperAdmin/Company/CompanyCreate";
import CompanyEdit from "./components/SuperAdmin/Company/CompanyEdit";
import FrontOffice from "./components/SuperAdmin/FrontOffice/FrontOffice";
import FrontOfficeCreate from "./components/SuperAdmin/FrontOffice/FrontOfficeCreate";
import FrontOfficeEdit from "./components/SuperAdmin/FrontOffice/FrontOfficeEdit";
import Audit from "./components/SuperAdmin/Audit/Audit";
import AuditView from "./components/SuperAdmin/Audit/AuditView";

const checkAuth = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return false;
  }
  return true;
};

// eslint-disable-next-line react/prop-types
const AuthRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        checkAuth() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/"
            }}
          />
        )
      }
    />
  );
};

const BeiproRouter = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <AuthRoute exact path="/profile" component={Profile} />
        <Route exact path="/resetrequest" component={ResetRequest} />
        <Route exact path="/reset" component={Reset} />
        <AuthRoute path="/welcome" component={Welcome} />
        <AuthRoute exact path="/admin" component={CompanyAdmin} />
        <AuthRoute exact path="/adminedit" component={CompanyAdminEdit} />
        <AuthRoute exact path="/admincreate" component={CompanyAdminCreate} />
        <AuthRoute exact path="/fadmin" component={FrontAdmin} />
        <AuthRoute exact path="/fadminedit" component={FrontAdminEdit} />
        <AuthRoute exact path="/fadmincreate" component={FrontAdminCreate} />
        <AuthRoute exact path="/sadmin" component={Admin} />
        <AuthRoute exact path="/sadmincreate" component={AdminCreate} />
        <AuthRoute exact path="/sadminedit" component={AdminEdit} />
        <AuthRoute exact path="/company" component={Company} />
        <AuthRoute exact path="/companycreate" component={CompanyCreate} />
        <AuthRoute exact path="/companyedit" component={CompanyEdit} />
        <AuthRoute exact path="/frontoffice" component={FrontOffice} />
        <AuthRoute exact path="/frontofficecreate" component={FrontOfficeCreate} />
        <AuthRoute exact path="/frontofficeedit" component={FrontOfficeEdit} />
        <AuthRoute exact path="/depots" component={Depots} />
        <AuthRoute exact path="/audit" component={Audit} />
        <AuthRoute exact path="/auditview" component={AuditView} />
      </Switch>
    </div>
  );
};

export default BeiproRouter;
