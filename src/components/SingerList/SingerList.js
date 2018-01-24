import React, { Component } from "react";
import { Link,withRouter,Route } from "react-router-dom";
import ReactDOM from "react-dom"
import Scroll from "../../utils/scroll";
import { getSingerList } from "../../Api/singer";
import { CODE_SUCCESS, Indexs, singerType } from "../../Api/config";
import "./SingerList.less";
import * as SingerModel from "../../model/singer";
// import  Singer from "../../model/singer";

const HOT_SINGER_LEN = 10;
const HOT_NAME = '热门';

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
		let typeDOM = ReactDOM.findDOMNode(this.refs.singertype);
		let typeElems = typeDOM.querySelectorAll("a");
		let typeTotalWidth = 0;
		Array.from(typeElems).forEach(a => {
			typeTotalWidth += a.offsetWidth;
		});
		typeDOM.style.width = `${typeTotalWidth}px`;

		let indexDOM = ReactDOM.findDOMNode(this.refs.singerindex);
		let indexElems = indexDOM.querySelectorAll("a");
		let indexTotalWidth = 0;
		Array.from(indexElems).forEach(a => {
			indexTotalWidth += a.offsetWidth;
		});
		indexDOM.style.width = `${indexTotalWidth}px`;
    };

    getSingerData() {
        getSingerList(1, `${this.state.typeKey + '_' + this.state.indexKey}`).then(res => {
            if (res) {
                if (res.code === CODE_SUCCESS) {
                    // console.log(res);
                    this.setState({
                        singerList:this.getSortSinger(res.data.list),
                    });
                }
            }
        })
    };
    
    getSortSinger(list) {
        let map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        }
        list.forEach((item, index) => {
          if (index < HOT_SINGER_LEN) {
            map.hot.items.push(new SingerModel.Singer(
              item.Fsinger_name,
              item.Fsinger_id,
              item.Fsinger_mid,
              `https://y.gtimg.cn/music/photo_new/T001R150x150M000${item.Fsinger_mid}.jpg?max_age=2592000`
            ))
          }
          const key = item.Findex
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push(new SingerModel.Singer(
            item.Fsinger_name,
            item.Fsinger_id,
            item.Fsinger_mid,
            `https://y.gtimg.cn/music/photo_new/T001R150x150M000${item.Fsinger_mid}.jpg?max_age=2592000`
          ))
        })
        // 为了得到有序列表，我们需要处理 map
        let ret = []
        let hot = []
        for (let key in map) {
          let val = map[key]
          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val)
          } else if (val.title === HOT_NAME) {
            hot.push(val)
          }
        }
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(ret)
    };

    componentDidMount() {
		//初始化导航元素总宽度
        this.initNavScrollWidth();
        this.getSingerData();
	}
    render() {
        // console.log('this.state.singerList:',this.state.singerList);
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