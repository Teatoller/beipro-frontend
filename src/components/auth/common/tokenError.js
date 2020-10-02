import React from "react";
import Error from "../../Error";

export function tokenError(errors) {
  return (
    <span className="text-danger">
      <Error error={errors.token ? errors.token : null} />
    </span>
  );
}
