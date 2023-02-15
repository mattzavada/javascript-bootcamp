// A function that returns a promise which allows other data to be passed into the promise

const getDataPromise = (data) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      //resolve("This is the promise data");
      reject("This is my error message");
    }, 2000);
  });

const myPromise = getDataPromise("data");

myPromise.then(
  (data) => {
    console.log(data);
  },
  (err) => {
    console.log(err);
  }
);
