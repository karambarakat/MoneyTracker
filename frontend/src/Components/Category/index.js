import React from "react";
import ContainerCustom from "../ContainerCustom";

// Material UI
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { CategoryList } from "./Fields-Lists";
import ShowCases from "./_Showcase";

const Categories = () => {
  return (
    <>
      {/* <ShowCases /> */}
      <ContainerCustom>
        <Typography variant="h2" align="center">
          Categories
        </Typography>
        <Divider style={{ marginBottom: "16px" }} />

        <CategoryList />
      </ContainerCustom>
    </>
  );
};

export default Categories;
