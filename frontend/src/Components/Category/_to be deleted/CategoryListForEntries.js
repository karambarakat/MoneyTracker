import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAll } from "../../Mixins/CategoriesBackend";
import CategoryForm from "./CategoryForm";

import CategoryIcon from "./CategoryIcon";
// import { CatOfflineList } from "./utils";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import Add from "@material-ui/icons/Add";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    border: `1.2px solid ${theme.palette.grey[400]}`,
    borderRadius: `${theme.shape.borderRadius}px`,
    "&:hover": {
      border: `1.2px solid ${theme.palette.grey[900]}`,
    },
  },
  AddButton: {
    border: `2px dotted ${theme.palette.grey[500]}`,
  },
}));

const useModal = (dispatch) => {
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    if (modal == true) {
      dispatch({ type: "activeCategory/remove" });
    }
    setModal(!modal);
  };

  return [modal, toggleModal];
};
const useRedux = (dispatch) => {
  const categories = useSelector((state) => state.categories);
  const refresh = useSelector((state) => state.refresh);
  useEffect(() => {
    fetchAll()
      .then((AJAXData) => {
        dispatch({ type: "category/getAll", payload: AJAXData });
      })
      .catch(console.log);
  }, [refresh.category]);

  return [categories];
};

const CategoryListForEntries = ({ onCatClick, value, onChange }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [categories] = useRedux(dispatch);
  const [modal, toggleModal] = useModal(dispatch);

  return (
    <>
      <Box p={3} className={classes.container}>
        <Grid container>
          {categories?.map((item) => (
            <Grid key={item.id} item xs={3} align="center">
              <Box py={1}>
                <CategoryIcon
                  onClick={() => {
                    onChange?.(item);
                  }}
                  on={value.id == item.id}
                  iconName={item.iconName}
                  color={item.color}
                />
                <Typography variant="body1">{item.title}</Typography>
              </Box>
            </Grid>
          ))}
          <Grid item xs={3} align="center">
            <Box py={1}>
              <IconButton
                onClick={() => {
                  toggleModal();
                }}
                disableRipple
                className={classes.AddButton}
              >
                <Add />
              </IconButton>
              <Typography variant="body1">Add Category</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Modal open={modal} onClose={toggleModal}>
        <CategoryForm onSubmitCB={toggleModal} />
      </Modal>
    </>
  );
};

export default CategoryListForEntries;
