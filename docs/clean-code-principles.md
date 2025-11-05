1. Meaningful Names

Description: Use descriptive and self-explanatory names for variables, functions, and classes.
Example:

// Bad
let x = 10;

// Good
let maxLoginAttempts = 10;

// Bad function name
function d() { ... }

// Good function name
function calculateDiscount(price, discountRate) { ... }

2. Single Responsibility Principle (SRP)

Description: Each function or class should have only one responsibility.
Example:

// Bad
function handleUserRequest(user) {
  validateUser(user);
  saveUser(user);
  sendWelcomeEmail(user);
}

// Good
function validateUser(user) { ... }
function saveUser(user) { ... }
function sendWelcomeEmail(user) { ... }

3. Keep Functions Small

Description: Functions should be short, focused, and easy to read.
Example:

// Bad: too long
function processUser(user) {
  // validate
  if (!user.name) throw Error("Invalid user");
  // save
  db.save(user);
  // notify
  email.send(user.email);
}

// Good: broken into smaller functions
function validateUser(user) { ... }
function saveUser(user) { ... }
function notifyUser(user) { ... }

4. Don’t Repeat Yourself (DRY)

Description: Avoid code duplication. Reuse logic through functions or modules.
Example:

// Bad
function areaSquare(side) { return side * side; }
function areaRectangle(width, height) { return width * height; }

// Good
function area(shape, dimensions) { ... }

5. Use Comments Wisely

Description: Write comments to explain “why” not “what”. Avoid obvious comments.
Example:

// Bad
let x = 10; // x is 10

// Good
// Limit login attempts to prevent brute-force attacks
let maxLoginAttempts = 10;

6. Consistent Formatting

Description: Maintain consistent indentation, spacing, and brace style.
Example:

// Consistent
if (isValid) {
  doSomething();
} else {
  handleError();
}

7. Error Handling

Description: Always handle errors gracefully; don’t leave unhandled exceptions.
Example:

try {
  const data = JSON.parse(userInput);
} catch (error) {
  console.error("Invalid JSON", error);
}

8. Avoid Magic Numbers & Strings

Description: Replace literal numbers/strings with constants for clarity and maintainability.
Example:

// Bad
if (userRole === 3) { ... }

// Good
const ADMIN_ROLE = 3;
if (userRole === ADMIN_ROLE) { ... }

9. Readable Conditionals

Description: Keep conditional statements simple and clear.
Example:

// Bad
if (!user.isActive || user.isBanned === true) { ... }

// Good
if (!user.isActive || user.isBanned) { ... }

10. Write Testable Code

Description: Functions should be predictable, independent, and easy to test.
Example:

// Testable function
function calculateTax(price, taxRate) {
  return price * taxRate;
}

11. Prefer Composition Over Inheritance

Description: Use small reusable functions or modules instead of deep inheritance chains.
Example:

// Instead of complex inheritance
class Bird { ... }
class Penguin extends Bird { ... }

// Use composition
const flyBehavior = { fly: () => console.log("Flying") };
const penguin = { swim: () => console.log("Swimming") };

12. Use Meaningful Abstractions

Description: Expose only necessary details; keep modules/classes focused on a single abstraction.
Example:

// Bad: exposes too many internal details
class Database {
  connect() { ... }
  query() { ... }
  close() { ... }
  log() { ... }
}

// Good: clean abstraction
class UserRepository {
  getUserById(id) { ... }
  saveUser(user) { ... }
}
