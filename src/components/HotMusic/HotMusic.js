import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './HotMusic.less';

class HotMusic extends Component {
    render() {
        return (
                <div className="hot-list">
                    <h2 className="list_title">热门歌单</h2>
                    <ul className="list_ul">
                        <li className="list_li">
                            <Link className="items" to="" query={{id: 4}}>
                                <div className="list_media">
                                    <img className="list_img" alt="" src="https://y.gtimg.cn/music/photo_new/T006R300x300M00000333So02drvak.jpg?max_age=2592000"/>
                                    <span className="list_count">
                                        <i className="icon_listen"></i>
                                        768.8万
                                    </span>
                                    <span className="player_ico"></span>
                                </div>
                                <div className="list_info">
                                    <h3 className="info_title">催泪大杀器！盘点演唱会经典万人大合唱</h3>
                                    <p className="hottext">Harry</p>
                                </div>
                            </Link>
                        </li>
                        <li className="list_li">
                            <Link className="items" to="" query={{id: 4}}>
                                <div className="list_media">
                                    <img className="list_img" alt="" src="https://y.gtimg.cn/music/photo_new/T006R300x300M0000013j8zs1jRnLQ.jpg?max_age=2592000"/>
                                    <span className="list_count">
                                        <i className="icon_listen"></i>
                                        768.8万
                                    </span>
                                    <span className="player_ico"></span>
                                </div>
                                <div className="list_info">
                                    <h3 className="info_title">纳尼？这些华语歌手竟然会唱日语歌！</h3>
                                    <p className="hottext">风吹草地</p>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </div>
        );
    }
}

export default HotMusic;