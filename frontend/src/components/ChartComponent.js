import React from 'react';
import { Line } from '@reactchartjs/react-chart.js';

import { RGB_GREEN, RGB_BLUE, RGB_RED } from '../js/constants';

const options = {
  responsive: true
}

const Chart = (props) => {
  const chartData = props.data;
  const displayData = {
    labels: Array.isArray(chartData) ? chartData.map(dailyData => dailyData.date) : [],
    datasets: [
      {
        label: 'Confirmed',
        data: Array.isArray(chartData) ? chartData.map(dailyData => dailyData.cases) : [],
        fill: false,
        backgroundColor: RGB_BLUE,
        borderColor: RGB_BLUE,
      },
      {
        label: 'Recovered',
        data: Array.isArray(chartData) ? chartData.map(dailyData => dailyData.recovered) : [],
        fill: false,
        backgroundColor: RGB_GREEN,
        borderColor: RGB_GREEN,
      },
      {
        label: 'Deceased',
        data: Array.isArray(chartData) ? chartData.map(dailyData => dailyData.died) : [],
        fill: false,
        backgroundColor: RGB_RED,
        borderColor: RGB_RED,
      }
    ],
  };

  return (
    <div className="card mt-3">
      <div className="card-header text-center font-weight-bold">
        Case Overview Time Series Graph
      </div>
      <div className="card-body row">
        <Line data={displayData} options={options} />
      </div>
    </div>
  );
};

export default Chart;
