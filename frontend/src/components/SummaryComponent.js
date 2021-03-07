import React from 'react';

import { DATA_URL } from '../js/constants';

const CARDS_DATA_LIST = [
  {
    dataName: 'cases',
    statLabel: 'Confirmed',
    faIconClass: 'fa-user-plus',
    bgColorClass: 'bg-primary'
  },
  {
    dataName: 'recovered',
    statLabel: 'Recovered',
    faIconClass: 'fa-medkit',
    bgColorClass: 'bg-success'
  },
  {
    dataName: 'died',
    statLabel: 'Deceased',
    faIconClass: 'fa-user-times',
    bgColorClass: 'bg-danger'
  }
];

const CardItem = ({statLabel, statNum, faIconClass, bgColorClass}) => {
  let iconClasses = ['fa', faIconClass, 'fa-lg'];
  let footerClasses = 'card-footer text-white small py-2 ' + bgColorClass;
  return (
    <div className="col-12 col-md-4 mt-3">
      <div className="card">
        <div className="card-body">
          <div className="row my-auto font-weight-bold h3">
            <div className="col-8 col-md-12 col-lg-8">
              {statNum.toLocaleString()}
            </div>

            <div className="col text-right">
              <i className={iconClasses.join(' ')} />
            </div>
          </div>
        </div>

        <div className={footerClasses}>
          {statLabel.toUpperCase()}
        </div>
      </div>
    </div>
  );
};

const Summary = (props) => {
  let { latestData, latestUpdateDate } = props;

  return (
    <React.Fragment>
      <div className="card">
        <div className="card-header font-weight-bold h3 bg-white">
          {console.log(latestData)}
          OVERVIEW OF CASES {latestData.date ? 'AS OF ' + latestData.date : ''}
        </div>
        <div className="card-footer small text-muted py-2">
          {latestUpdateDate ? 'Last updated on ' + latestUpdateDate + '. ' : ''}
          Data taken from {DATA_URL}.
        </div>
      </div>

      <div className="row justify-content-center">
        {CARDS_DATA_LIST.map(data => {
          return (
            <CardItem key={data.statLabel}
                      statLabel={data.statLabel}
                      statNum={latestData ? latestData[data.dataName] : 0}
                      faIconClass={data.faIconClass}
                      bgColorClass={data.bgColorClass} />
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default Summary;
