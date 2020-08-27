import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "../../../axios";
import Nav from "../../Landing/Nav";
import Footer from "../../Landing/Footer";
import Spinner from "../../../spinner/Spinner";
import ConstSAdmin from "../ConstSAdmin";
import UnAuthorized from "../../auth/common/UnAuthorized";

class FeedbkDelete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      feeds: []
    };
  }

  componentDidMount() {
    this.getFeedbackData();
  }

  getFeedbackData = () => {
    const sfeedid = localStorage.getItem("sfeedid");
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    };
    axios.get(`/contact-us/${sfeedid}`, config).then(response => {
      const feedData = response.data;
      this.setState({
        feeds: feedData,
        loading: false
      });
    });
  };

  // Select feedback record to delete

  handleDeleteClick = e => {
    const { history } = this.props;
    e.preventDefault();
    const attribute = e.currentTarget;
    const sfeedid = attribute.getAttribute("sfeedid");
    localStorage.setItem("sfeedid", sfeedid);

    // Delete selected feedback record
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    };

    axios.delete(`/contact-us/${sfeedid}`, config).then(
      response => {
        if (response) {
          history.push("/feedback");
        }
      },
      error => {
        throw error;
      }
    );
  };

  handleCancelClick = e => {
    const { history } = this.props;

    e.preventDefault();

    history.push("/feedback");
    this.setState({ loading: false });
  };

  render() {
    // eslint-disable-next-line camelcase
    const { feeds, loading } = this.state;
    const newLocal = ConstSAdmin();

    const feedbk = feeds.map((item, index) => {
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
              Yes
            </button>
          </td>
        </tr>
      );
    });

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
                  <div className="alert alert-danger" role="alert">
                    <strong>Warning! </strong>Are you sure that you want to delete this record?
                  </div>
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
                          <th scope="col">Delete</th>
                        </tr>
                      </thead>
                      <tbody>{feedbk}</tbody>
                    </table>
                  </div>
                </div>
              </div>

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
          </>
        ) : (
          <UnAuthorized />
        )}
        <Footer />
      </div>
    );
  }
}
FeedbkDelete.propTypes = {
  history: PropTypes.shape().isRequired
};
export default FeedbkDelete;
