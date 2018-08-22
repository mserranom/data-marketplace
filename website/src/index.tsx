// import * as React from 'react';
// import * as ReactDOM from 'react-dom';
// import App from './App';
// import './index.css';
// import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(
//   <App />,
//   document.getElementById('root') as HTMLElement
// );
// registerServiceWorker();

import * as React from "react";
import * as ReactDOM from "react-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { initStore } from "./redux/store";
import Root from "./ui/routes/Root";
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
