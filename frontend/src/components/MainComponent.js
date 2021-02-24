import React from 'react';

import Summary from './SummaryComponent';
import Chart from './ChartComponent';

const Main = () => {
  return (
    <div className="container">
      <Summary />
      <Chart />
    </div>
  );
};

export default Main;
