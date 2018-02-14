import React, { Component } from "react";

import "./NoResult.less";

class NoResult extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
      return(
          <div className="no-result">
              <div className="no-result-img"></div>
              <p className="no-info">{this.props.info}</p>
          </div>
      );
  }
}

export default NoResult;
