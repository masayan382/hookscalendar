import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

import CalendarBoard from "./components/CalendarBoard/presentation";
import Navigation from "./components/Navigation/presentation"
import rootReducer from "./redux/rootReducer";
import thunk from 'redux-thunk'

import dayjs from "dayjs";
import "dayjs/locale/ja";
dayjs.locale("ja");
const middlewares = [thunk];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

const App = () => (
  <Provider store={store}>
    <Navigation />
    <CalendarBoard />
  </Provider>
);

ReactDOM.render(<App />, document.getElementById("root"));
