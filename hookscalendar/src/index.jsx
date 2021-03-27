import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

import thunk from "redux-thunk";

import DayjsUtils from "@date-io/dayjs";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import CalendarBoard from "./components/CalendarBoard/index";
import Navigation from "./components/Navigation/index"
import AddScheduleDialog from "./components/AddScheduleDialog/index";
import CurrentScheduleDialog from "./components/CurrentScheduleDialog/index";
import UpdateScheduleDialog from "./components/UpdateSchdeuleDialog/index"
import ErrorSnackbar from "./components/ErrorSnackbar/index";

import rootReducer from "./redux/rootReducer";

import dayjs from "dayjs";
import "dayjs/locale/ja";
dayjs.locale("ja");

const store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => (
  <Provider store={store}>
    <MuiPickersUtilsProvider utils={DayjsUtils}>
      <Navigation />
      <CalendarBoard />
      <AddScheduleDialog />
      <CurrentScheduleDialog />
      <UpdateScheduleDialog />
      <ErrorSnackbar />
    </MuiPickersUtilsProvider>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById("root"));
