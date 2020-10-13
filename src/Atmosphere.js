import React from 'react';
function Atmosphere(props) {
    return (
        <div>
            <div>Pressure: {props.pressure}</div>
            <div>Humidity: {props.humidity}</div>
        </div>
    )
}
export default Atmosphere;