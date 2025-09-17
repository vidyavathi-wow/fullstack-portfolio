//object destructuring

const user = {
  name: "Vidya",
  age: 25,
  isActive: true
};

// Destructure properties into variables
const { name, age } = user;
console.log(name); // "Vidya"
console.log(age);  // 25

// Rename variables during destructuring
const { name: userName, isActive: status } = user;
console.log(userName); // "Vidya"
console.log(status);   // true

// Default value if property doesn't exist
const { city = "Unknown" } = user;
console.log(city); // "Unknown"


//Array destructuring
const nums=[1,2,3,4,5,6,7];

let [first, second, ...rest] = nums;

console.log(first,second,rest);