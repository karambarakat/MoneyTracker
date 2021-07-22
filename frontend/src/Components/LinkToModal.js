import React from "react";
import { Link, useLocation, useRouteMatch } from "react-router-dom";

const LinkToModal = ({ toModal, children }) => {
  const { url } = useRouteMatch();
  const location = useLocation();

  return (
    <Link
      style={{ textDecoration: "initial", color: "initial" }}
      to={
        toModal && {
          pathname: `${url}${toModal.to}`,
          state: { background: location, paht: `/${toModal.path}` },
        }
      }
    >
      {children}
    </Link>
  );
};

export default LinkToModal;
