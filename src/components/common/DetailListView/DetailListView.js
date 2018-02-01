import React, { Component } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import NavHeadBar from "../NavHeaderBar/NavHeadBar";
import MyLoading from "../../common/Loading/Loading";
import SongItem from "../../common/SongItem/SongItem";
import LazyLoad, { forceCheck } from "react-lazyload";
import Scroll from "../../../utils/scroll";
import { Button, Icon } from 'antd';
import { Tabs } from 'antd-mobile';
import "./DetailListView.less";
import { StickyContainer, Sticky } from 'react-sticky';

const tabs = [
    { title: '单曲' },
    { title: '详情' },
];

class DetailListView extends Component {
    constructor(props) {
      super(props);
      this.state = {
        show: false,
      };
    }

    /**
	 * 监听scroll
	 */
	scroll = ({y}) => {

		let albumBgDOM = ReactDOM.findDOMNode(this.refs.albumBg);
		let albumFixedBgDOM = ReactDOM.findDOMNode(this.refs.albumFixedBg);
		let playButtonWrapperDOM = ReactDOM.findDOMNode(this.refs.playButtonWrapper);
		if (y < 0) {
			if (Math.abs(y) + 55 > albumBgDOM.offsetHeight) {
				albumFixedBgDOM.style.display = "block";
			} else {
				albumFixedBgDOM.style.display = "none";
			}
		} else {
			let transform = `scale(${1 + y * 0.004}, ${1 + y * 0.004})`;
			albumBgDOM.style["webkitTransform"] = transform;
			albumBgDOM.style["transform"] = transform;
			playButtonWrapperDOM.style.marginTop = `${y}px`;
		}
    };
    componentDidMount() {
        this.setState({
            show: true,
          });

        let albumBgDOM = ReactDOM.findDOMNode(this.refs.albumBg);
        let albumContainerDOM = ReactDOM.findDOMNode(this.refs.albumContainer);
        albumContainerDOM.style.top = albumBgDOM.offsetHeight + "px";
    };

    renderTabBar(props) {
        return (<Sticky>
          {({ style }) => <div style={{ ...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
        </Sticky>);
      }

    render() {
        return <CSSTransition in={this.state.show} timeout={300} classNames="translate">
            <div className="singer-detail">
              <div>
                <NavHeadBar title={this.props.rankings.title} className="singer-title" ref="header" />
                <div style={{ position: "relative" }} className="singer-bg">
                  <div ref="albumBg" className="singer-img" style={{ backgroundImage: `url(${this.props.rankings.img})`, backgroundRepeat: "no-repeat" }}>
                    <div className="filter" />
                  </div>
                  <div ref="albumFixedBg" className="singer-img fixed" style={{ backgroundImage: `url(${this.props.rankings.img})`, backgroundRepeat: "no-repeat" }}>
                    <div className="filter" />
                  </div>
                  <div className="play-wrapper" ref="playButtonWrapper" style={this.props.isData === true ? {} : { display: "none" }}>
                    <div className="play" ref="playBtn">
                      <Button icon="play-circle-o" ghost className="btn">
                        全部播放
                      </Button>
                    </div>
                    <span className="date">{this.props.rankings.date}更新·第{this.props.rankings.days}天</span>
                  </div>
                </div>
                <div className="singer-container" ref="albumContainer">
                  <div className="singer-scroll">
                    <Scroll refresh={this.props.refresh} onScroll={this.scroll} ref="list-songs" className="list-songs">
                      <StickyContainer style={this.props.isData === true ? {} : { display: "none" }}>
                        <Tabs tabs={tabs} renderTabBar={this.renderTabBar} tabBarBackgroundColor={"#2A4F56"} swipeable={false}>
                          <div className="song-scroll">
                            <SongItem list={this.props.list} iconShow={this.props.iconShow} />
                          </div>
                          <div className="detail_info">
                            <div dangerouslySetInnerHTML={{__html: this.props.rankings.info}} className="content-info"></div>
                          </div>
                        </Tabs>
                      </StickyContainer>
                    </Scroll>
                  </div>
                </div>
              </div>
              <MyLoading isloading={this.props.loading} />
            </div>
          </CSSTransition>;
    }
}

export default DetailListView;