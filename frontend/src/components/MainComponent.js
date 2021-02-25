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
    return (
      <div className="bg-light">
        <div className="container py-5">
          <Summary />
          <Chart data={this.props.data.data.data} />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
