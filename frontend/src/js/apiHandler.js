export const getTimelineData = () => {
  let dataUrl = 'https://covid19-api-philippines.herokuapp.com/api/timeline';
  return fetch(dataUrl)
    .then(res => res)
    .then(res => res.json())
    .then(res => {
      console.log(res);
      return res;
    })
}
