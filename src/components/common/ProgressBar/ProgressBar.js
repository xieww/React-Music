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
        };
        this.muiTheme = getMuiTheme({
			palette: {
				// accent1Color: deepOrange500
			}
		})
    };

    componentDidUpdate() {
		//组件更新后重新获取进度条总宽度
		if (!this.progressBarWidth) {
            this.progressBarWidth = this.state.slider;
            // console.log('this.progressBarWidth' + this.progressBarWidth);
		}
	}

    componentDidMount() {
        // this.progressBarWidth = ReactDOM.findDOMNode(this.refs.progressValue);
        this.progressBarWidth = this.state.slider;
        // console.log('slider',this.state.slider);
    }

    getProgressValue = (event,value) => {
        this.setState({
            slider: value
        });
        // console.log('value',value);
    }
    render() {

        let {progress, onDrag, onDragEnd}  = this.props;
        if (progress !== 0) {
            progress = 0;
        }
        if (this.state.slider) {
            progress = this.state.slider;
        }
        // console.log('this.props',this.props);
        //onDragStart onDragStop
        return (
            <MuiThemeProvider muiTheme={this.muiTheme}>
                <div className="sliders">
                    <Slider 
                        value={this.props.progress} 
                        onChange={this.getProgressValue}
                        onDragStart={this.onDrag}
                        onDragStop={this.onDragEnd}
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