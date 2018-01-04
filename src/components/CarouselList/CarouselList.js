import React, { Component } from 'react';
import { Carousel } from 'antd';
import 'antd/dist/antd.css';
import './CarouselList.less';

class CarouselLIst extends Component {
    render() {
        return (
                <div className="lunbo">
                    <Carousel autoplay>
                        <div className="imgList">
                            <img className="imgs" alt="" src="https://y.gtimg.cn/music/photo_new/T003R720x288M000004Dzgaz4Pzk6R.jpg?max_age=2592000"/>
                        </div>
                        <div className="imgList">
                            <img className="imgs" alt=""  src="https://y.gtimg.cn/music/photo_new/T003R720x288M000004VhQuk1lkvmr.jpg?max_age=2592000"/>
                        </div>
                        <div className="imgList">
                            <img className="imgs" alt=""  src="https://y.gtimg.cn/music/photo_new/T003R720x288M0000037qVK63uFcq4.jpg?max_age=2592000"/>
                        </div>
                        <div className="imgList">
                            <img className="imgs" alt=""  src="https://y.gtimg.cn/music/photo_new/T003R720x288M000000Uqssa0qHAp8.jpg?max_age=2592000"/>
                        </div>
                        <div className="imgList">
                            <img className="imgs" alt=""  src="https://y.gtimg.cn/music/photo_new/T003R720x288M000001o5FzB1wx40X.jpg?max_age=2592000"/>
                        </div>
                    </Carousel>
                </div>
        );
    }
}

export default CarouselLIst;