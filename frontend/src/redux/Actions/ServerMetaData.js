//!bug: data from local storage is being called once, and whenever i log in  and do any request the token is undefined (ole state) i have to reload the page for the token to be defined
const userJson = localStorage.getItem("user");
const user = userJson && JSON.parse(userJson);
export default {
  fetch_url: "http://localhost:8811/api",
  token: user && user.token,
  //"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMDY5NGI3ZmQ3NzcwNGIxY2EyN2ZhOSIsImlhdCI6MTYyNzgyMTI1OSwiZXhwIjoxNjI3OTk0MDU5fQ.MvGSgDECt5g_NHqPeGmN-iTtGqhbYpgQlmUSx4jG7yU",
};
