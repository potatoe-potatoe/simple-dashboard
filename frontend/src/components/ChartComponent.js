import React from 'react';
import { Line } from 'react-chartjs-2';

import { CHART_COLORS } from '../js/constants';
import { getMMMDDString } from '../js/utils';

// Custom ChartJS plugin for dynamic vertical line.
const verticalLinePlugin = {
  id: 'verticalLinePlugin',
  afterDatasetDraw: chart => {
    if (chart.tooltip._active && chart.tooltip._active.length) {
      let activePoint = chart.tooltip._active[0],
          ctx = chart.ctx,
          tooltipX = activePoint.tooltipPosition().x,
          topY = chart.scales['y-axis-0'].top,
          bottomY = chart.scales['y-axis-0'].bottom;

      // Set line config.
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#777';

      // Draw the line.
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(tooltipX, topY);
      ctx.lineTo(tooltipX, bottomY);
      ctx.stroke();
      ctx.restore();
    }
  }
};

const Chart = (props) => {
  let chartData = props.data;

  // ----- Data processing
  // TODO: Look at using PropTypes for checking props.
  let chartDataLength = Array.isArray(chartData) ? chartData.length : 0;
  let dates = [],
      dataCases = [],
      dataRecovered = [],
      dataDied = [];

  const IDX_FIRST = 0;
  if (chartDataLength) {
    dates = [ getMMMDDString(chartData[IDX_FIRST].date) ];
    dataCases = [ chartData[IDX_FIRST].cases ];
    dataRecovered = [ chartData[IDX_FIRST].recovered ];
    dataDied = [ chartData[IDX_FIRST].died ];
  }

  for (var i = 1; i < chartDataLength; i++) {
    let dailyData = chartData[i];
    dates.push(getMMMDDString(dailyData.date))
    dataCases.push(dataCases[i-1] + dailyData.cases);
    dataRecovered.push(dataRecovered[i-1] + dailyData.recovered);
    dataDied.push(dataDied[i-1] + dailyData.died);
  }

  // ----- Chart options/set-up
  const options = {
    legend: {
      align: 'end'  
    },
    tooltips: {
      mode: 'index',
      intersect: false
    }
  };

  const commonDatasetOpts = {
    fill: true,
    borderWidth: 5,
    pointRadius: 0
  };

  let displayData = {
    labels: dates,
    datasets: [
      {
        label: 'Confirmed',
        data: dataCases,
        borderColor: CHART_COLORS.BLUE.REGULAR,
        backgroundColor: CHART_COLORS.BLUE.ALPHA,
        ... commonDatasetOpts
      },
      {
        label: 'Recovered',
        data: dataRecovered,
        borderColor: CHART_COLORS.GREEN.REGULAR,
        backgroundColor: CHART_COLORS.GREEN.ALPHA,
        ... commonDatasetOpts
      },
      {
        label: 'Deceased',
        data: dataDied,
        borderColor: CHART_COLORS.RED.REGULAR,
        backgroundColor: CHART_COLORS.RED.ALPHA,
        ... commonDatasetOpts
      }
    ]
  };

  // ----- Render
  return (
    <div className="card mt-3">
      <div className="card-header text-center font-weight-bold">
        Cumulative Data Overview
      </div>

      <div className="card-body">
        <Line data={displayData} options={options} plugins={[verticalLinePlugin]} />
      </div>
    </div>
  );
}

export default Chart;
