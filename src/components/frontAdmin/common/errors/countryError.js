import React from "react";
import Error from "../../../Error";

export function countryError(errors) {
  return (
    <span className="text-danger">
      <Error error={errors.country ? errors.country : null} />
    </span>
  );
}
