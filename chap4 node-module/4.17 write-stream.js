const fs = require("fs");
const path = require("path");

const basename = path.basename(__dirname);
const writeStream = fs.createWriteStream(basename + "/file3.txt");

writeStream.on("finish", () => {
  console.log("finished!");
});
writeStream.write("hello!!");
writeStream.write("world!!");
writeStream.end();
