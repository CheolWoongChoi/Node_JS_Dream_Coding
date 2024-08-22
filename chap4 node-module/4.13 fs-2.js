// import
const fs = require("fs").promises;
const path = require("path");
const basename = path.basename(__dirname);

console.log(basename, __dirname);

// reading a file
fs.readFile(basename + "/text.txt", "utf8")
  .then((data) => console.log(data))
  .catch(console.error);

// writing a file
fs.writeFile(basename + "/file.txt", "Hello, Dream Coders! :)") //
  .catch(console.error);

fs.appendFile(basename + "/file.txt", "Yoou, Dream Coders! :)") //
  .catch(console.error);

// copy
fs.copyFile(basename + "/file.txt", basename + "/file2.txt") //
  .catch(console.error);

// folder
fs.mkdir(basename + "/sub-folder") //
  .catch(console.error);

fs.readdir(basename + "/") //
  .then(console.log);
