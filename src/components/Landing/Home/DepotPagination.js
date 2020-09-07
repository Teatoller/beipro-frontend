import React from "react";
import PropTypes from "prop-types";
import Pagination from "../../Pagination";

export const DepotPagination = props => {
  const { itemCountPerPage, selectedLocationItems, setActivePage } = props;

  const paginate = pageNumber => {
    setActivePage(pageNumber);
  };
  return (
    <>
      <div className="mb-3">
        {" "}
        <Pagination
          itemCountPerPage={itemCountPerPage}
          totalItems={selectedLocationItems.length}
          paginate={paginate}
        />
      </div>
    </>
  );
};
DepotPagination.propTypes = {
  length: PropTypes.func.isRequired,
  itemCountPerPage: PropTypes.number.isRequired,
  setActivePage: PropTypes.number.isRequired,
  selectedLocationItems: PropTypes.string.isRequired
};
export default DepotPagination;
