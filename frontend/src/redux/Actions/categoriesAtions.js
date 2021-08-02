const fetch_url = process.env.REACT_APP_SERVER_URL;

const auth = () => ({
  authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`,
});
const json = {
  "content-type": "application/json",
  Accept: "*/*",
};

// todo: need better way to destruct the error response
const throwError = (body, status) => {
  const err = new Error();
  err.sign = "http error";
  err.body = body;
  err.status = status;
  throw err;
};

const deleteCategory = (id) => async (dispatch, state) => {
  const config = {
    method: "DELETE",
    headers: { ...auth() },
  };
  const res = await fetch(`${fetch_url}/category/${id}`, config);
  const resjson = await res.json();
  if (!res.ok) throwError(resjson, res.status);

  dispatch({
    type: "category/delete",
    payload: id,
  });

  return resjson;
};

const revertDeleteCategory = (id) => async (dispatch, state) => {
  const config = {
    method: "DELETE",
    headers: { ...auth() },
  };
  const res = await fetch(`${fetch_url}/category/${id}?revert=ture`, config);
  const resjson = await res.json();

  if (!res.ok) throwError(resjson, res.status);

  return resjson;
};

const addCategory = (data) => async (dispatch, state) => {
  const config = {
    method: "POST",
    headers: { ...auth(), ...json },
    body: JSON.stringify(data),
  };
  const res = await fetch(`${fetch_url}/category`, config);
  const resjson = await res.json();
  if (!res.ok) throwError(resjson, res.status);

  dispatch({
    type: "category/add",
    payload: [resjson],
  });

  return resjson;
};

const updateCategory = (data, id) => async (dispatch, state) => {
  const config = {
    method: "PUT",
    headers: { ...auth(), ...json },
    body: JSON.stringify(data),
  };
  const res = await fetch(`${fetch_url}/category/${id}`, config);
  const resjson = await res.json();
  if (!res.ok) throwError(resjson, res.status);

  dispatch({
    type: "category/update",
    payload: resjson,
  });

  return resjson;
};

const getCategories = () => async (dispatch, state) => {
  const config = {
    headers: { ...auth() },
  };

  const res = await fetch(`${fetch_url}/category`, config);

  let resjson = [];
  if (res.status === 204) {
    resjson = [];
  } else {
    resjson = await res.json();
  }

  if (!res.ok) throwError(resjson, res.status);

  dispatch({
    type: "category/replace",
    payload: resjson,
  });
};

const getCategory = (id) => async (dispatch, state) => {
  const config = {
    headers: { ...auth() },
  };

  const res = await fetch(`${fetch_url}/category/${id}`, config);
  const resjson = await res.json();
  if (!res.ok) throwError(resjson, res.status);

  dispatch({
    type: "category/update",
    payload: [resjson],
  });
};

export {
  getCategories,
  getCategory,
  updateCategory,
  addCategory,
  deleteCategory,
  revertDeleteCategory,
};
