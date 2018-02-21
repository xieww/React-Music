import React, { Component } from "react";
import Slider from 'material-ui/Slider';
import ReactDOM from "react-dom"

import {MuiThemeProvider, getMuiTheme} from 'material-ui/styles';
import {deepOrange500} from 'material-ui/styles/colors';
import "./ProgressBar.less";

// const min = 0;
// const max = Math.pow(10, 6);
// const power = 12;

// function transform(value) {
//   return Math.round((Math.exp(power * value / max) - 1) / (Math.exp(power) - 1) * max);
// }

// function reverse(value) {
//   return (1 / power) * Math.log(((Math.exp(power) - 1) * value / max) + 1) * max;
// }

class ProgressBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
          show: false,
          slider: 0,
          dragLen: 0
        };
        this.muiTheme = getMuiTheme({
			palette: {
				// accent1Color: deepOrange500
			}
        })
    };

    componentDidUpdate() {

	}

    componentDidMount() {

    };
    componentWillReceiveProps(nextProps){
        
        let progress = nextProps.progress ;
        if (!progress) {
            progress = 0;
        } 
        
        this.setState({
            slider: progress,
        });

        // console.log('更新' ,nextProps, this.state.slider);
    }
    

    /**
     * @author xieww
     * @description 设置进度条长度
     * @param {*} event 
     * @param {*} value 
     */
    getProgressValue = (event,value) => {
        this.setState({
            slider: value,
            dragLen: value
        });
        // console.log('进度值' + value,this.state.dragLen);
    };
    
    /**
     * 
     * @param {*} event 
     * @param {*} progress 
     */
    startDragging(event,value){
        // console.log('开始拖拽',event,value);
        // this.props.onDrag(progress);
    };

    endDragging() {
        // this.props.onDragEnd();
    }

    render() {
        // console.log('进度props',this.props);
        return (
            <MuiThemeProvider muiTheme={this.muiTheme}>
                <div className="sliders">
                    <Slider 
                        value={this.state.slider} 
                        onChange={this.getProgressValue}
                        onDragStart={e => this.startDragging(e,this.state.slider)}
                        onDragStop={this.endDragging()}
                    />
                    {/* <p>
                    <span>{'The value of this slider is: '}</span>
                    <span>{this.state.slider}</span>
                    </p> */}
                </div>
            </MuiThemeProvider>
        );
    }
}

export default ProgressBar;