const name = "Vidya";
const age = 24;

// Using template literal to embed variables
const message = `Hello, my name is ${name} and I am ${age} years old.`;



console.log(message);
// Output: Hello, my name is Vidya and I am 25 years old.

const user = { name: "Vidya", isActive: true };

const statusMessage = `${user.name} is ${user.isActive ? "active" : "inactive"}.`;

console.log(statusMessage); // Vidya is active.

