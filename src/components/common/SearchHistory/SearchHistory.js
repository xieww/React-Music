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
        return (e) =>{
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            this.props.deleteSearch(value);
        };
    };

    /**
     * @author xieww
     * @description 选择关键字搜索
     * @param {*} k 
     */
    setSearchKeyword = (k,e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        this.props.selectItem(k);
    }

    render() {
        // console.log('list',this.props);
        let historyItem = "";
        historyItem = this.props.list.map((item,index) => {
            return (
                <li className="list-li" key={index} onClick={e => this.setSearchKeyword(item,e)}>
                    <span className="text">{item}</span>
                    <Icon type="close" className="close-icon"  onClick={this.deleteSearchHistory(item)}/>
                </li>
            )
        });
        return (
                <ul className="list-ul">
                    {historyItem}
                </ul>
        );
    }
}

export default SearchHistory;