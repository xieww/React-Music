import React, { Component } from 'react';
import './Topbar.less';

class TopBars extends Component {
    render() {
        return (
            <header className="headerBar">
                <i className="music_logo">QQ音乐</i>
                <a className="link_download">下载APP</a>
            </header>
        );
    }
}

export default TopBars;