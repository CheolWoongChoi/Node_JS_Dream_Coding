const fs = require("fs");
const path = require("path");

const basename = path.basename(__dirname);

/**
 * 동기적으로 파일 읽고 쓰기
 */
const beforeMem = process.memoryUsage().rss;

fs.readFile(basename + "/long-text.txt", (_, data) => {
  fs.writeFile(basename + "/long-text2.txt", data, () => {});

  // calculate
  const afterMem = process.memoryUsage().rss;
  const diff = afterMem - beforeMem;
  const consumed = diff / 1024 / 1024; // MB

  console.log(diff);
  console.log(`Consumed Memory: ${consumed}MB`);
});
