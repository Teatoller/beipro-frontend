/* eslint-disable max-len */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "../../../axios";
import ConstSAdmin from "../ConstSAdmin";
import BearerToken from "../../../services/BearerToken";
import { FeedbackView } from "./FeedbackView";

export const Feedback = props => {
  const [loading, setLoading] = useState(true);
  const [feeds, setFeeds] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [itemCountPerPage] = useState(5);

  const getFeedbackData = () => {
    const config = BearerToken();

    axios.get("/contact-us", config).then(response => {
      const feedData = response.data;

      setFeeds(feedData);
      setLoading(false);
    });
  };

  useEffect(() => {
    getFeedbackData();
  }, []);

  // Select front feed record to delete

  const handleDeleteClick = e => {
    const { history } = props;
    e.preventDefault();
    const attribute = e.currentTarget;
    const sfeedid = attribute.getAttribute("sfeedid");
    localStorage.setItem("sfeedid", sfeedid);
    history.push("/feedbkdelete");
  };

  // eslint-disable-next-line camelcase
  const userRole = ConstSAdmin();

  const userFeedback = feeds.map((item, index) => {
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
            Delete
          </button>
        </td>
      </tr>
    );
  });

  // Get current items
  const indexOfLastItem = activePage * itemCountPerPage;
  const indexOfFirstItem = indexOfLastItem - itemCountPerPage;
  const currentItems = userFeedback.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <FeedbackView
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
Feedback.propTypes = {
  history: PropTypes.shape().isRequired
};
export default Feedback;
