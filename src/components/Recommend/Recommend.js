import React, { Component } from 'react';
import CarouselList from '../CarouselList/CarouselList';
import RadioStation from '../RadioStation/RadioStation'
import HotMusic from '../HotMusic/HotMusic';
import './Recommend.less';

class Recommend extends Component {
    render() {
        return (
            <div className="recom_tab">
                <CarouselList></CarouselList>
                <RadioStation></RadioStation>
                <HotMusic></HotMusic>
            </div>
        );
    }
}

export default Recommend;