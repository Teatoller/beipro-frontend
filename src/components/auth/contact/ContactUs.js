/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import axios from "../../../axios";
import { Nav } from "../../Landing/Nav";
import Footer from "../../Landing/Footer";
import "../../css/site.css";
import Error from "../../Error";
import { Spinner } from "../../../spinner/Spinner";
import SiteImage from "../common/SiteImage";

class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      loading: false,
      errors: {
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      }
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({
      email: localStorage.getItem("email"),
      name: `${localStorage.getItem("fname")} ${localStorage.getItem("lname")}`
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { history } = this.props;

    const { name, email, phone_number, subject, message } = this.state;

    const data = {
      name,
      email,
      phone_number,
      subject,
      message
    };

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    };

    axios
      .post(`/contact-us`, data, config)
      .then(response => {
        this.setState({
          loading: true
        });
        if (response) {
          toast.success("Submitted Successfully");
          history.push(`/depots`);
        }
      })
      .catch(err => {
        this.setState({
          errors: {
            name: err.response.request.response,
            email: err.response.request.response,
            phone: err.response.request.response,
            subject: err.response.request.response,
            message: err.response.request.response
          }
        });
      });
  }

  render() {
    const { name, email, errors, loading } = this.state;

    return (
      <div>
        <Nav />
        <div className="container">
          <span>{loading ? <Spinner /> : null}</span>
          <h3 className="display-4 text-muted">Beipro Contact Form</h3>
          <div className="row">
            <div className="col-sm-9">
              <form onSubmit={this.handleSubmit}>
                <div className="row form-group">
                  <div className="col">
                    <label className="form-label" htmlFor="name">
                      Name:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      placeholder={name}
                      value={name}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="col">
                    <label className="form-label" htmlFor="email">
                      Email address:
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      aria-describedby="email"
                      name="email"
                      onChange={this.onChange}
                      placeholder={email}
                      value={email}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="phone">
                    Phone number:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    name="phone_number"
                    placeholder="Enter phone number"
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="subject">
                    Subject:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="subject"
                    name="subject"
                    placeholder="Enter subject"
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message:</label>
                  <textarea
                    className="form-control"
                    rows="5"
                    id="message"
                    name="message"
                    placeholder="Enter message"
                    onChange={this.onChange}
                  />
                  <span className={`text-danger ${errors ? "is-invalid" : ""}`}>
                    <Error error={errors || null} />
                  </span>
                </div>
                <div className="">
                  <input type="submit" className="btn btn-primary" value="Send" />
                </div>
              </form>
            </div>
            <div className="col-sm-3">
              <SiteImage />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
ContactUs.propTypes = {
  history: PropTypes.shape().isRequired
};
export default ContactUs;
