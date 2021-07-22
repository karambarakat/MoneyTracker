import React from "react";
import { Link, useLocation, useRouteMatch } from "react-router-dom";

const LinkTo = ({ toModal, children, ...props }) => {
  const { url } = useRouteMatch();
  const location = useLocation();

  return (
    <Link style={{ textDecoration: "initial", color: "initial" }} {...props}>
      {children}
    </Link>
  );
};

export default LinkTo;
