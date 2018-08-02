import React from "react";

export const UserLabel = ({ username }) => (
  <div
    className="font-weight-light"
    style={{
      fontSize: 14,
      cursor: "pointer"
    }}
  >
    <i className="fas fa-user" /> {" " + username}
  </div>
);
