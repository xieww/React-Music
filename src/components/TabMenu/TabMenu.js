import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Recommend from '../Recommend/Recommend';
import RankingList from '../RankingList/RankingList';
import SearchPage from '../SearchPage/SearchPage';

import './TabMenu.less';

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: '#fff',
        primary2Color: '#fff',
        primary3Color: '#fff',
        accent1Color: '#31c27c',
        accent2Color: '#31c27c',
        accent3Color: '#31c27c',
        textColor: '#31c27c',
        secondaryTextColor: '#31c27c',
        alternateTextColor: '#555',
        canvasColor: '#31c27c',
        borderColor: '#31c27c',
        disabledColor: '#31c27c',
        pickerHeaderColor:'#31c27c',
        clockCircleColor: '#31c27c'
    },
  });

class TobMenu extends Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <Tabs className="tabs">
                    <Tab label="推荐">
                        <div>
                            <Recommend></Recommend>
                        </div>
                    </Tab>
                    <Tab label="排行榜">
                        <div>
                            <RankingList></RankingList>
                        </div>
                    </Tab>
                    <Tab label="搜索">
                        <div>
                            <SearchPage></SearchPage>
                        </div>
                    </Tab>
                </Tabs>
            </MuiThemeProvider>
        );
    }
}

export default TobMenu;