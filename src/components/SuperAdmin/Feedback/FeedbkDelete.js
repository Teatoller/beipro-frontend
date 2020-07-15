import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "../../../axios";
import Nav from "../../Landing/Nav";
import Footer from "../../Landing/Footer";
import Spinner from "../../../spinner/Spinner";

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
    axios.get(`/auth/contact-us/${sfeedid}`, config).then(response => {
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

    axios.delete(`/auth/contact-us/${sfeedid}`, config).then(
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

    const feedbk = feeds.map((item, index) => {
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

    const dangerStyle = {
      fontStyle: "italic",
      fontWeight: "bold",
      color: "red"
    };

    return (
      <div>
        <Nav />

        <div className="container">
          <div className="row">
            <span>{loading ? <Spinner /> : null}</span>
            <div className="col-sm">
              <h6>Feedback details</h6>
              <span style={dangerStyle}>Are you sure that you want to Delete this record?</span>
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
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>{feedbk}</tbody>
              </table>
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

        <Footer />
      </div>
    );
  }
}
FeedbkDelete.propTypes = {
  history: PropTypes.shape().isRequired
};
export default FeedbkDelete;
