const path = require("path");
const fs = require("fs");
const fsPromises = fs.promises;
const args = process.argv.slice(2);

if (!args[0]) {
  console.log("ERR: 폴더 이름을 arg로 넘겨주세요!");
  return;
}

const dir = args[0];
const targetDir = __dirname + "/" + dir;

console.log("Processing in " + targetDir + "...");

fsPromises.readdir(targetDir).then((filenames) => {
  filenames.forEach((filename) => {
    const ext = path.extname(filename);

    // video
    if (ext.match(/\.mp4|\.mov/)) {
      if (!fs.existsSync(targetDir + "/video")) {
        fs.mkdirSync(targetDir + "/video");
      }

      fsPromises
        .rename(`${targetDir}/${filename}`, `${targetDir}/video/${filename}`)
        .then(() => {
          console.log(`move ${filename} to video`);
        })
        .catch((e) => {
          console.log(e);
          console.log(`ERR: fail - move ${filename} to video`);
        });
    }

    // captured
    if (ext.match(/\.png|\.aae/)) {
      if (!fs.existsSync(targetDir + "/captured")) {
        fs.mkdirSync(targetDir + "/captured");
      }

      fsPromises
        .rename(`${targetDir}/${filename}`, `${targetDir}/captured/${filename}`)
        .then(() => {
          console.log(`move ${filename} to captured`);
        })
        .catch(() => {
          console.log(`ERR: fail - move ${filename} to captured`);
        });
    }

    // // duplicated
    if (filename.startsWith("IMG_E")) {
      const originFilename = filename.replace("E", "");

      if (filenames.includes(originFilename)) {
        if (!fs.existsSync(targetDir + "/duplicated")) {
          fs.mkdirSync(targetDir + "/duplicated");
        }

        fsPromises
          .rename(
            `${targetDir}/${originFilename}`,
            `${targetDir}/duplicated/${originFilename}`
          )
          .then(() => {
            console.log(`move ${originFilename} to duplicated`);
          })
          .catch(() => {
            console.log(`ERR: fail - move ${originFilename} to duplicated`);
          });
      }
    }
  });
});
