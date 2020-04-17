import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "../../../axios";
import Nav from "../../Landing/Nav";
import Footer from "../../Landing/Footer";
import Spinner from "../../../spinner/Spinner";
import Pagination from "../../Pagination";

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      admins: [],
      activePage: "1",
      itemCountPerPage: "10"
    };
  }

  componentDidMount() {
    this.getFeedbackData();
  }

  getFeedbackData = () => {
    axios.get(`/contact-us`, {}).then(response => {
      const adminData = response.data;
      console.log("feeds...!!!!", adminData);
      this.setState({
        admins: adminData,
        loading: false
      });
    });
  };

  handleEditClick = e => {
    const { history } = this.props;

    e.preventDefault();
    const attribute = e.currentTarget;
    const sadminid = attribute.getAttribute("sadminid");
    localStorage.setItem("sadminid", sadminid);

    history.push("/sadminedit");
  };

  handleCreateClick = e => {
    const { history } = this.props;

    e.preventDefault();

    history.push("/xcreate");
  };

  // Select front admin record to delete

  handleDeleteClick = e => {
    const { history } = this.props;
    e.preventDefault();
    const attribute = e.currentTarget;
    const sadminid = attribute.getAttribute("sadminid");
    localStorage.setItem("sadminid", sadminid);
    history.push("/xdelete");
  };

  render() {
    // eslint-disable-next-line camelcase
    const { admins, loading } = this.state;

    const companyAdminStaff = admins.map((item, index) => {
      return (
        <tr key={item.id}>
          <td className="feed">{index + 1}</td>
          <td className="feed">{item.name}</td>
          <td className="feed">{item.email}</td>
          <td className="feed">{item.phone_number}</td>
          <td className="feed">{item.subject}</td>
          <td className="feed">{item.message}</td>
          <td className="feed">{item.created_at}</td>
          <td className="feed">
            <button
              className="btn btn-sm btn-primary"
              type="button"
              sadminid={item.id}
              onClick={this.handleEditClick}
            >
              Edit
            </button>
          </td>
          <td className="admin">
            <button
              className="btn btn-sm btn-outline-danger"
              type="button"
              sadminid={item.id}
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
    const currentItems = companyAdminStaff.slice(indexOfFirstItem, indexOfLastItem);

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
              <h6>Feedback details</h6>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone No</th>
                    <th scope="col">Subject</th>
                    <th scope="col">Message</th>
                    <th scope="col">Date Created</th>
                    <th scope="col">Action</th>
                    <th scope="col">Remove</th>
                  </tr>
                </thead>
                <tbody>{currentItems}</tbody>
              </table>
            </div>
          </div>

          <span>Click button to add a new Feedback</span>

          <div className="btn-spacing">
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
            totalItems={companyAdminStaff.length}
            paginate={paginate}
          />
        </div>

        <Footer />
      </div>
    );
  }
}
Feedback.propTypes = {
  history: PropTypes.shape().isRequired
};
export default Feedback;
