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
import { signIn } from "../../redux/Actions/userActions";
import { Formik } from "formik";
import CircularProgress from "@material-ui/core/CircularProgress";
import http from "../../redux/Actions/http";

// bug solved temprorly : see note 001 in this file
//!bug: when not modifing certain field (if they are not required) (ex: userName in SignIn component) the form will send empty string, instead it should not send anything
//!bug: check all form pls
const SignIn = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <ContainerCustom>
      <Typography variant="h3" align="center">
        Sign In
      </Typography>
      <Divider className={classes.mb_2} />
      <Formik
        initialValues={{
          userName: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validate={(vals) => {
          const errors = {};
          if (!vals.email) errors.email = "required";
          else if (!/^\S+@\S+\.\S+$/.test(vals.email)) {
            errors.email = "not valid email";
          }
          if (!vals.password) errors.password = "required";
          else if (vals.password !== vals.confirmPassword)
            errors.confirmPassword = "passwords don't match";

          return errors;
        }}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          //note 001: solved temprorly: now if userName is falsy i don't assign a userName property to the body of the request (send)
          const send = {};
          values.userName && (send.userName = values.userName);
          values.email && (send.email = values.email);
          values.password && (send.password = values.password);
          const [done, error] = await http(signIn(send));
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
              error={touched.userName && errors.userName}
              helperText={touched.userName && errors.userName}
              className={classes.w50}
              value={values.userName}
              onChange={handleChange}
              variant="outlined"
              id="userName"
              name="userName"
              label="user name"
            />
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
            <TextField
              error={touched.confirmPassword && errors.confirmPassword}
              helperText={touched.confirmPassword && errors.confirmPassword}
              className={classes.w50}
              value={values.confirmPassword}
              onChange={handleChange}
              variant="outlined"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="confirm password"
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
                Sign In
              </Typography>
            </Button>
          </form>
        )}
      </Formik>

      <Typography variant="body1">
        To log in <Link to="/login">click here</Link>
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

export default SignIn;
