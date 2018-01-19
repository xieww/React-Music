import React, { Component } from "react";
// import { Tabs, Tab } from "material-ui/Tabs";
// import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
// import getMuiTheme from "material-ui/styles/getMuiTheme";
import Recommend from "../Recommend/Recommend";
import RankingList from "../RankingList/RankingList";
import SearchPage from "../SearchPage/SearchPage";
// import { BrowserRouter as Link } from "react-router-dom";

import { Tabs, WhiteSpace} from "antd-mobile";
import "./TabMenu.less";

// const muiTheme = getMuiTheme({
//   palette: {
//     primary1Color: "#fff",
//     primary2Color: "#fff",
//     primary3Color: "#fff",
//     accent1Color: "#31c27c",
//     accent2Color: "#31c27c",
//     accent3Color: "#31c27c",
//     textColor: "#31c27c",
//     secondaryTextColor: "#31c27c",
//     alternateTextColor: "#555",
//     canvasColor: "#31c27c",
//     borderColor: "#31c27c",
//     disabledColor: "#31c27c",
//     pickerHeaderColor: "#31c27c",
//     clockCircleColor: "#31c27c"
//   }
// });
const tabs = [{ title: "推荐" }, { title: "排行榜" }, { title: "搜索" }];

class TobMenu extends Component {
  render() {
    return (
      <div className="maincolor">
        <Tabs
          tabs={tabs}
          initialPage={0}
          onChange={(tab, index) => {
            console.log("onChange", index, tab);
          }}
          onTabClick={(tab, index) => {
            console.log("onTabClick", index, tab);
          }}
          tabBarActiveTextColor={'#31c27c'}
        >
          <Recommend />
          <RankingList />
          <SearchPage />
        </Tabs>
        <WhiteSpace />
      </div>
    );
  }
}

export default TobMenu;
