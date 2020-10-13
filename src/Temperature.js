import React, { Component } from 'react';
import { unitsImperial, unitsMetric} from './Weather'
class Temperature extends Component {
    constructor(props) {
        super(props)
    }
    handleUnit(unit) {
        return unit === unitsImperial ? "°F" : "°C"
    }
    render() {
        const { temp, unit, temp_min, temp_max } = this.props
        return (
            <div>
                <div>Temperature: {temp}{this.handleUnit(unit)}</div>
                <div>Low: {temp_min}{this.handleUnit(unit)} High: {temp_max}{this.handleUnit(unit)}</div>
            </div>
        )
    }
}

export default Temperature;