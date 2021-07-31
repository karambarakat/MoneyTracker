import { BrowserRouter, Switch, Route, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import React from "react";
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
import LogIn from "./Components/dialoge/LogIn";
import { AddCategory } from "./Components/Category/Add-Update";
import { UpdateCategory } from "./Components/Category/Add-Update";
import Snack from "./Components/Snack";

// todo: make sure to not use makeStyle that mush (refactoring is required)
// todo: have better modla handler without missing the code up
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

function App() {
  return (
    <div className="Application">
      <Provider store={reduxStore}>
        <MuiTheme>
          <BrowserRouter>
            <Header />
            <Snack />
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>

              <Route exact path="/log/:id">
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

              <Route path="/login">
                <LogIn />
              </Route>
            </Switch>
          </BrowserRouter>
        </MuiTheme>
      </Provider>
    </div>
  );
}

export default App;
