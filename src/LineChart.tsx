import React from 'react';

const LineChart = ({id}: LineChartPropsType) => {
    return (
        <div id={id} style={{ width: "100%", height: "70vh" }}>
        </div>
    );
};

export default LineChart;

type LineChartPropsType = {
    id: string
}