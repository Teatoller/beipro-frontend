/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import axios from "../../axios";
import BearerToken from "../../services/BearerToken";
import { PayButton } from "./PayButton";
import { amountError } from "./amountError";
import { phoneNumberError } from "./phoneNumberError";
import { Nav } from "../Landing/Nav";
import { Spinner } from "../../spinner/Spinner";
import { messageError } from "../auth/common/messageError";
import Footer from "../Landing/Footer";
import Mpesa from "../auth/common/Mpesa";

export const MpesaPay = props => {
  const [loading, setLoading] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [errors, setErrors] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = e => {
    e.preventDefault();
    const data = {
      phoneNumber,
      amount
    };

    const { history } = props;
    const config = BearerToken();

    axios
      .post(`/mpesa/stk/push`, data, config)
      .then(response => {
        if (response) {
          toast.success("Check Mpesa pop up on your handset to complete the subscription.");
          setTimeout(() => history.push(`/welcome`), 50);
        }
        setLoading(false);
      })
      .catch(err => {
        setErrors(err.response.data.errors || err.response.data.message);
        setMessage(err.response.data.message);
        setLoading(false);
      });
  };

  const handleCancelClick = e => {
    const { history } = props;

    e.preventDefault();

    history.push("/home");
    setLoading(false);
  };

  const getAmount = () => {
    const subAmount = localStorage.getItem("payamount");
    const lockey = parseInt(subAmount, 10);

    setAmount(lockey);
    setLoading(false);
  };

  useEffect(() => {
    getAmount();
  }, []);

  return (
    <>
      <Nav />
      <div className="container mt-5 w-75">
        <span>{loading ? <Spinner /> : null}</span>
        <form noValidate onSubmit={onSubmit}>
          <div className="row text-muted text-center mt-1 p-2 border">
            {" "}
            <h4 className="font-italic text-center mt-1">Subscription Form</h4>
          </div>

          <div className="row bg-subscribe text-muted text-center mt-1 p-2 border">
            <Mpesa />
          </div>
          <div className="form-group row text-muted mt-1 p-2 border bg-subscribe">
            <label
              htmlFor="phoneNumber"
              className="col-sm-4 col-form-label col-form-label-sm font-weight-bold"
            >
              Phone Number
            </label>
            <div className="col-sm-8 mb-1">
              <input
                type="text"
                name="phoneNumber"
                className={`"form-control bg-white w-75 border-0 form-control-sm" ${
                  errors.code ? "is-invalid" : ""
                }`}
                id="code"
                placeholder="Enter phone number"
                onChange={e => {
                  setPhoneNumber(e.target.value);
                }}
                aria-describedby="phoneNumber"
                aria-required="true"
                aria-invalid="false"
              />
              {phoneNumberError(errors)}
              {messageError(message)}
            </div>
            <label
              htmlFor="amount"
              className="col-sm-4 col-form-label col-form-label-sm font-weight-bold"
            >
              Subscribed amount: Ksh
            </label>
            <div className="col-sm-8 mb-1 hide">
              <input
                type="decimal"
                name="amount"
                className={`"form-control w-25 bg-info text-white font-weight-bold text-center border-0 form-control-sm" ${
                  errors.amount ? "is-invalid" : ""
                }`}
                id="companyId"
                placeholder="Disabled input"
                value={amount}
                aria-describedby="companyIdInput"
                aria-required="true"
                aria-invalid="false"
              />
              {amountError(errors)}
            </div>
          </div>
          <div className="row bg-subscribe text-muted text-center mt-1 p-2 border">
            <PayButton handleCancelClick={handleCancelClick} />
          </div>
          <div className="row text-muted text-center mt-1 p-2 border">
            <p className="text-center font-italic text-muted mt-1">
              You will receive an Mpesa popup message on your phone. Enter your Mpesa pin to
              complete the transaction.
            </p>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};
MpesaPay.propTypes = {
  history: PropTypes.shape().isRequired
};
export default MpesaPay;
