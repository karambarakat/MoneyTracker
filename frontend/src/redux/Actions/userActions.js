import metaData from "./ServerMetaData";
const { fetch_url, token } = metaData;

//auth headers
const auth = {
  authorization: `Bearer ${token}`,
};

//json headers
const json = {
  "content-type": "application/json",
  Accept: "*/*",
};

const throwError = (body, status) => {
  const err = new Error();
  err.sign = "http error";
  err.body = body;
  err.status = status;
  throw err;
};

const login =
  ({ email, password }) =>
  async (dispatch, state) => {
    const config = {
      method: "POST",
      headers: { ...json },
      body: JSON.stringify({ email, password }),
    };
    const res = await fetch(`${fetch_url}/user/login`, config);
    const resjson = await res.json();

    if (!res.ok) throwError(resjson, res.status);

    dispatch({
      type: "user/login",
      payload: resjson,
    });

    localStorage.setItem("user", JSON.stringify(resjson));

    return resjson;
  };

const signIn =
  ({ userName, email, password }) =>
  async (dispatch, state) => {
    const config = {
      method: "POST",
      headers: { ...json },
      body: JSON.stringify({ userName, email, password }),
    };
    const res = await fetch(`${fetch_url}/user`, config);
    const resjson = await res.json();

    if (!res.ok) throwError(resjson, res.status);

    dispatch({
      type: "user/login",
      payload: resjson,
    });

    localStorage.setItem("user", JSON.stringify(resjson));

    return resjson;
  };

const logOut = () => async (dispatch, state) => {
  dispatch({
    type: "user/logout",
  });

  localStorage.removeItem("user");
};

const getProfile = () => async (dispatch, state) => {
  const config = {
    method: "GET",
    headers: { ...auth, ...json },
  };
  const res = await fetch(`${fetch_url}/user/profile`, config);
  const resjson = await res.json();
  if (!res.ok) throwError(resjson, res.status);

  dispatch({
    type: "user/login",
    payload: resjson,
  });

  localStorage.setItem("user", JSON.stringify(resjson));

  return resjson;
};

const updateProfile = (data) => async (dispatch, state) => {
  const config = {
    method: "PUT",
    headers: { ...auth, ...json },
    body: JSON.stringify(data),
  };
  const res = await fetch(`${fetch_url}/user/profile`, config);
  const resjson = await res.json();
  if (!res.ok) throwError(resjson, res.status);

  dispatch({
    type: "user/login",
    payload: resjson,
  });

  localStorage.setItem("user", JSON.stringify(resjson));

  return resjson;
};

export { login, logOut, signIn, getProfile, updateProfile };
