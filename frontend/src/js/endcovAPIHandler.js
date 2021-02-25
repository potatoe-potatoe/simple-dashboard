

import { URLS } from './constants';

const { baseUrl, cumulativeConfirmedAndActivePage, cumulativeDeathsAndRecoveriesPage } = URLS;

// export const getCumulativeConfirmedAndActiveData = () => {
//     return fetchJsonp(baseUrl + '?' + cumulativeConfirmedAndActivePage, {
//     })
//       .then(response => {
//         if (response.ok) {
//           console.log(response);
//           window.alert(response);
//         }});
// };


export const getTimelineData = () => {
  let dataUrl = 'https://covid19-api-philippines.herokuapp.com/api/timeline';
  return fetch(dataUrl)
    .then(res => res)
    .then(res => {
      return res.json()
    });
}

const getCumulativeDeathsAndRecoveries = () => {};






// fetch('//api.github.com/users/lquixada')
//   .then(res => {
//     if (res.status >= 400) {
//       throw new Error("Bad response from server");
//     }
//     return res.json();
//   })
//   .then(user => {
//     console.log(user);
//   })
//   .catch(err => {
//     console.error(err);
//   });