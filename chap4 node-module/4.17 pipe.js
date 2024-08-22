const fs = require("fs");
const zlib = require("zlib");
const path = require("path");
const basename = path.basename(__dirname);

const readStream = fs.createReadStream(basename + "/long-text.txt");
const zlibStream = zlib.createGzip();
const writeStream = fs.createWriteStream(basename + "/long-text.zip");
const piping = readStream.pipe(zlibStream).pipe(writeStream);

piping.on("finish", () => {
  console.log("done!!");
});

/**
 * http 예제 살짝
 */
const http = require("http");
const server = http.createServer((req, res) => {
  // 동기적으로 파일 읽고 보내주는 건 좋지 않다.
  // fs.readFile(basename + "/long-text.txt", (err, data) => {
  //   res.end(data);
  // });

  // 대안책 : stream
  const stream = fs.createReadStream(basename + "/long-text.txt");
  stream.pipe(res);
});

server.listen(3000);
