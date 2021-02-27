import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

import DayjsUtils from "@date-io/dayjs";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import CalendarBoard from "./components/CalendarBoard/presentation";
import Navigation from "./components/Navigation/presentation"
import AddScheduleDialog from "./components/AddScheduleDialog/presentation";
import rootReducer from "./redux/rootReducer";
import thunk from 'redux-thunk'

import dayjs from "dayjs";
import "dayjs/locale/ja";
dayjs.locale("ja");
const middlewares = [thunk];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

const App = () => (
  <Provider store={store}>
    <MuiPickersUtilsProvider utils={DayjsUtils}>
      <Navigation />
      <CalendarBoard />
      <AddScheduleDialog />
    </MuiPickersUtilsProvider>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById("root"));
