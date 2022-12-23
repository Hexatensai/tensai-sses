import './animation.css';
import React from 'react';

const { Component, Children, PropTypes } = React

class SplitText extends Component {
  render(){
    return(
      <span aria-label={this.props.copy} role={this.props.role}>
          {this.props.copy.split("").map(function(char, index){
            let style = {animationDelay: (0.5 + index / 10) + "s"} 
            return <span
              aria-hidden="true"
              key={index}
              style={style}>
              {char}
            </span>;
          })}
        </span>
    );
  }
}
export class Welcome extends Component {
  static displayName = Welcome.name;
  render() {
    return(
      <h2 className='col-md-9 page-outer welcome-text'>
        <SplitText copy="Welcome to Tensai Release" role="heading" />
      </h2>
    );
  }
}
