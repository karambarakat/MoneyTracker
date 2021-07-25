import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Skeleton from "@material-ui/lab/Skeleton";
import ContainerCustom from "../ContainerCustom";
import CircularProgress from "@material-ui/core/CircularProgress";

//variant (loadingVariant): query string
const Loading = ({ variant = "default" }) => {
  // //**OVER-ENGINEERED**//
  //convert query string to object of {base: String, query: <key-value obj>}
  // const queryVariant = {
  //   base: variant.split("?")[0],
  //   query: variant
  //     .split("?")[1]
  //     ?.split("&")
  //     .map((e) => e.split("="))
  //     .map((e) => [e[0], e[1] || true])
  //     .reduce((acc, e) => {
  //       acc[e[0]] = e[1];
  //       return acc;
  //     }, {}),
  // };

  const isPaper = !variant.includes("noPaper");
  const Container = ({ children }) =>
    isPaper ? <ContainerCustom>{children}</ContainerCustom> : <>{children}</>;

  const theme = variant.split("?")[0];
  // const content =
  //   theme === "spinner" ? (
  //     <CircularProgress />
  //   ) : theme === "home" ? (
  //     <Skeleton variant="rect" width={210} height={118} />
  //   ) : theme === "default" ? (
  //     <Skeleton variant="rect" width={210} height={118} />
  //   ) : (
  //     <h2>default</h2>
  //   );

  return (
    <Container>
      <CircularProgress style={{ display: "block", margin: "1rem auto" }} />
    </Container>
  );
};

export default Loading;
