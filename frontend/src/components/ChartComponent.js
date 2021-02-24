import React from 'react';
import { Line } from '@reactchartjs/react-chart.js';

import { RGB_GREEN, RGB_BLUE, RGB_RED } from '../../js/constants';

const data = {
  labels: ["2020-07-13", "2020-07-14", "2020-07-15", "2020-07-16", "2020-07-17", "2020-07-18"],
  datasets: [
    {
      label: 'Confirmed',
      data: ["20371", "20459", "20976", "21440", "21748", "22067"],
      fill: false,
      backgroundColor: RGB_BLUE,
      borderColor: RGB_BLUE,
    },
    {
      label: 'Recovered',
      data: ["2037", "2045", "2097", "2144", "2174", "2206"],
      fill: false,
      backgroundColor: RGB_GREEN,
      borderColor: RGB_GREEN,
    },
    {
      label: 'Deceased',
      data: ["1599", "1603", "1614", "1643", "1660", "1773"],
      fill: false,
      backgroundColor: RGB_RED,
      borderColor: RGB_RED,
    }
  ],
}

const options = {
  responsive: true
  // maintainAspectRatio: false,
  // scales: {
  //   yAxes: [
  //     {
  //       ticks: {
  //         beginAtZero: true,
  //       },
  //     },
  //   ],
  // },
}

const Chart = () => {
  return (
    <div className="card mt-3">
      <div className="card-header text-center">
        Cumulative Summary Chart
      </div>
      <div className="card-body row">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default Chart;
