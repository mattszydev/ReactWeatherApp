const formatData = (inputList) => {
  /* Create new array of indexes for 1st entry of each day */
  let index = inputList
    .filter(
      (e, i) =>
        !i || e.dt_txt.split(" ")[0] !== inputList[i - 1].dt_txt.split(" ")[0]
    )
    .map((e) =>
      inputList.findIndex(
        (x) => x.dt_txt.split(" ")[0] === e.dt_txt.split(" ")[0]
      )
    );

  //Index array stores values for each index value of each first day entry
  let arr = [];
  let sliced;
  for (let i = 0; i <= index.length - 1; i++) {
    if (i === index.length - 1) {
      sliced = inputList.slice(index[i], inputList.length);
    } else {
      sliced = inputList.slice(index[i], index[i + 1]);
    }
    arr.push(sliced);
  }
  //arr is an array of arrays for each unique day
  return arr;
};

export default formatData;
