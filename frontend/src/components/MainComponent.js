import React  from 'react';
import { connect } from 'react-redux';

import Summary from './SummaryComponent';
import Chart from './ChartComponent';

import { fetchData } from '../redux/reducer';

const mapStateToProps = (state) => {
  return {
    data: state.data
  }
};

const mapDispatchToProps = (dispatch) => ({
  fetchData: () => { dispatch(fetchData()) }
});

class Main extends React.Component {
  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    let dataArr = this.props.data.data.data;
    let isArray = Array.isArray(dataArr);
    let latestData = {
      cases: isArray ? dataArr.reduce((sum, dataItem) => sum + parseInt(dataItem.cases), 0) : 0,
      recovered: isArray ? dataArr.reduce((sum, dataItem) => sum + parseInt(dataItem.recovered), 0) : 0,
      died: isArray ? dataArr.reduce((sum, dataItem) => sum + parseInt(dataItem.died), 0) : 0,
      date: isArray ? dataArr[dataArr.length - 1].date : ''
    };

    return (
      <div className="bg-light vh-100"> 
        <div className="container py-4">
          <Summary latestData={latestData}
                   latestUpdateDate={this.props.data.data.last_update} />
          <Chart data={dataArr} />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
