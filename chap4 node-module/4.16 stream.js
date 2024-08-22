const fs = require("fs");
const path = require("path");

const basename = path.basename(__dirname);
const data = [];

fs.createReadStream(basename + "/long-text.txt", {
  highWaterMark: 8, // default : 64 Kbytes
  // encoding: "utf-8",
})
  .on("data", (chunk) => {
    // console.log(chunk);
    data.push(chunk);
    console.count("data");
  })
  .on("error", (error) => {
    console.error(error);
  })
  .on("end", () => {
    console.log(data.join(""));
  });
