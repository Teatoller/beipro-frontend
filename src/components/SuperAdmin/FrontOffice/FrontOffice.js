/* eslint-disable max-len */
import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "../../../axios";
import Nav from "../../Landing/Nav";
import Footer from "../../Landing/Footer";
import Spinner from "../../../spinner/Spinner";
import Pagination from "../../Pagination";
import ConstSAdmin from "../ConstSAdmin";
import UnAuthorized from "../../auth/common/UnAuthorized";
import BearerToken from "../../../services/BearerToken";

class FrontOffice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      frontoffices: [],
      activePage: "1",
      itemCountPerPage: "10"
    };
  }

  componentDidMount() {
    this.getFrontOfficesData();
  }

  getFrontOfficesData = () => {
    const config = BearerToken();

    axios.get(`/frontoffices`, config).then(response => {
      const frontofficeData = response.data;
      this.setState({
        frontoffices: frontofficeData,
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

  // Select front office record to delete

  handleDeleteClick = e => {
    const { history } = this.props;
    e.preventDefault();
    const attribute = e.currentTarget;
    const frontofficeId = attribute.getAttribute("frontofficeId");
    localStorage.setItem("frontofficeId", frontofficeId);

    history.push("/frontofficedelete");
  };

  render() {
    const { frontoffices, loading } = this.state;
    const newLocal = ConstSAdmin();

    const frontOffice = frontoffices.map((item, index) => {
      return (
        <tr key={item.id}>
          <td className="foffices text-center">{index + 1}</td>
          <td className="foffices text-center">{item.company_id}</td>
          <td className="foffices text-center">{item.name}</td>
          <td className="foffices text-center">{item.code}</td>
          <td className="foffices text-center">{item.location}</td>
          <td className="foffices text-center">
            <button
              className="btn btn-sm btn-primary"
              type="button"
              frontofficeId={item.id}
              onClick={this.handleEditClick}
            >
              Edit
            </button>
          </td>
          <td className="foffices text-center">
            <button
              className="btn btn-sm btn-outline-danger"
              type="button"
              frontofficeId={item.id}
              onClick={this.handleDeleteClick}
            >
              Delete
            </button>
          </td>
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

    return (
      <div>
        <Nav />
        {newLocal ? (
          <>
            <div className="container">
              <div className="row">
                <span>{loading ? <Spinner /> : null}</span>
                <div className="col-sm">
                  <h5 className="text-secondary">Front Office details</h5>
                  <div className="table-responsive">
                    <table className="table table-sm table-striped table-hover table-bordered text-secondary">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Company Id</th>
                          <th scope="col">Name</th>
                          <th scope="col">Code</th>
                          <th scope="col">Location</th>
                          <th scope="col">Action</th>
                          <th scope="col">Remove</th>
                        </tr>
                      </thead>
                      <tbody>{currentItems}</tbody>
                    </table>
                  </div>
                </div>
              </div>

              <span className="font-italic form-text text-muted">
                Click button to add a new FrontOffice
              </span>
              <div className="m-1">
                <button
                  className="btn btn-sm btn-success"
                  type="submit"
                  onClick={this.handleCreateClick}
                >
                  Add
                </button>
              </div>
              <Pagination
                itemCountPerPage={itemCountPerPage}
                totalItems={frontOffice.length}
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
  }
}
FrontOffice.propTypes = {
  history: PropTypes.shape().isRequired
};
export default FrontOffice;
