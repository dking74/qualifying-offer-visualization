export const convertMoneyToNumber = (moneyString) =>
  Number(moneyString.replace(/[^0-9.-]+/g,""));

export const isValidMoneyString = (moneyString) =>
  moneyString.search(/^\$?[\d,]+(\.\d*)?$/) >= 0;

export const moneyFormatter = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});