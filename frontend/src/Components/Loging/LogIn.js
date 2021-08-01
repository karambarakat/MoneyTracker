import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
// materia ui
import Container from "@material-ui/core/Container";
import ContainerCustom from "../ContainerCustom";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import { login } from "../../redux/Actions/userActions";
import { Formik } from "formik";
import CircularProgress from "@material-ui/core/CircularProgress";
import http from "../../redux/Actions/http";

const LogIn = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <ContainerCustom>
      <Typography variant="h3" align="center">
        Log In
      </Typography>
      <Divider className={classes.mb_2} />
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validate={(vals) => {
          const errors = {};
          if (!vals.email) errors.email = "required";
          else if (!/^\S+@\S+\.\S+$/.test(vals.email)) {
            errors.email = "not valid email";
          }
          if (!vals.password) errors.password = "required";
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          const [done, error] = await http(login(values));
          console.log(done, error);
          if (error && error.sign === "http error")
            setErrors(error.body.errors);
          if (done) history.push("/");
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleReset,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            {errors.msg && (
              <Paper
                variant="outlined"
                className={classes.w50}
                style={{ overflow: "hidden" }}
              >
                <Box
                  style={{ padding: "0.5rem" }}
                  bgcolor=""
                  color="error.main"
                >
                  <Typography variant="body1">{errors.msg}</Typography>
                </Box>
              </Paper>
            )}
            <TextField
              error={touched.email && errors.email}
              helperText={touched.email && errors.email}
              className={classes.w50}
              value={values.email}
              onChange={handleChange}
              variant="outlined"
              id="email"
              name="email"
              label="email"
            />
            <TextField
              error={touched.password && errors.password}
              helperText={touched.password && errors.password}
              className={classes.w50}
              value={values.password}
              onChange={handleChange}
              variant="outlined"
              id="password"
              name="password"
              type="password"
              label="password"
            />

            <Button
              type="submit"
              size="large"
              className={classes.w50}
              startIcon={<AddCircleIcon fontSize="large" />}
              variant="contained"
              color="secondary"
            >
              <Typography variant="h6">
                {isSubmitting && (
                  <CircularProgress style={{ marginRight: "1rem" }} size={20} />
                )}
                Log In
              </Typography>
            </Button>
          </form>
        )}
      </Formik>

      <Typography variant="body1">
        To sign in <Link to="/signin">sign here</Link>
      </Typography>
    </ContainerCustom>
  );
};

const useStyles = makeStyles((theme) => ({
  mb_2: {
    marginBottom: theme.spacing(2),
  },
  w50: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
}));

export default LogIn;
