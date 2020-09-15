/* eslint-disable max-len */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "../../../../axios";

import ConstSAdmin from "../../ConstSAdmin";

import BearerToken from "../../../../services/BearerToken";
import { FeedbackDeleteView } from "./FeedbackDeleteView";

export const FeedbkDelete = props => {
  const [loading, setLoading] = useState(true);
  const [feeds, setFeeds] = useState([]);

  const getFeedbackData = () => {
    const sfeedid = localStorage.getItem("sfeedid");
    const config = BearerToken();

    axios.get(`/contact-us/${sfeedid}`, config).then(response => {
      const feedData = response.data;

      setFeeds(feedData);
      setLoading(false);
    });
  };

  useEffect(() => {
    getFeedbackData();
  }, []);

  // Select feedback record to delete

  const handleDeleteClick = e => {
    const { history } = props;
    e.preventDefault();
    const attribute = e.currentTarget;
    const sfeedid = attribute.getAttribute("sfeedid");
    localStorage.setItem("sfeedid", sfeedid);

    // Delete selected feedback record
    const config = BearerToken();

    axios.delete(`/contact-us/${sfeedid}`, config).then(response => {
      if (response) {
        history.push("/feedback");
      }
    });
  };

  const handleCancelClick = e => {
    const { history } = props;

    e.preventDefault();

    history.push("/feedback");
    setLoading(false);
  };

  const userRole = ConstSAdmin();

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
            onClick={handleDeleteClick}
          >
            Yes
          </button>
        </td>
      </tr>
    );
  });

  return (
    <>
      <FeedbackDeleteView
        userRole={userRole}
        loading={loading}
        feedbk={feedbk}
        handleCancelClick={handleCancelClick}
      />
    </>
  );
};
FeedbkDelete.propTypes = {
  history: PropTypes.shape().isRequired
};
export default FeedbkDelete;
