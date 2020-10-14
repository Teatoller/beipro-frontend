import React from "react";
import Chevron from "../../statics/Chevron";

export const DepotUpArrow = () => {
  return (
    <>
      <span className="p-2 ml-5 mb-2">
        <a href="#top">
          <small className="form-text text-muted">
            <Chevron />
            Top
          </small>
        </a>
      </span>
    </>
  );
};
export default DepotUpArrow;
