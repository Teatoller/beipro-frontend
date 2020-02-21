import React from "react";
import { Switch, Route } from "react-router-dom";
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

const BeiproRouter = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/resetrequest" component={ResetRequest} />
        <Route exact path="/reset" component={Reset} />
        <Route path="/welcome" component={Welcome} />
        <Route exact path="/admin" component={CompanyAdmin} />
        <Route exact path="/adminedit" component={CompanyAdminEdit} />
        <Route exact path="/admincreate" component={CompanyAdminCreate} />
        <Route exact path="/fadmin" component={FrontAdmin} />
        <Route exact path="/fadminedit" component={FrontAdminEdit} />
        <Route exact path="/fadmincreate" component={FrontAdminCreate} />
        <Route exact path="/sadmin" component={Admin} />
        <Route exact path="/sadmincreate" component={AdminCreate} />
        <Route exact path="/sadminedit" component={AdminEdit} />
        <Route exact path="/company" component={Company} />
        <Route exact path="/companycreate" component={CompanyCreate} />
        <Route exact path="/companyedit" component={CompanyEdit} />
        <Route exact path="/frontoffice" component={FrontOffice} />
        <Route exact path="/frontofficecreate" component={FrontOfficeCreate} />
        <Route exact path="/frontofficeedit" component={FrontOfficeEdit} />
        <Route exact path="/depots" component={Depots} />
        <Route exact path="/audit" component={Audit} />
        <Route exact path="/auditview" component={AuditView} />
      </Switch>
    </div>
  );
};
export default BeiproRouter;
