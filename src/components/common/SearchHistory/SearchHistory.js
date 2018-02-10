import React, { Component } from "react";
import { Icon} from 'antd';
import "./SearchHistory.less";

class SearchHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
      };
    
      /**
       * @author xieww
       * @description 删除搜索记录
       * @param {*} value 
       */
    deleteSearchHistory = (value) => {
        return () =>{
            this.props.deleteSearch(value);
        };
    };

    render() {
        // console.log("搜索历史",this.props);

        let historyItem = "";
        historyItem = this.props.list.map((item,index) => {
            return (
                <li className="list-li" key={index}>
                    <span className="text">{item}</span>
                    <Icon type="close" className="close-icon"  onClick={this.deleteSearchHistory(item)}/>
                </li>
            )
        });
        return (
            <div className="history-list">
                <ul className="list-ul">
                    {historyItem}
                </ul>
            </div>
        );
    }
}

export default SearchHistory;