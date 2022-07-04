let deyt = document.querySelector(".date");
let m = moment();

let dateTime = (deyt) => {
  setInterval(() => {
    deyt.innerHTML = `${moment().format("dddd MMMM Do YYYY, h:mm:ss a")}`,
      1000;
  });
};
dateTime(deyt);
