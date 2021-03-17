export const getMMMDDString = (dateStr) => {
  const MONTHS = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');
  const IDX_MONTH = 1;
  const IDX_DAY = 2;
  let nums = dateStr.split(/\D/);

  return MONTHS[nums[IDX_MONTH]-1] + ' ' + nums[IDX_DAY];
};
