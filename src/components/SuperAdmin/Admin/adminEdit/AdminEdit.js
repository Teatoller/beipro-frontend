/* eslint-disable no-shadow */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable camelcase */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "../../../../axios";
import { Nav } from "../../../Landing/Nav";
import Footer from "../../../Landing/Footer";
import Error from "../../../Error";
import { Spinner } from "../../../../spinner/Spinner";
import Pagination from "../../../Pagination";
import UnAuthorized from "../../../auth/common/UnAuthorized";
import ConstSAdmin from "../../ConstSAdmin";
import EditBtn from "../../common/EditBtn";
import BearerToken from "../../../../services/BearerToken";

export const AdminEdit = props => {
  const [loading, setLoading] = useState(true);
  const [company_id, setCompany_Id] = useState("");
  const [staff_id, setStaff_Id] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [admins, setAdmins] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [itemCountPerPage] = useState(10);
  const [errors, setErrors] = useState("");

  const onSubmit = e => {
    e.preventDefault();
    const data = {
      company_id,
      firstname,
      lastname,
      staff_id,
      email,
      role
    };

    const sadminid = localStorage.getItem("sadminid");
    const { history } = props;
    const config = BearerToken();

    axios
      .patch(`/admins/${sadminid}`, data, config)
      .then(response => {
        if (response) {
          setTimeout(() => history.push(`/sadmin`), 50);
        }
        setLoading(false);
      })
      .catch(errors => {
        setErrors(errors.response.request.response);
        setLoading(false);
      });
  };

  const getAdminsData = () => {
    const config = BearerToken();

    axios.get(`/admins`, config).then(response => {
      const adminData = response.data;
      setAdmins(adminData);
      setLoading(false);
    });
  };

  const handleCancelClick = e => {
    const { history } = props;

    e.preventDefault();

    history.push("/sadmin");
    setLoading(false);
  };

  const getAdminData = () => {
    const config = BearerToken();
    const sadminid = localStorage.getItem("sadminid");

    axios.get(`/admins/${sadminid}`, config).then(response => {
      const selectedadminData = response.data;

      const adminObj = selectedadminData[0];

      setCompany_Id(adminObj.company_id);
      setFirstname(adminObj.firstname);
      setLastname(adminObj.lastname);
      setStaff_Id(adminObj.staff_id);
      setEmail(adminObj.email);
      setRole(adminObj.role);
      setLoading(false);
    });
  };

  useEffect(() => {
    setTimeout(() => getAdminsData(), 500);
    setTimeout(() => getAdminData(), 500);
  }, []);

  const userRole = ConstSAdmin();

  const companyAdminStaff = admins.map((item, index) => {
    return (
      <tr key={item.id}>
        <td className="admin text-center">{index + 1}</td>
        <td className="admin text-center">{item.company_id}</td>
        <td className="admin text-center">{item.firstname}</td>
        <td className="admin text-center">{item.lastname}</td>
        <td className="admin text-center">{item.staff_id}</td>
        <td className="admin text-center">{item.email}</td>
        <td className="admin text-center">{item.role}</td>
      </tr>
    );
  });

  // Get current items
  const indexOfLastItem = activePage * itemCountPerPage;
  const indexOfFirstItem = indexOfLastItem - itemCountPerPage;
  const currentItems = companyAdminStaff.slice(indexOfFirstItem, indexOfLastItem);

  // Change page

  const paginate = pageNumber => {
    setActivePage(pageNumber);
  };

  const dangerStyle = {
    fontStyle: "italic",
    color: "red"
  };

  return (
    <div>
      <Nav />
      {userRole ? (
        <>
          <div className="container" aria-label="Create company front admin form">
            <div className="row">
              <span>{loading ? <Spinner /> : null}</span>
              <div className="col-sm-6 m-auto">
                <h5 className="text-secondary">Entry Pad</h5>
                <form noValidate onSubmit={onSubmit}>
                  <fieldset>
                    <h5 className="text-secondary">Admin Details</h5>
                    <div className="form-group row">
                      <label htmlFor="frontOfficeId" className="col-sm-2 col-form-label-sm">
                        Company Id:
                      </label>
                      <div className="col-sm-10 mb-1">
                        <input
                          type="decimal"
                          name="company_id"
                          className="form-control form-control-sm"
                          id="companyId"
                          placeholder={company_id}
                          onChange={e => {
                            setCompany_Id(e.target.value);
                          }}
                          aria-describedby="companyIdInput"
                          aria-required="true"
                          aria-invalid="false"
                        />
                      </div>

                      <label
                        htmlFor="lastName"
                        className="col-sm-2 col-form-label col-form-label-sm"
                      >
                        Firstname:
                      </label>
                      <div className="col-sm-10 mb-1">
                        <input
                          type="text"
                          name="firstname"
                          className="form-control form-control-sm"
                          id="firstname"
                          placeholder={firstname}
                          onChange={e => {
                            setFirstname(e.target.value);
                          }}
                          aria-describedby="firstnameInput"
                          aria-required="true"
                          aria-invalid="false"
                        />
                      </div>

                      <label
                        htmlFor="lastName"
                        className="col-sm-2 col-form-label col-form-label-sm"
                      >
                        Lastname:
                      </label>
                      <div className="col-sm-10 mb-1">
                        <input
                          type="text"
                          name="lastname"
                          className="form-control form-control-sm"
                          id="lastname"
                          placeholder={lastname}
                          onChange={e => {
                            setLastname(e.target.value);
                          }}
                          aria-describedby="lastnameInput"
                          aria-required="true"
                          aria-invalid="false"
                        />
                      </div>

                      <label htmlFor="email" className="col-sm-2 col-form-label col-form-label-sm">
                        Email:
                      </label>
                      <div className="col-sm-10 mb-1">
                        <input
                          type="email"
                          name="email"
                          className="form-control form-control-sm"
                          id="email"
                          placeholder={email}
                          onChange={e => {
                            setEmail(e.target.value);
                          }}
                          aria-describedby="emailInput"
                          aria-required="true"
                          aria-invalid="false"
                        />
                      </div>

                      <label htmlFor="role" className="col-sm-2 col-form-label col-form-label-sm">
                        Role:
                      </label>
                      <div className="col-sm-10 mb-1">
                        <input
                          type="text"
                          name="role"
                          className="form-control form-control-sm"
                          id="role"
                          placeholder={role}
                          onChange={e => {
                            setRole(e.target.value);
                          }}
                          aria-describedby="roleInput"
                          aria-required="true"
                          aria-invalid="false"
                        />
                      </div>

                      <label
                        htmlFor="staffId"
                        className="col-sm-2 col-form-label col-form-label-sm"
                      >
                        Staff Id:
                      </label>
                      <div className="col-sm-10 mb-1">
                        <input
                          type="text"
                          name="staff_id"
                          className="form-control form-control-sm"
                          id="staffId"
                          placeholder={staff_id}
                          onChange={e => {
                            setStaff_Id(e.target.value);
                          }}
                          aria-describedby="staffIdInput"
                          aria-required="true"
                          aria-invalid="false"
                        />
                        <span style={errors ? dangerStyle : null}>
                          <Error error={errors || null} />
                        </span>
                      </div>
                    </div>
                    <div className="row">
                      <EditBtn handleCancelClick={handleCancelClick} />
                    </div>
                  </fieldset>
                </form>
              </div>

              <div className="col-sm-6 mx-auto">
                <h5 className="text-secondary">Admins</h5>
                <div className="table-responsive">
                  <table className="table table-sm table-striped table-hover table-bordered text-secondary">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Company-id</th>
                        <th scope="col">Firstname</th>
                        <th scope="col">Lastname</th>
                        <th scope="col">Staff_id</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                      </tr>
                    </thead>
                    <tbody>{currentItems}</tbody>
                  </table>
                </div>
              </div>
            </div>
            <Pagination
              itemCountPerPage={itemCountPerPage}
              totalItems={companyAdminStaff.length}
              paginate={paginate}
            />
          </div>
        </>
      ) : (
        <UnAuthorized />
      )}
      <Footer />
    </div>
  );
};
AdminEdit.propTypes = {
  history: PropTypes.shape().isRequired
};
export default AdminEdit;
