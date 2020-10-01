import React from "react";
import Error from "../../Error";

export function messageError(message) {
  return (
    <span className="text-info">
      <Error error={message || null} />
    </span>
  );
}
