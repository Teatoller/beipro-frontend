/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/auth/login/Login";
import Register from "./components/auth/register/Register";
import ResetRequest from "./components/auth/reset/ResetRequest";
import Welcome from "./components/Landing/Welcome";
import FrontAdmin from "./components/FrontAdmin/FrontAdmin";
import Depots from "./components/Landing/Depots";
import Profile from "./components/auth/profile/Profile";
import CompanyAdmin from "./components/CompanyAdmin/CompanyAdmin";
import CompanyAdminEdit from "./components/CompanyAdmin/CompanyAdminEdit";
import CompanyAdminDelete from "./components/CompanyAdmin/CompanyAdminDelete";
import FrontAdminEdit from "./components/FrontAdmin/FrontAdminEdit";
import Reset from "./components/auth/reset/Reset";
import CompanyAdminCreate from "./components/CompanyAdmin/CompanyAdminCreate";
import FrontAdminCreate from "./components/FrontAdmin/FrontAdminCreate";
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
import AdminDelete from "./components/SuperAdmin/Admin/AdminDelete";
import CompanyDelete from "./components/SuperAdmin/Company/CompanyDelete";
import FrontOfficeDelete from "./components/SuperAdmin/FrontOffice/FrontOfficeDelete";
import FrontAdminDelete from "./components/FrontAdmin/FrontAdminDelete";
import Privacy from "./components/auth/common/Privacy";
import Terms from "./components/auth/common/Terms";
import ProfileImg from "./components/auth/profile/ProfileImg";
import ProfileEdit from "./components/auth/profile/ProfileEdit";
import ContactUs from "./components/auth/contact/ContactUs";
import Feedback from "./components/SuperAdmin/Feedback/Feedback";
import FeedbkDelete from "./components/SuperAdmin/Feedback/FeedbkDelete";

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
        <Route exact path="/privacy-policy" component={Privacy} />
        <Route exact path="/terms" component={Terms} />
        <AuthRoute exact path="/profile" component={Profile} />
        <AuthRoute exact path="/profileedit" component={ProfileEdit} />
        <AuthRoute exact path="/profileimg" component={ProfileImg} />
        <AuthRoute exact path="/contactus" component={ContactUs} />
        <Route exact path="/resetrequest" component={ResetRequest} />
        <Route exact path="/reset" component={Reset} />
        <AuthRoute path="/welcome" component={Welcome} />
        <AuthRoute exact path="/admin" component={CompanyAdmin} />
        <AuthRoute exact path="/adminedit" component={CompanyAdminEdit} />
        <AuthRoute exact path="/admincreate" component={CompanyAdminCreate} />
        <AuthRoute exact path="/admindelete" component={CompanyAdminDelete} />
        <AuthRoute exact path="/fadmin" component={FrontAdmin} />
        <AuthRoute exact path="/fadminedit" component={FrontAdminEdit} />
        <AuthRoute exact path="/fadmindelete" component={FrontAdminDelete} />
        <AuthRoute exact path="/fadmincreate" component={FrontAdminCreate} />
        <AuthRoute exact path="/sadmin" component={Admin} />
        <AuthRoute exact path="/sadmincreate" component={AdminCreate} />
        <AuthRoute exact path="/sadminedit" component={AdminEdit} />
        <AuthRoute exact path="/sadmindelete" component={AdminDelete} />
        <AuthRoute exact path="/company" component={Company} />
        <AuthRoute exact path="/companycreate" component={CompanyCreate} />
        <AuthRoute exact path="/companyedit" component={CompanyEdit} />
        <AuthRoute exact path="/companydelete" component={CompanyDelete} />
        <AuthRoute exact path="/frontoffice" component={FrontOffice} />
        <AuthRoute exact path="/frontofficecreate" component={FrontOfficeCreate} />
        <AuthRoute exact path="/frontofficeedit" component={FrontOfficeEdit} />
        <AuthRoute exact path="/frontofficedelete" component={FrontOfficeDelete} />
        <AuthRoute exact path="/depots" component={Depots} />
        <AuthRoute exact path="/audit" component={Audit} />
        <AuthRoute exact path="/auditview" component={AuditView} />
        <AuthRoute exact path="/feedback" component={Feedback} />
        <AuthRoute exact path="/feedbkdelete" component={FeedbkDelete} />
      </Switch>
    </div>
  );
};

export default BeiproRouter;
