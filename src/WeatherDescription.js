import React, { Component } from 'react';

class WeatherDescription extends Component {
    constructor(props) {
        super(props) //this is called automatically if u dont have a contructor...
    }
    render() {
        return (
            <div>
                <div>Title: {this.props.main}</div>
                <div>Desc: {this.props.description}</div>
                <div>Icon: {this.props.icon}</div>
            </div>
        )
    }
}

export default WeatherDescription;