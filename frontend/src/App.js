import { BrowserRouter, Switch, Route, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
// my components
import { Provider } from "react-redux";
import reduxStore from "./redux/reduxStore";
import MuiTheme from "./MuiTheme";
import Home from "./Components/Home";
import Log from "./Components/Log";
import NewLog from "./Components/NewLog";
import Header from "./Components/Header";
// import GalleryModal from "./Components/GalleryModal";
// import NotiStack from "./Components/NotiStack";
import Categories from "./Components/Category";
import Charts from "./Components/Charts/Charts";
import Export from "./Components/Export/Export";
import Setting from "./Components/dialoge/Setting";
import RateUs from "./Components/dialoge/RateUs";
import About from "./Components/dialoge/About";
import Login from "./Components/Loging/LogIn";
import Profile from "./Components/Loging/Profile";
import SignIn from "./Components/Loging/SignIn";
import { AddCategory } from "./Components/Category/Add-Update";
import { UpdateCategory } from "./Components/Category/Add-Update";
import Snack from "./Components/Snack";

// todo: make sure to not use makeStyle that mush (refactoring is required)
// todo: have better modal handler without missing the code up like the commented code down

export const LogInSwitch = ({ children }) => {
  const location = useLocation();
  console.log(`location`, location);
  const dispatch = useDispatch();
  const user = localStorage.getItem("user");

  //push notification when visiting not allowed page
  useEffect(() => {
    if (
      !user &&
      !(
        location.pathname === "/" ||
        location.pathname === "/login" ||
        location.pathname === "/signin"
      )
    ) {
      dispatch({
        type: "notification/push",
        payload: {
          message:
            "you can't access the app without a user, please log in or sign up",
        },
      });
    }
  }, [location]);

  //if I am in /login or /signin don't redirect me
  //else go to login
  const pathname = /^\/(login|signin)/.test(location.pathname)
    ? location.pathname
    : "/login";

  //if there is user data (and token) in the location storage (i.e. user is defined) don't redirect me, else redirect me to [pathname]
  return <Switch location={user ? location : { pathname }}>{children}</Switch>;
};

//todo: the http handler is user friendly, espesitaly for new users

function App() {
  return (
    <div className="Application">
      <Provider store={reduxStore}>
        <MuiTheme>
          <BrowserRouter>
            <Header />
            <Snack />
            <LogInSwitch>
              <Route exact path="/">
                <Home />
              </Route>

              <Route path="/log/:id">
                <Log />
              </Route>

              <Route path="/new-log">
                <NewLog />
              </Route>

              <Route path="/categories">
                <Categories />
              </Route>

              <Route path="/category/add" exact>
                <AddCategory />
              </Route>

              <Route path="/category/:id">
                <UpdateCategory />
              </Route>

              <Route path="/charts">
                <Charts />
              </Route>

              {/* mini pages */}
              <Route path="/export">
                <Export />
              </Route>

              <Route path="/rateUs">
                <RateUs />
              </Route>

              <Route path="/setting">
                <Setting />
              </Route>

              <Route path="/about">
                <About />
              </Route>

              {/* users managment */}
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/signin">
                <SignIn />
              </Route>
              <Route path="/profile">
                <Profile />
              </Route>
            </LogInSwitch>
          </BrowserRouter>
        </MuiTheme>
      </Provider>
    </div>
  );
}

export default App;
