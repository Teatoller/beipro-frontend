/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";
import { Nav } from "../../../Landing/Nav";
import { FeedbackDeleteDisplay } from "./FeedbackDeleteDisplay";

export const FeedbackDeleteView = props => {
  const { userRole, loading, feedbk, handleCancelClick } = props;
  return (
    <>
      <Nav />
      <FeedbackDeleteDisplay
        userRole={userRole}
        loading={loading}
        feedbk={feedbk}
        handleCancelClick={handleCancelClick}
      />
    </>
  );
};
FeedbackDeleteView.propTypes = {
  loading: PropTypes.bool.isRequired,
  userRole: PropTypes.bool.isRequired,
  feedbk: PropTypes.string.isRequired,
  handleCancelClick: PropTypes.func.isRequired
};
export default FeedbackDeleteView;
