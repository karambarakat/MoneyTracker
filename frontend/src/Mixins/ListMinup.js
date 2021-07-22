export const ListNester = (data) => {
  let nested = {};
  data.forEach((d) => {
    d.createdAt = `${d.createdAt}`;
    let onlyDay = new Date(d.createdAt).getDate();
    if (!nested[onlyDay]) {
      nested[onlyDay] = [];
    }
    nested[onlyDay].push(d);
  });
  let NestedList = [];
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  for (let E in nested) {
    let dayname = new Date(E).getUTCDay();
    NestedList.push({
      Date: `${days[dayname]} ${E}`,
      entries: nested[E],
    });
  }
  return NestedList;
};

export const TotalCalculator = (data) => {
  let total = data.reduce((t, a) => {
    return t + parseFloat(a.Amount);
  }, 0);
  return total.toFixed(2);
};
