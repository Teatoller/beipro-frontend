import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "../../../axios";
import Nav from "../../Landing/Nav";
import Footer from "../../Landing/Footer";
import Spinner from "../../../spinner/Spinner";
import Pagination from "../../Pagination";

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
    axios.get(`/frontoffices`, {}).then(response => {
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

    // Delete selected front office record

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
    const { frontoffices, loading } = this.state;

    const frontOffice = frontoffices.map((item, index) => {
      return (
        <tr key={item.id}>
          <td className="foffices">{index + 1}</td>
          <td className="foffices">{item.company_id}</td>
          <td className="foffices">{item.name}</td>
          <td className="foffices">{item.code}</td>
          <td className="foffices">{item.location}</td>
          <td className="foffices">
            <button
              className="btn btn-sm btn-success"
              type="button"
              frontofficeId={item.id}
              onClick={this.handleEditClick}
            >
              Edit
            </button>
          </td>
          <td className="foffices">
            <button
              className="btn btn-sm btn-danger"
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

        <div className="container">
          <div className="row">
            <span>{loading ? <Spinner /> : null}</span>
            <div className="col-sm">
              <h6>Front Office details</h6>
              <table className="table table-striped">
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

          <span>Click button to add a new FrontOffice</span>

          <div>
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

        <Footer />
      </div>
    );
  }
}
FrontOffice.propTypes = {
  history: PropTypes.shape().isRequired
};
export default FrontOffice;
