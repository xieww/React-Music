import React, { Component } from "react";
import { List, Badge,Icon } from 'antd-mobile';
import { Button } from 'antd';
import "./SongItem.less";

class SongItem extends Component {
    constructor(props) {
      super(props);
      this.state = {
        // loadings: true,
        // show: false,
      };
    };

    render() {
        let songItems = "";
        songItems = this.props.list.map((item,index) => {

            let pItem = "";
            if (item.albumdesc != "") {
                pItem = <p className="song-info">{item.singer}·{item.album}·{item.albumdesc}</p>;
            } else {
                pItem = <p className="song-info">{item.singer}·{item.album}</p>;
            }
            return (
                <li className="item-li" key={index}>
                    <div className="content">
                        <h2 className="songname">
                            {item.name}
                            <Badge text={item.isonly === 1 ? "独家" : ""} 
                                style={{
                                marginLeft: 5,
                                padding: '0 1px',
                                fontSize: 8,
                                backgroundColor: '#2A4F56',
                                borderRadius: 2,
                                color: '#31c27c',
                                border: '1px solid #31c27c',
                                width: 21,
                                height: 14,
                                lineHeight: 1.5
                                }}
                            />
                            {/* <span className="tags">{item.isonly === 1 ? "独家" : ""}</span> */}
                        </h2>
                        {pItem}
                    </div>
                    <div className="right">
                        <Icon key="1" type="ellipsis" />
                    </div>
                </li>
            );
        })

        return (
                <ul className="song-item">
                    {songItems}
                </ul>
        );
    }
}

export default SongItem;