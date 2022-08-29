let array = [5, 10, 15, 20, 25, 30, 35];
let newArray = array.slice(0, 5);
let newArray2 = array.slice(5);

setTimeout(() => {
  console.log(newArray2);
}, 8000);
