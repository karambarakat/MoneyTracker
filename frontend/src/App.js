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
import GalleryModal from "./Components/GalleryModal";
import NotiStack from "./Components/NotiStack";
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
//

// function SpecialSwich({ children }) {
//   const location = useLocation();
//   const dispatch = useDispatch();

//   let background = location.state && location.state.background;
//   let path = location.state && location.state.path;
//   if (path) {
//     dispatch({ type: "gallery/open" });
//   }
//   console.log(path, location, background);
//   return (
//     <>
//       <Switch location={background || location}>{children}</Switch>

//       {background && (
//         <Route path={path}>
//           <GalleryModal>
//             {path === "/log/:id" ? (
//               <Log />
//             ) : path === "/export" ? (
//               <Export />
//             ) : path === "/setting" ? (
//               <Setting />
//             ) : path === "/rateUs" ? (
//               <RateUs />
//             ) : path === "/about" ? (
//               <About />
//             ) : path === "/login" ? (
//               <LogIn />
//             ) : (
//               path === "/new-log" && <NewLog />
//             )}
//           </GalleryModal>
//         </Route>
//       )}
//     </>
//   );
// }

export const LogInSwitch = ({ children }) => {
  const location = useLocation();
  console.log(`location`, location);
  const dispatch = useDispatch();
  const user = localStorage.getItem("user");
  useEffect(() => {
    if (
      !user &&
      !(location.pathname === "/" || location.pathname === "/login")
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
  return (
    <Switch location={user ? location : { pathname: "/login" }}>
      {children}
    </Switch>
  );
};

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
