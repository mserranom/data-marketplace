import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { initStore } from "./redux/store";
import Root from "./components/Root";
import { checkCurrentUsername } from "./aws/login";

async function run() {
  const username = await checkCurrentUsername();

  ReactDOM.render(
    <Provider store={initStore(username)}>
      <Router>
        <Root />
      </Router>
    </Provider>,
    document.getElementById("root")
  );

  registerServiceWorker();
}

run();
