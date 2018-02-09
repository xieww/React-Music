import React, { Component } from 'react';
import './Topbar.less';

class TopBars extends Component {
    render() {
        return (
            <header className="headerBar">
                {/* <i className="music_logo">IMusic音乐</i> */}
                {/* <a className="link_download">下载APP</a> */}
               <div className="icon-logo"></div>
               <h1 className="text">IMusic</h1>
            </header>
        );
    }
}

export default TopBars;