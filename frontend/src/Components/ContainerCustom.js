import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import React from "react";

const ContainerCustom = ({ children }) => {
  return (
    <Container disableGutters maxWidth="sm">
      <Paper>
        <Box p={3} mt={3}>
          {children}
        </Box>
      </Paper>
    </Container>
  );
};

export default ContainerCustom;
