import React from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import * as colors from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    colors,
  },
  typography: {
    subtitle2: {
      color: "grey",
      fontWeight: 400,
      fontSize: "0.8rem",
      lineHeight: 1.5,
      letterSpacing: "0.00938em",
      paddingLeft: "2px",
      paddingRight: "2px",
    },
  },
});

const MuiTheme = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default MuiTheme;
