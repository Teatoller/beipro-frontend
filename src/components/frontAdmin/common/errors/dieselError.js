import React from "react";
import Error from "../../../Error";

export function dieselError(errors) {
  return (
    <span className="text-danger">
      <Error error={errors.diesel ? errors.diesel : null} />
    </span>
  );
}
