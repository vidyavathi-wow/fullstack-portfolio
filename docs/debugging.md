DEBUGGING DOCUMNETATION

1.JAVASCRIPT DEBUGGING

a. Using console

The simplest and most common debugging technique.


console.log(variable);        // Logs variable value
console.error("Error msg");   // Logs errors in red
console.warn("Warning msg");  // Logs warning
console.table(arrayOrObj);    // Nicely formats arrays/objects
console.time("label");        // Start timer
console.timeEnd("label");     // End timer and print duration


Place console.log() at points where you want to check values.

Use console.table() to debug arrays of objects.

Remove or comment logs in production code.


b. Using debugger keyword

Pauses execution at a specific line.

function testDebug(value) {
  debugger;  // Execution stops here
  console.log(value);
}

Works in combination with browser developer tools.

Use to inspect variables, call stack, and scope at runtime.





c. Browser Developer Tools

All modern browsers (Chrome, Firefox, Edge) have DevTools.

Access: Right-click → Inspect → Console / Sources

Key Features:

Console: Log output, run JS commands.

Sources Tab: Set breakpoints, step through code line by line.

Watch/Scope: Inspect variables, closures, and scope.

Network Tab: Monitor API requests/responses.

Call Stack: See function execution order.

Breakpoints Types:

Line-of-code breakpoint: Pause on a specific line.

Conditional breakpoint: Pause only if a condition is true.

XHR/fetch breakpoint: Pause when a network request happens.


d. Error Handling

Use try/catch to handle exceptions.

try {
  riskyFunction();
} catch (err) {
  console.error("Something went wrong:", err);
}


e. Debugging Async Code

Use async/await with try/catch.

Inspect Promises in DevTools.

console.log() inside .then() or await statements.

async function fetchData() {
  try {
    const res = await fetch("https://api.example.com/data");
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}


2.HTML DEBUGGING

a. Inspect Element

Right-click → Inspect Element.

Check the DOM structure, attributes, and hierarchy.

b. Validate HTML

Use W3C HTML Validator
 to catch structural issues.

c. Dynamic Updates

Use DevTools Console to manually manipulate the DOM:

document.querySelector("#myElement").innerText = "Debug test";


3.CSS DEBUGGING

a. Inspect Styles

DevTools → Elements → Styles

Check which CSS rules are applied or overridden.

Toggle properties on/off to see effect in real-time.

b. Box Model Inspection

Use DevTools → Computed → Box Model to see padding, margin, border sizes.

c. Highlighting Problems

Temporarily apply outline: 1px solid red; to debug layout issues.

Use background-color temporarily to see invisible elements.

d. Common CSS Pitfalls

Specificity issues → check if another selector is overriding yours.

Missing units → e.g., width: 100 instead of 100px.

Flex/Grid mistakes → use display: flex; outline: 1px solid to debug alignment.


4.NETWORK / API DEBUGGING

Use Network tab in DevTools:

Inspect API requests & responses.

Check status codes (200, 404, 500…).

Examine request headers and payload.

Use console.log(response) to debug data inside JS.