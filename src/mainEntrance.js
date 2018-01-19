import React from "react";
import { Provider } from "react-redux";
import store from "./stores/store";
import App from "./App";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
  } from "react-router-dom";
import Recommend from './components/Recommend/Recommend';
import RankingList from './components/RankingList/RankingList';
import Search from './components/SearchPage/SearchPage';

class mainEntrance extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            {/*
                Switch组件用来选择最近的一个路由，否则最后一个没有指定path的路由也会显示
                Redirect重定向到列表页
              */}
            <Switch>
              <Route path="/" component={App} />
              <Route path="/rankinglist" component={RankingList} />
              {/* <Route path="/singer" component={SingerList} /> */}
              <Route path="/search" component={Search} />
              <Redirect from="/" to="/recommend" />
              <Route component={Recommend} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default mainEntrance;
