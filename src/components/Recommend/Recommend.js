import React, { Component } from "react";
import CarouselList from "../CarouselList/CarouselList";
import RadioStation from "../RadioStation/RadioStation";
import HotMusic from "../HotMusic/HotMusic";
import "./Recommend.less";
import {slider} from '../../dataStore/dataStore';

class Recommend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderList: []
    };
  };
  componentDidMount(){
      this.setState({
          sliderList: slider,
      });
  }
  render() {
    return (
      <div className="recom_tab">
        <CarouselList list={this.state.sliderList}/>
        <RadioStation />
        <HotMusic />
      </div>
    );
  }
}

export default Recommend;
