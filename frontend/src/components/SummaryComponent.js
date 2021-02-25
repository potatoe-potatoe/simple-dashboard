import React from 'react';

const dummyData = {
  "active": 30970,
  "confirmed": 566420,
  "recovered": 523321,
  "deceased": 12129
};

let cardsDataList = [
  {
    "statLabel": 'CONFIRMED',
    "statNum": dummyData.confirmed,
    "faIconClass": 'fa-user-plus',
    "bgColorClass": 'bg-primary'
  },
  {
    "statLabel": 'RECOVERED',
    "statNum": dummyData.recovered,
    "faIconClass": 'fa-medkit',
    "bgColorClass": 'bg-success'
  },
  {
    "statLabel": 'DECEASED',
    "statNum": dummyData.deceased,
    "faIconClass": 'fa-user-times',
    "bgColorClass": 'bg-danger'
  }
];

const CardItem = ({statLabel, statNum, faIconClass, bgColorClass}) => {
  let iconClasses = ['fa', faIconClass, 'fa-lg'];
  let footerClasses = 'card-footer text-white small py-2 ' + bgColorClass;
  return (
    <div className="col-4">
      <div className="card">
        <div className="card-body">
          <div className="row font-weight-bold h3">
            <div className="col-8">
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

const Summary = () => {
  return (
    <React.Fragment>
      <div className="card mb-3">
        <div className="card-header font-weight-bold h3 bg-white">
            <span>
              ACTIVE CASES AS OF TODAY
            </span>

            <span className="float-right">
              {dummyData.active.toLocaleString()}
            </span>
        </div>
        {/* <div className="card-body py-2 font-weight-bold h3">
          <span>
            ACTIVE CASES
          </span>

          <span className="float-right">
            {dummyData.active}
          </span>
        </div> */}
      </div>

      <div className="row justify-content-center">
        {cardsDataList.map(data => {
          return (
            <CardItem key={data.statLabel}
                      statLabel={data.statLabel}
                      statNum={data.statNum}
                      faIconClass={data.faIconClass}
                      bgColorClass={data.bgColorClass} />
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default Summary;
