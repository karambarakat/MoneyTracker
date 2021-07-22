export const ListNester = (data) => {
  //to debug some errors
  console.log("the whole set of data", data);
  if (JSON.stringify(data) === "[]") {
    return [];
  }

  //make an object which every element is seprate category
  let nestedEntry = {};
  data.forEach((d) => {
    let catName = d.category.title;
    if (!nestedEntry[catName]) {
      nestedEntry[catName] = [];
    }
    nestedEntry[catName].push(d);
  });

  let nestedList = [];
  for (let x in nestedEntry) {
    let total = nestedEntry[x].reduce((t, e) => (t += e.Amount / 1), 0);
    let object = {
      categoryTitle: x,
      ElementsList: nestedEntry[x],
      category: nestedEntry[x][0].category,
      Total: total,
    };
    nestedList.push(object);
  }

  nestedList.sort((a, b) => b.Total - a.Total);

  let grandTotal = nestedList.reduce((t, e) => (t = t + e.Total), 0);
  nestedList.forEach(
    (e) => (e.Percentage = ((e.Total / grandTotal) * 100).toFixed(2))
  );

  return [nestedList, grandTotal];
};

//

export const ListTruncation = (original) => {
  if (original.length <= 5) {
    return original;
  }

  let otherTotal = 0;
  let otherList = [];
  for (let n = 4; n < original.length; n++) {
    otherTotal = otherTotal + original[n].Total;
    original[n].ElementsList.forEach((e) => otherList.push(e));
  }

  let others = {
    categoryTitle: "others",
    ElementsList: otherList,
    category: {
      title: "others",
      color: "grey",
      //iconName: ""
      //id: 22
    },
    Total: otherTotal,
  };

  return [original[0], original[1], original[2], original[3], others];
};
