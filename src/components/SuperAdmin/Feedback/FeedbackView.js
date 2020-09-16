/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";
import { Nav } from "../../Landing/Nav";
import { FeedbackDisplay } from "./FeedbackDisplay";

export const FeedbackView = props => {
  const { setActivePage, userRole, loading, currentItems, itemCountPerPage, userFeedback } = props;

  return (
    <>
      <Nav />
      <FeedbackDisplay
        setActivePage={setActivePage}
        userRole={userRole}
        loading={loading}
        currentItems={currentItems}
        itemCountPerPage={itemCountPerPage}
        userFeedback={userFeedback}
      />
    </>
  );
};
FeedbackView.propTypes = {
  loading: PropTypes.bool.isRequired,
  userRole: PropTypes.bool.isRequired,
  userFeedback: PropTypes.string.isRequired,
  currentItems: PropTypes.arrayOf(PropTypes.number).isRequired,
  itemCountPerPage: PropTypes.string.isRequired,
  setActivePage: PropTypes.func.isRequired
};
export default FeedbackView;
