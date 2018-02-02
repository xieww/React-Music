import React from "react";
import { Provider } from "react-redux";
import store from "./reduxs/stores/store";
import App from "./App";


// import history from './router';
class mainEntrance extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App/>
      </Provider>
    );
  }
}

export default mainEntrance;
