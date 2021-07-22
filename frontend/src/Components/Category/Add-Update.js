import CategoryForm from "./CategoryForm";
import {
  deleteCategory,
  addCategory,
  updateCategory,
} from "../../redux/Actions/categoriesAtions";
import http from "../../redux/Actions/http";

import React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";

export const AddCategory = () => {
  const history = useHistory();
  return (
    <CategoryForm
      Heading="Add New Category"
      submitForm={async (values, { setSubmitting, setErrors }) => {
        const [done, error] = await http(addCategory(values));
        if (error) setErrors(error.errors);
        if (done) {
          history.push("/categories");
        }
        setSubmitting(false);
      }}
      action="Add Category"
    ></CategoryForm>
  );
};
export const UpdateCategory = () => {
  const history = useHistory();
  const { params } = useRouteMatch();
  const { id } = params;
  const category = useSelector((state) =>
    state.categories.find((e) => e._id === id)
  );

  return (
    <CategoryForm
      Heading={`Update "${category.title}"`}
      submitForm={async (values, { setSubmitting, setErrors }) => {
        const [done, error] = await http(updateCategory(values, id));
        if (error) setErrors(error.errors);
        if (done) {
          history.push("/categories");
        }
        setSubmitting(false);
      }}
      action="Update Category"
      category={{
        title: category.title,
        color: category.color,
        icon: category.icon,
      }}
      deletebtn={async () => {
        const [done, error] = await http(deleteCategory(id));
        if (error) alert("some error occured");
        if (done) {
          history.push("/categories");
        }
      }}
    ></CategoryForm>
  );
};
