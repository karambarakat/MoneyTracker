import React, { useEffect, useState } from "react";
import { getCategories } from "../../redux/Actions/categoriesAtions";
import ContainerCustom from "../ContainerCustom";
import InputLabel from "@material-ui/core/InputLabel";

import { HttpHandler } from "../Http/HttpHandler";

// Material UI
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { CatBoxStatic, CatBoxDynamic, CatBoxDynamicSmall } from "./CatBox";
// import CatBoxDynamic from "./CatBoxDynamic";
import LinkTo from "../LinkTo";
import CategoryIcon from "./CategoryIcon";
import IconButton from "@material-ui/core/IconButton";
import {
  CategoryList,
  CategoryListField,
  CategoryIconsField,
  CategoryColorsField,
} from "./Fields-Lists";
import TextField from "@material-ui/core/TextField";

const ShowCases = () => {
  const [list, setList] = useState("");
  const [icons, setIcons] = useState("");
  const [colors, setColors] = useState("");
  const [err, setErr] = useState(true);
  useEffect(() => {
    const toggle = () => setErr(!err);
    setInterval(() => {
      toggle();
    }, 1500);
  }, []);

  return (
    <ContainerCustom>
      <Typography variant="h2" align="center">
        ShowCases
      </Typography>
      <Divider style={{ marginBottom: "16px" }} />

      <CategoryList />

      <Divider style={{ marginBottom: "16px" }} />

      <TextField
        error={err}
        variant="outlined"
        label="category"
        helperText="hello"
      />

      <Divider style={{ marginBottom: "16px" }} />

      <CategoryListField
        error={err}
        helperText="hello eroror"
        value={list}
        onChange={(e) => setList(e.target.value)}
      />

      <CategoryColorsField
        error={err}
        helperText="hello eroror"
        value={colors}
        onChange={(e) => setColors(e.target.value)}
      />

      <CategoryIconsField
        error={err}
        value={icons}
        colorValue={colors}
        onChange={(e) => setIcons(e.target.value)}
      />
    </ContainerCustom>
  );
};

export default ShowCases;
