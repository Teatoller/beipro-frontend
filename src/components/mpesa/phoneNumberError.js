import React from "react";
import Error from "../Error";

export function phoneNumberError(errors) {
  return (
    <span className="text-danger">
      <Error error={errors.phoneNumber ? errors.phoneNumber : null} />
    </span>
  );
}
