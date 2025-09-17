// 1. Arrow Function + Template Literals
const greetUser = (name, age) => {
  // Using template literals to embed variables in string
  return `Hello ${name}, you are ${age} years old!`;
};

console.log(greetUser("Vidya", 25)); 
// Output: Hello Vidya, you are 25 years old!



// 2. Default Parameters + Destructuring
const createUser = ({ name = "Anonymous", isActive = true } = {}) => {
  // Using object destructuring and default values
  return {
    name,
    isActive,
    createdAt: new Date() // Adds current date
  };
};

console.log(createUser({ name: "Navya" }));
/* Output:
{
  name: 'Navya',
  isActive: true,
  createdAt: 2025-09-17T...
}
*/



//  Rest Parameters

//rest operator is when we dont know how many parameters that the function is going to accept and we want to capture them all
const sumNumbers = (...numbers) => {
  // Using rest parameter to accept variable number of arguments
  return numbers.reduce((total, num) => total + num, 0);
};





//spread operators

const numsArray = [10, 20, 30];
console.log(sumNumbers(...numsArray)); 

// Spread operator is used to spread the elements of an iterable like array or object,using spread operator we can 
// 1.copy elements of array or objects
const nums=[1,2,3,4,5];
const copiedArray=[...nums];
console.log(copiedArray); //same as nums

//2.We can combine elements of an array or object
const nums1=[1,2,3,4,5];
const nums2=[6,7,8,9,10];

const nums3=[...nums1,nums2];
console.log(nums3);