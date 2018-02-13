import React, { Component } from "react";
import TopBars from "./components/TopBars/TopBar";
import TabMenu from "./components/TabMenu/TabMenu";
import Recommend from "./components/Recommend/Recommend";
import RankingList from "./components/RankingList/RankingList";
// import Search from "./components/SearchPage/SearchPage";
import Search from "./reduxs/containers/search";
import SingerList from "./components/SingerList/SingerList";
import {BrowserRouter as Router, Route, Switch, Redirect, NavLink} from "react-router-dom";
// import Player from "./components/common/Player/Player";
import "./App.less";
import MusicPlayer from "./components/common/Player/MusicPlayer";
// import UserCenter from "./components/UserCenter/UserCenter";
import UserCenter from "./reduxs/containers/UserCenter";

class App extends Component {

  componentWillMount(){
      
  };

  render() {
    return (
      <Router>
        <div className="App">
            <TopBars />
            <TabMenu />
            <div className="music-view">
                {/*
                  Switch组件用来选择最近的一个路由，否则最后一个没有指定path的路由也会显示
                  Redirect重定向到列表页
                */}
                <Switch>
                  <Route path="/recommend" component={Recommend} />
                  <Route path="/singer" component={SingerList} />
                  <Route path="/rankinglist" component={RankingList} />
                  <Route path="/search" component={Search} /> 
                  <Route path="/usercenter" component={UserCenter} /> 
                  {/* <Route path="/player" component={Player} /> */}
                  <Redirect from="/" to="/recommend" />
                  <Route component={Recommend} />
                </Switch>
              </div>
              <MusicPlayer/>
          </div>
      </Router>
    );
  }
}

export default App;
