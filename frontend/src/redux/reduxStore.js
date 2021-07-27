import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { logsReducer } from "./Reducers/logReducers";
import { categoriesReducer } from "./Reducers/categoriesReducers";
import { httpReducer } from "./Reducers/HttpReducers";
import { notifications } from "./Reducers/notificationReducers";
const reducers = combineReducers({
  logs: logsReducer,
  categories: categoriesReducer,
  httpRequests: httpReducer,
  notifications: notifications,
  meta: (s = {}, action) => s,
});

const intialStates = {
  meta: {
    icons: [
      "Star",
      "School",
      "SportsEsports",
      "Cake",
      "SportsSoccer",
      "SportsBasketball",
      "KingBed",
      "SportsTennis",
      "OutdoorGrill",
      "SportsMotorsports",
      "SportsBaseball",
      "SportsHandball",
      "SportsVolleyball",
      "SportsFootball",
      "House",
      "Casino",
      "Flight",
      "Restaurant",
      "LocalMall",
      "LocalLibrary",
      "LocalCafe",
      "LocalAtm",
      "LocalGroceryStore",
      "LocalFlorist",
      "LocalGasStation",
      "Train",
      "TwoWheeler",
      "DirectionsBoat",
      "LocalPizza",
      "LocalSee",
      "PhoneIphone",
      "DesktopWindows",
      "Laptop",
      "Tv",
      "Speaker",
      "SentimentSatisfiedAlt",
      "VpnKey",
      "PlayCircle",
      "Movie",
      "Error",
      "AddAlert",
      "CheckCircle",
      "Favorite",
      "Event",
      "AccountBalance",
      "Work",
      "Save",
      "ShoppingBasket",
      "Stars",
      "Extension",
      "GTranslate",
    ],
    colors: [
      "6074ff",
      "f8cd92",
      "ec7194",
      "4cbfbc",
      "d38ead",
      "d289f5",
      "1ca2ef",
      "a178fa",
    ],
  },
};

const store = createStore(
  reducers,
  intialStates,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
