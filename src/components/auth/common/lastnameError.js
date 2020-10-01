import React from "react";
import Error from "../../Error";

export function lastnameError(errors) {
  return (
    <span className="text-danger">
      <Error error={errors.lastname ? errors.lastname : null} />
    </span>
  );
}
