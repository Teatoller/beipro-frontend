import React from "react";
import Error from "../Error";

export function amountError(errors) {
  return (
    <span className="text-danger">
      <Error error={errors.amount ? errors.amount : null} />
    </span>
  );
}
