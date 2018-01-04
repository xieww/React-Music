import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import './RadioStation.less';

class RadioStation extends Component {
    render() {
        return (
            <Router>
                <div className="radio-list">
                    <h2 className="list_title">电台</h2>
                    <ul className="list_ul">
                        <li className="list_li">
                            <Link className="items" to="" query={{id: 4}}>
                                <div className="list_media">
                                    <img className="list_img" alt="" src="https://y.gtimg.cn/music/photo/radio/track_radio_199_13_1.jpg?max_age=2592000"/>
                                    <span className="player_ico"></span>
                                </div>
                                <div className="list_info">
                                    <h3 className="info_title">热歌</h3>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </div>
            </Router>
        );
    }
}

export default RadioStation;