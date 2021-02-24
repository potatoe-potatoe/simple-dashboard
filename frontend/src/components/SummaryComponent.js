import React from 'react';

const dummyData = {
  "active": 30970,
  "confirmed": 566420,
  "recovered": 523321,
  "deceased": 12129
};

const CardItem = ({statLabel, statNum, faIconClass}) => {
  const iconClasses = ['fa', faIconClass, 'fa-lg'];
  return (
    <div className="col-4">
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-8">
              {statNum.toLocaleString()}
            </div>

            <div className="col text-right">
              <i className={iconClasses.join(' ')} />
            </div>
          </div>
        </div>

        <div className="card-footer small text-muted py-2">
          {statLabel.toUpperCase()}
        </div>
      </div>
    </div>
  );
};

const Summary = () => {
  return (
    <React.Fragment>
      <div className="row justify-content-center">
        <CardItem statLabel="confirmed"
                  statNum={dummyData.confirmed}
                  faIconClass="fa-user-plus"
                  />

        <CardItem statLabel="recovered"
                  statNum={dummyData.recovered}
                  faIconClass="fa-medkit"
                  />

        <CardItem statLabel="deceased"
                  statNum={dummyData.deceased}
                  faIconClass="fa-user-times"
                  />
      </div>

      <div className="card mt-3">
        <div className="card-body py-2">
          <span>
            ACTIVE CASES
          </span>

          <span className="float-right">
            {dummyData.active}
          </span>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Summary;
