import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

import reducer from "reducers";

import TicTacToeGame from "./TicTacToeGame";

import * as serviceWorker from "./serviceWorker";
import "./index.css";

declare global {
  interface Window { __REDUX_DEVTOOLS_EXTENSION__: any; }
}

const devToolsExt = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(reducer, devToolsExt);

ReactDOM.render(
  <Provider store={store}>
    <TicTacToeGame />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
