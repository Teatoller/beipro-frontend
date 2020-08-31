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

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      feeds: [],
      activePage: "1",
      itemCountPerPage: "5"
    };
  }

  componentDidMount() {
    this.getFeedbackData();
  }

  getFeedbackData = () => {
    const config = BearerToken();
    
    axios.get(`/contact-us`, config).then(response => {
      const feedData = response.data;
      this.setState({
        feeds: feedData,
        loading: false
      });
    });
  };

  // Select front feed record to delete

  handleDeleteClick = e => {
    const { history } = this.props;
    e.preventDefault();
    const attribute = e.currentTarget;
    const sfeedid = attribute.getAttribute("sfeedid");
    localStorage.setItem("sfeedid", sfeedid);
    history.push("/feedbkdelete");
  };

  render() {
    // eslint-disable-next-line camelcase
    const { feeds, loading } = this.state;
    const newLocal = ConstSAdmin();

    const companyAdminStaff = feeds.map((item, index) => {
      return (
        <tr key={item.id}>
          <td className="feed text-center">{index + 1}</td>
          <td className="feed text-center">{item.name}</td>
          <td className="feed text-center">{item.email}</td>
          <td className="feed text-center">{item.phone_number}</td>
          <td className="feed text-center">{item.subject}</td>
          <td className="feed text-center">{item.message}</td>
          <td className="feed text-center">{item.created_at}</td>
          <td className="feed text-center">
            <button
              className="btn btn-sm btn-outline-danger"
              type="button"
              sfeedid={item.id}
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
        {newLocal ? (
          <>
            <div className="container">
              <div className="row">
                <span>{loading ? <Spinner /> : null}</span>
                <div className="col-sm">
                  <h5 className="text-secondary">Feedback details</h5>
                  <div className="table-responsive">
                  <table className="table table-sm table-striped table-hover table-bordered text-secondary">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone No</th>
                        <th scope="col">Subject</th>
                        <th scope="col">Message</th>
                        <th scope="col">Date Created</th>
                        <th scope="col">Remove</th>
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
  }
}
Feedback.propTypes = {
  history: PropTypes.shape().isRequired
};
export default Feedback;
