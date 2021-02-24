import React from 'react';

import Summary from './SummaryComponent';
import Chart from './ChartComponent';

const Main = () => {
  return (
    <div className="container py-5">
      <Summary />
      <Chart />
    </div>
  );
};

export default Main;
