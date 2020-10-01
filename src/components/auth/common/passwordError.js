import React from "react";
import Error from "../../Error";

export function passwordError(errors) {
  return (
    <span className="text-danger">
      <Error error={errors.password ? errors.password : null} />
    </span>
  );
}
