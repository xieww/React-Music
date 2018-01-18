import React, { Component } from "react";
import TopBars from "./components/TopBars/TopBar";
import TabMenu from "./components/TabMenu/TabMenu";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  NavLink
} from "react-router-dom";
import Recommend from './components/Recommend/Recommend';
import RankingList from './components/RankingList/RankingList';
import Search from './components/SearchPage/SearchPage';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <TopBars />
          <TabMenu />
        </div>
        <div>
          {/*
                Switch组件用来选择最近的一个路由，否则最后一个没有指定path的路由也会显示
                Redirect重定向到列表页
              */}
          <Switch>
            <Route path="/recommend" component={Recommend} />
            <Route path="/rankinglist" component={RankingList} />
            {/* <Route path="/singer" component={SingerList} /> */}
            <Route path="/search" component={Search} />
            <Redirect from="/" to="/recommend" />
            <Route component={Recommend} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
