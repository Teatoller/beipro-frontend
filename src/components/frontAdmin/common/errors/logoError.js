import React from "react";
import Error from "../../../Error";

export function logoError(errors) {
  return (
    <span className="text-danger">
      <Error error={errors.logo ? errors.logo : null} />
    </span>
  );
}
