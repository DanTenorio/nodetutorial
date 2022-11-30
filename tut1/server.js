// Difference between node and regular js
//1. node is on the server
//2. console is terminal window (ctrl + shift + `) to open, (ctrl + c) to close
console.log("Hello World!"); //Can be called in terminal by `node server`
//3. Global object instead of window object
//console.log(global);
//4. Common core modules that relate to OS, file system etc...
//5. Common JS modules instead of ES6 modules
//5. Missing some  JS APIs like fetch

const os = require("os");
const path = require("path");
const math = require("./math")

console.log(os.type());
console.log(os.version());
console.log(os.homedir());
console.log("---------------------------------------------------------------");
console.log(__dirname);
console.log(__filename);
console.log("---------------------------------------------------------------");
console.log(path.dirname(__filename));
console.log(path.basename(__filename));
console.log(path.extname(__filename));
console.log(path.parse(__filename));
console.log("---------------------------------------------------------------");
console.log(math.add(5,7));
console.log(math.sub(5,7));