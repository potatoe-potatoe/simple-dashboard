const DEFAULT_ALPHA = 0.2;

module.exports = {
  CHART_COLORS: {
    BLUE: {
      REGULAR: 'rgb(2, 117, 216)',
      ALPHA: `rgba(2, 117, 216, ${DEFAULT_ALPHA})`
    },
    GREEN: {
      REGULAR: 'rgb(92, 184, 92)',
      ALPHA: `rgba(92, 184, 92, ${DEFAULT_ALPHA})`
    },
    RED: {
      REGULAR: 'rgb(217, 83, 79)',
      ALPHA: `rgba(217, 83, 79, ${DEFAULT_ALPHA})`
    }, 
  },
  DATA_URL: 'https://covid19-api-philippines.herokuapp.com/api/timeline'
};
