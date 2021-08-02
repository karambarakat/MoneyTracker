import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
// import Skeleton from "@material-ui/lab/Skeleton";
import ContainerCustom from "../ContainerCustom";
import E204 from "./svgs/E204";
import E401 from "./svgs/E401";
import E404 from "./svgs/E404";
import E4xx5xx from "./svgs/E4xx5xx";

// @props:
//code: number, http res.status
//variant (errorVariant): query string
//error thrown from the action
const Error = ({ code, variant = "default", error, otherProp }) => {
  const isPaper = !variant.includes("noPaper");
  const Container = ({ children }) =>
    isPaper ? <ContainerCustom>{children}</ContainerCustom> : <>{children}</>;

  const style = {
    width: "400",
    hieght: "275",
    margin: "2rem auto",
    display: "block",
  };

  const Svg =
    code === 204 ? (
      <E204 style={style} />
    ) : code === 401 ? (
      <E401 style={style} />
    ) : code === 404 ? (
      <E404 style={style} />
    ) : (
      <E4xx5xx style={style} />
    );

  console.log(otherProp);
  return (
    <Container>
      {variant === "default" && Svg}
      <Typography
        style={
          variant === "onlyText"
            ? { marginTop: "1rem", marginBottom: "1rem" }
            : {}
        }
        variant="h5"
        align="center"
      >
        {code} | {error.body?.msg || error.body}
      </Typography>
    </Container>
  );
};

export default Error;
