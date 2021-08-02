import React, { useState, useEffect } from "react";
import { useParams, useHistory, useRouteMatch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import http from "../../redux/Actions/http";
import CategoryIcon from "../Category/CategoryIcon";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import ExitToApp from "@material-ui/icons/ExitToApp";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import { Formik, Form, ErrorMessage, Field } from "formik";
import {
  updateProfile,
  getProfile,
  logOut,
} from "../../redux/Actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { HttpHandler } from "../Http/HttpHandler";
import ContainerCustom from "../ContainerCustom";
import CircularProgress from "@material-ui/core/CircularProgress";
import { CategoryListField } from "../Category/Fields-Lists";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

//!bug: when not modifing certain field (if they are not required) (ex: userName in SignIn component) the form will send empty string, instead it should not send anything
//!bug: check all form pls
const Profile = () => {
  const classes = useStyles();
  let { id } = useParams();
  const user = useSelector((state) => state.user);
  const [isUpdate, setIsUpdate] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const categories = useSelector((state) => state.categories);

  return (
    <HttpHandler action={getProfile()} selector={(state) => state.user}>
      {(user) => (
        <ContainerCustom>
          <Formik
            initialValues={{
              userName: user.userName,
              email: user.email,
              password: "",
              confirmPassword: "",
            }}
            validate={(vals) => {
              const errors = {};
              if (vals.email && !/^\S+@\S+\.\S+$/.test(vals.email)) {
                errors.email = "not valid email";
              }
              if (vals.password !== vals.confirmPassword)
                errors.confirmPassword = "passwords don't match";

              return errors;
            }}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              const [done, error] = await http(updateProfile(values));
              if (error && !error.body.errors) {
                setErrors({ msg: "unknown error" });
              } else if (error && error.sign === "http error")
                setErrors(error.body.errors);
              if (done) setIsUpdate(!isUpdate);
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
              <>
                <ProfileHeader
                  user={user}
                  // onDelete={onDelete}
                  toggle={() => {
                    setIsUpdate(!isUpdate);
                    handleReset();
                  }}
                  isUpdate={isUpdate}
                />

                {isUpdate ? (
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
                    <FormControlLabel
                      className={classes.mb_2}
                      control={
                        <Checkbox
                          checked={editPassword}
                          onChange={() => setEditPassword(!editPassword)}
                          name="checkedF"
                          color="primary"
                        />
                      }
                      label="Edit Password"
                    />
                    {editPassword && (
                      <>
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
                          error={
                            touched.confirmPassword && errors.confirmPassword
                          }
                          helperText={
                            touched.confirmPassword && errors.confirmPassword
                          }
                          className={classes.w50}
                          value={values.confirmPassword}
                          onChange={handleChange}
                          variant="outlined"
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          label="confirm password"
                        />
                      </>
                    )}
                    <Button
                      disabled={isSubmitting}
                      type="submit"
                      size="large"
                      className={classes.w50}
                      variant="contained"
                      color="secondary"
                    >
                      <Typography variant="h6">
                        {isSubmitting && (
                          <CircularProgress
                            style={{ marginRight: "1rem" }}
                            size={20}
                          />
                        )}
                        Update
                      </Typography>
                    </Button>
                  </form>
                ) : (
                  <ProfileDetails user={user} />
                )}
              </>
            )}
          </Formik>
        </ContainerCustom>
      )}
    </HttpHandler>
  );
};
const ProfileDetails = ({ user }) => {
  const classes = useStyles();

  return (
    <>
      <Box pt={2} pb={2} display="flex" alignItems="start">
        <Typography variant="h5" className={classes.minWidth}>
          User name:
        </Typography>
        <Typography variant="h5">{user.userName}</Typography>
      </Box>

      <Box pt={2} pb={2} display="flex" alignItems="start">
        <Typography variant="h5" className={classes.minWidth}>
          Email:
        </Typography>
        <Typography variant="h5">{user.email}</Typography>
      </Box>
    </>
  );
};

const ProfileHeader = ({ user, onDelete, toggle, isUpdate }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <>
      <Box pb={2} display="flex" alignItems="baseline">
        <Box flexGrow={1} pl={2}>
          <Typography variant="h4">{user.userName}</Typography>
        </Box>
        <IconButton
          color="secondary"
          onClick={() => {
            dispatch(logOut());
            history.push("/");
          }}
        >
          <ExitToApp color="secondary" />
        </IconButton>
        <IconButton color="primary" onClick={toggle}>
          {isUpdate ? (
            <CloseIcon color="primary" />
          ) : (
            <EditIcon color="primary" />
          )}
        </IconButton>
      </Box>
      <Box pb={2}>
        <Divider />
      </Box>
    </>
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
  minWidth: {
    minWidth: 170,
    color: "grey",
  },
  Warp: {
    wordWrap: "break-word",
  },
}));

export default Profile;
