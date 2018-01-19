import React, { Component } from 'react';
import CarouselList from '../CarouselList/CarouselList';
import RadioStation from '../RadioStation/RadioStation';
import HotMusic from '../HotMusic/HotMusic';
import HotMusicList from '../HotMusicLIst/HotMusicList';
import './Recommend.less';
// import {slider} from '../../dataStore/dataStore';
import { getCarouseList, getDiscList } from '../../Api/recommend';
import { CODE_SUCCESS } from '../../Api/config';


class Recommend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderList: [],
      discList: []
    };
  };
  /**
   * @author xieww
   * @description获取推荐页轮播图等信息
   */
  getCarouseData() {
    getCarouseList().then((res) => {
      if (res) {
        if (res.code === CODE_SUCCESS) {
          console.log(res.data.slider);
          this.setState({
            sliderList: res.data.slider,
          });
        }
      }
    })
  };
  getDiscData() {
    getDiscList().then((res) => {
      console.log(res);
      if (res) {
        if (res.code === CODE_SUCCESS) {
          console.log(res.data.list);
          this.setState({
            discList: res.data.list,
          });
        }
      }
    })
  }
  componentDidMount(){
    this.getCarouseData();
    this.getDiscData();
  }
  render() {
    return (
      <div className="recom_tab">
        <CarouselList list={this.state.sliderList}/>
        {/* <RadioStation /> */}
        <HotMusicList list={this.state.discList}/>
      </div>
    );
  }
}

export default Recommend;
