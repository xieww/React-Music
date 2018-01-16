import React, { Component } from "react";
// import { Carousel } from 'antd';
// import 'antd/dist/antd.css';

import { Carousel } from "antd-mobile";
// import "antd-mobile/dist/antd-mobile.css";
import "./CarouselList.less";

class CarouselLIst extends Component {
    // state = {
    //     data: ['1', '2', '3'],
    //     imgHeight: 150,
    //     slideIndex: 0,
    //   }
    constructor(props) {
        super(props);
        this.state = {
            sliderList: [],
            imgHeight: 150,
            slideIndex: 0,
        };
    };
  render() {
    
    let sliderItem = '';
    sliderItem = this.props.list.map((item,index) => {
        return (
            <a className="imgList" style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }} href={item.linkUrl} key={index}>
                <img
                className="imgs"
                alt=""
                src={item.picUrl}
                onLoad={() => {
                    window.dispatchEvent(new Event("resize"));
                    this.setState({ imgHeight: "auto" });
                }}
                />
            </a>
        );
    } );
    
    return (
      <div className="lunbo">
        <Carousel autoplay={true} infinite dotActiveStyle={{ background: "#31c27c" }}>
            {sliderItem}
          {/* <a className="imgList" style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}>
            <img
              className="imgs"
              alt=""
              src="https://y.gtimg.cn/music/photo_new/T003R720x288M000004Dzgaz4Pzk6R.jpg?max_age=2592000"
              onLoad={() => {
                window.dispatchEvent(new Event("resize"));
                this.setState({ imgHeight: "auto" });
              }}
            />
          </a>
          <a className="imgList" style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}>
            <img
              className="imgs"
              alt=""
              src="https://y.gtimg.cn/music/photo_new/T003R720x288M000004VhQuk1lkvmr.jpg?max_age=2592000"
              onLoad={() => {
                window.dispatchEvent(new Event("resize"));
                this.setState({ imgHeight: "auto" });
              }}
            />
          </a>
          <a className="imgList" style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}> 
            <img
              className="imgs"
              alt=""
              src="https://y.gtimg.cn/music/photo_new/T003R720x288M0000037qVK63uFcq4.jpg?max_age=2592000"
              onLoad={() => {
                window.dispatchEvent(new Event("resize"));
                this.setState({ imgHeight: "auto" });
              }}
            />
          </a>
          <a className="imgList" style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}>
            <img
              className="imgs"
              alt=""
              src="https://y.gtimg.cn/music/photo_new/T003R720x288M000000Uqssa0qHAp8.jpg?max_age=2592000"
              onLoad={() => {
                window.dispatchEvent(new Event("resize"));
                this.setState({ imgHeight: "auto" });
              }}
            />
          </a>
          <a className="imgList" style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}>
            <img
              className="imgs"
              alt=""
              src="https://y.gtimg.cn/music/photo_new/T003R720x288M000001o5FzB1wx40X.jpg?max_age=2592000"
              onLoad={() => {
                window.dispatchEvent(new Event("resize"));
                this.setState({ imgHeight: "auto" });
              }}
            />
          </a> */}
        </Carousel>
      </div>
    );
  }
}

export default CarouselLIst;
