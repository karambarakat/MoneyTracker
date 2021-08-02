const fetch_url = process.env.REACT_APP_SERVER_URL;

const auth = () => ({
  authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`,
});

const json = {
  "content-type": "application/json",
  Accept: "*/*",
};

//!bug: if the error is a result of bad CORS policy: this function will be called but with no body for example (only err.message)
//not sure about this bug anymore
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
  dispatch({
    type: "log/replace",
    //empty stirng or empty array
    payload: "",
  });
  dispatch({
    type: "category/replace",
    //empty stirng or empty array
    payload: [],
  });
  dispatch({
    type: "user/logout",
  });

  localStorage.removeItem("user");
};

const getProfile = () => async (dispatch, state) => {
  const config = {
    method: "GET",
    headers: { ...auth(), ...json },
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
    headers: { ...auth(), ...json },
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
