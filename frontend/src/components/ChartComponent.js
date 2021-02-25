import React from 'react';
import { Line } from '@reactchartjs/react-chart.js';

import { RGB_GREEN, RGB_BLUE, RGB_RED } from '../js/constants';

const options = {
  responsive: true,
  maintainAspectRatio: true
}

const Chart = (props) => {
  const { data } = props;
  console.log('this is prop');
  console.log(data);
  const chartData = data.data;
  console.log('hey hey hey');
  console.log(chartData.data);
  console.log(chartData.data ? [] : chartData.map(dailyData => dailyData.date));
  const displayData = {
    labels: Array.isArray(chartData.data) ? chartData.data.map(dailyData => dailyData.date) : [],
    datasets: [
      {
        label: 'Confirmed',
        data: Array.isArray(chartData.data) ? chartData.data.map(dailyData => dailyData.cases) : [],
        fill: false,
        backgroundColor: RGB_BLUE,
        borderColor: RGB_BLUE,
      },
      {
        label: 'Recovered',
        data: Array.isArray(chartData.data) ? chartData.data.map(dailyData => dailyData.recovered) : [],
        fill: false,
        backgroundColor: RGB_GREEN,
        borderColor: RGB_GREEN,
      },
      {
        label: 'Deceased',
        data: Array.isArray(chartData.data) ? chartData.data.map(dailyData => dailyData.died) : [],
        fill: false,
        backgroundColor: RGB_RED,
        borderColor: RGB_RED,
      }
    ],
  };

  console.log("I am here");
  console.log(data);
  return (
    <div className="card mt-3">
      <div className="card-header text-center">
        Cumulative Summary Chart
      </div>
      <div className="card-body row">
        <Line data={displayData} options={options} />
      </div>
    </div>
  );
};

export default Chart;
