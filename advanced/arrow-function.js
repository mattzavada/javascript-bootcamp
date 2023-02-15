const square = (num) => {
  return num * num;
};

console.log(square(5));

const people = [
  {
    name: "matt",
    age: 42,
  },
  {
    name: "jess",
    age: 39,
  },
  {
    name: "jenny",
    age: 52,
  },
];

const age39 = people.find((person) => person.age === 39);
console.log(age39.name);
