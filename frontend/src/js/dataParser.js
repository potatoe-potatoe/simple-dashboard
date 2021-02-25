import { getTimelineData } from './apiHandler';

// Get data from API.
const { data, lastUpdated } = getTimelineData();
console.log(data);

const getDates = () => {
  return data.map(dailyData => dailyData.date);
};

const getConfirmedNumList = () => {
  return data.map(dailyData => dailyData.cases);
};

const getRecoveredNumList = () => {
  return data.map(dailyData => dailyData.recovered);
};

const getDeceasedNumList = () => {
  return data.map(dailyData => dailyData.deaths);
};

export const getAllData = () => {
  return {
    dates: getDates(),
    confirmedNumList: getConfirmedNumList(),
    recoveredNumList: getRecoveredNumList(),
    DeceasedNumList: getDeceasedNumList()
  };
};