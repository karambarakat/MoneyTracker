import metaData from "./ServerMetaData";
const { fetch_url, token } = metaData;

const auth = {
  authorization: `Bearer ${token}`,
};
const auth_accept = {
  authorization: `Bearer ${token}`,
  "content-type": "application/json",
  Accept: "*/*",
};
const auth_header = {
  headers: {
    authorization: `Bearer ${token}`,
  },
};

// todo: need better way to destruct the error response
const throwError = (body, status) => {
  const err = new Error();
  err.body = body;
  err.status = status;
  throw err;
};

const deleteCategory = (id) => async (dispatch, state) => {
  const config = {
    method: "DELETE",
    headers: auth,
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

const addCategory = (data) => async (dispatch, state) => {
  const config = {
    method: "POST",
    headers: auth_accept,
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
    headers: auth_accept,
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
  console.log("called");
  const res = await fetch(`${fetch_url}/category`, auth_header);

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
  const res = await fetch(`${fetch_url}/category/${id}`, auth_header);
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
};
