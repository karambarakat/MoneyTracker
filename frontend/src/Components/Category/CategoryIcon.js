import React from "react";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Icon_cat from "@material-ui/icons/Category";
import * as icons from "../../redux/MetaIcons";

const CategoryIcon = ({
  color = "defalaut",
  iconName,
  size = 24,
  on,
  ...props
}) => {
  if (color === "") color = "defalaut";
  const Model = icons[iconName];
  const icon = Model ? (
    <Model style={{ fontSize: size }} />
  ) : (
    <Icon_cat style={{ fontSize: size }} />
  );

  return (
    <IconButton
      style={{ width: size * 2, height: size * 2 }}
      className={`C${color} ${on ? "on" : ""}`}
      {...props}
    >
      {icon}
    </IconButton>
  );
};

export default CategoryIcon;
