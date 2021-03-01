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

    history.push("/welcome");
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
      <div className="container">
        <Nav />
        <div className="row justify-content-center mx-auto mt-4">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">Subscription Form</div>
              <span>{loading ? <Spinner /> : null}</span>
              <div className="card-body">
                <form noValidate onSubmit={onSubmit}>
                  <fieldset>
                    <h6>Payment Detail&apos;s</h6>
                    <div className="form-group row">
                      <label htmlFor="amount" className="col-sm-2 col-form-label col-form-label-sm">
                        Amount: Ksh
                      </label>
                      <div className="col-sm-10 mb-1 hide">
                        <input
                          type="decimal"
                          name="amount"
                          className={`"form-control border-0 text-muted form-control-sm" ${
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

                      <label
                        htmlFor="phoneNumber"
                        className="col-sm-2 col-form-label col-form-label-sm"
                      >
                        Phone Number:
                      </label>
                      <div className="col-sm-10 mb-1">
                        <input
                          type="text"
                          name="phoneNumber"
                          className={`"form-control form-control-sm" ${
                            errors.code ? "is-invalid" : ""
                          }`}
                          id="code"
                          placeholder="Enter mobile phone number"
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
                    </div>

                    <div className="row">
                      <PayButton handleCancelClick={handleCancelClick} />
                    </div>
                  </fieldset>
                </form>
                <br />
                <div className="d-flex mt-3 justify-content-between">
                  <p className="text-center">
                    You will receive a popup message on your phone once you click on the{" "}
                    <b>Pay Now </b>
                    <i>button. Enter your Mpesa pin to complete transaction.</i>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
MpesaPay.propTypes = {
  history: PropTypes.shape().isRequired
};
export default MpesaPay;
