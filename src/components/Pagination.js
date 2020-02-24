import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Pagination = ({ itemCountPerPage, totalItems, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemCountPerPage); i += 1) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map(number => (
          <li key={number} className="page-item">
            <Link onClick={() => paginate(number)} href="!#" className="page-link">
              {number}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
Pagination.propTypes = {
  itemCountPerPage: PropTypes.string.isRequired,
  totalItems: PropTypes.string.isRequired,
  paginate: PropTypes.func.isRequired
};

export default Pagination;
