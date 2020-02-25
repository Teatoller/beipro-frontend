/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable camelcase */
import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "../../../axios";
import Nav from "../../Landing/Nav";
import Footer from "../../Landing/Footer";
import Error from "../../Error";
import Spinner from "../../../spinner/Spinner";
import Pagination from "../../Pagination";

class FrontOfficeCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      company_id: "",
      name: "",
      code: "",
      location: "",
      frontoffices: [],
      activePage: "1",
      itemCountPerPage: "10",
      errors: {
        company_id: "",
        name: "",
        code: "",
        location: ""
      }
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.getFrontOfficesData();
  }

  componentWillUnmount() {
    clearTimeout(this.adminData);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = e => {
    // eslint-disable-next-line camelcase
    const { company_id, name, code, location } = this.state;
    e.preventDefault();
    const data = {
      company_id,
      name,
      code,
      location
    };

    const { history } = this.props;

    axios
      .post(`/frontoffices`, data)
      .then(response => {
        if (response) {
          setTimeout(() => history.push(`/frontoffice`), 50);
        }
        this.setState({ loading: false });
      })
      .catch(err => {
        this.setState({
          errors: {
            company_id: err.response.request.response,
            name: err.response.request.response,
            code: err.response.request.response,
            location: err.response.request.response
          }
        });
        throw err;
      });
  };

  getFrontOfficesData = () => {
    axios.get(`/frontoffices`, {}).then(response => {
      const frontOfficesData = response.data;
      this.setState({
        frontoffices: frontOfficesData,
        loading: false
      });
    });
  };

  handleEditClick = e => {
    const { history } = this.props;

    e.preventDefault();
    const attribute = e.currentTarget;
    const frontofficeId = attribute.getAttribute("frontofficeId");
    localStorage.setItem("frontofficeId", frontofficeId);

    history.push("/frontofficeedit");
  };

  handleCreateClick = e => {
    const { history } = this.props;

    e.preventDefault();

    history.push("/frontofficecreate");
  };

  handleCancelClick = e => {
    const { history } = this.props;

    e.preventDefault();

    history.push("/frontoffice");
    this.setState({ loading: false });
  };

  // Select front admin record to delete

  handleDeleteClick = e => {
    const { history } = this.props;
    e.preventDefault();
    const attribute = e.currentTarget;
    const frontofficeId = attribute.getAttribute("frontofficeId");
    localStorage.setItem("frontofficeId", frontofficeId);

    // Delete selected front admin record

    axios.delete(`/frontoffices/${frontofficeId}`, {}).then(
      response => {
        if (response) {
          history.push("/frontoffice");
        }
      },
      error => {
        throw error;
      }
    );
  };

  render() {
    // eslint-disable-next-line camelcase
    const { frontoffices, loading, errors } = this.state;

    const frontOffice = frontoffices.map((item, index) => {
      return (
        <tr key={item.id}>
          <td className="foffices">{index + 1}</td>
          <td className="foffices">{item.company_id}</td>
          <td className="foffices">{item.name}</td>
          <td className="foffices">{item.code}</td>
          <td className="foffices">{item.location}</td>
        </tr>
      );
    });

    const { activePage, itemCountPerPage } = this.state;
    // Get current items
    const indexOfLastItem = activePage * itemCountPerPage;
    const indexOfFirstItem = indexOfLastItem - itemCountPerPage;
    const currentItems = frontOffice.slice(indexOfFirstItem, indexOfLastItem);

    // Change page

    const paginate = pageNumber => {
      this.setState({
        activePage: pageNumber
      });
    };

    const dangerStyle = {
      fontStyle: "italic",
      color: "red"
    };

    return (
      <div>
        <Nav />

        <div className="container" aria-label="Create company front admin form">
          <div className="row">
            <span>{loading ? <Spinner /> : null}</span>
            <div className="col-sm">
              <h6>Entry Pad</h6>
              <form noValidate onSubmit={this.onSubmit}>
                <fieldset className="front-fieldset">
                  <h6>Front Office Detail&apos;s</h6>
                  <div className="form-group row">
                    <label
                      htmlFor="companyId"
                      className="col-sm-2 col-form-label col-form-label-sm"
                    >
                      Company Id:
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="decimal"
                        name="company_id"
                        className="form-control form-control-sm"
                        id="companyId"
                        placeholder="Enter Company Id"
                        onChange={this.onChange}
                        aria-describedby="companyIdInput"
                        aria-required="true"
                        aria-invalid="false"
                      />
                    </div>

                    <label htmlFor="name" className="col-sm-2 col-form-label col-form-label-sm">
                      Name:
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        name="name"
                        className="form-control form-control-sm"
                        id="name"
                        placeholder="Enter Front Office name"
                        onChange={this.onChange}
                        aria-describedby="frontOfficeNameInput"
                        aria-required="true"
                        aria-invalid="false"
                      />
                    </div>

                    <label htmlFor="code" className="col-sm-2 col-form-label col-form-label-sm">
                      Code:
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        name="code"
                        className="form-control form-control-sm"
                        id="code"
                        placeholder="Enter front Office code"
                        onChange={this.onChange}
                        aria-describedby="frontOfficeCodeInput"
                        aria-required="true"
                        aria-invalid="false"
                      />
                    </div>

                    <label htmlFor="location" className="col-sm-2 col-form-label col-form-label-sm">
                      Location:
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        name="location"
                        className="form-control form-control-sm"
                        id="location"
                        placeholder="Enter Company"
                        Location
                        onChange={this.onChange}
                        aria-describedby="locationInput"
                        aria-required="true"
                        aria-invalid="false"
                      />
                      <span style={errors.location ? dangerStyle : null}>
                        <Error error={errors.location ? errors.location : null} />
                      </span>
                    </div>
                  </div>
                  <div>
                    <input className="btn btn-sm btn-success" type="submit" value="Create" />
                  </div>
                </fieldset>
              </form>
              <div>
                <button
                  type="button"
                  className="btn btn-sm btn-primary"
                  onClick={this.handleCancelClick}
                >
                  Cancel
                </button>
              </div>
            </div>

            <div className="col-sm">
              <h6>Front Offices</h6>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Company Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Code</th>
                    <th scope="col">Location</th>
                  </tr>
                </thead>
                <tbody>{currentItems}</tbody>
              </table>
            </div>
          </div>
          <Pagination
            itemCountPerPage={itemCountPerPage}
            totalItems={frontOffice.length}
            paginate={paginate}
          />
        </div>
        <Footer />
      </div>
    );
  }
}
FrontOfficeCreate.propTypes = {
  history: PropTypes.shape().isRequired
};
export default FrontOfficeCreate;
