import React, { Component } from "react";
import { Link,withRouter,Route } from "react-router-dom";
import ReactDOM from "react-dom"
import Scroll from "../../utils/scroll";
import { getSingerList } from "../../Api/singer";
import { CODE_SUCCESS, Indexs, singerType } from "../../Api/config";
import "./SingerList.less";

class SingerList extends Component {
    constructor(props) {
      super(props);
      this.state = {
        singerList: [],
        refreshScroll: false,
        Indexs: Indexs,
        singerType: singerType,
        typeKey: "all_all",
		indexKey: "all",
      };
    };

	initNavScrollWidth() {
		let tagDOM = ReactDOM.findDOMNode(this.refs.singertype);
		let tagElems = tagDOM.querySelectorAll("a");
		let tagTotalWidth = 0;
		Array.from(tagElems).forEach(a => {
			tagTotalWidth += a.offsetWidth;
		});
		tagDOM.style.width = `${tagTotalWidth}px`;

		let indexDOM = ReactDOM.findDOMNode(this.refs.singerindex);
		let indexElems = indexDOM.querySelectorAll("a");
		let indexTotalWidth = 0;
		Array.from(indexElems).forEach(a => {
			indexTotalWidth += a.offsetWidth;
		});
		indexDOM.style.width = `${indexTotalWidth}px`;
    };

    componentDidMount() {
		//初始化导航元素总宽度
		this.initNavScrollWidth();
	}
    render() {
        let {match} = this.props;
        let singerTypeItem = '';
        singerTypeItem = this.state.singerType.map((item,index) => {
            return (
                <a className={item.key === this.state.typeKey ? "selected" : ""} key={item.key}>
                    {item.name}
                </a>
            )
        });
        let singerIndexItem = '';
        singerIndexItem = this.state.Indexs.map((item,index) => {
            return (
                <a className={item.key === this.state.indexKey ? "selected" : ""} key={item.key}>
                    {item.name}
                </a>
            )
        });

        return(
            <div className="singer-list">
                <div className="select-box">
                    <Scroll direction="horizontal">
                        <div className="singer-type" ref="singertype">
                            {singerTypeItem}
                        </div>
                    </Scroll>
                    <div className="border-inline"></div>
                    <Scroll direction="horizontal">
                        <div className="singer-index" ref="singerindex">
                            {singerIndexItem}
                        </div>
                    </Scroll>
                    <div className="border-inline"></div>
                </div>
                <div className="singer-item">
                    
                </div>
                歌手页面
            </div>
        );
    }
}

export default SingerList;