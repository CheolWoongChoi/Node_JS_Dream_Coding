// import
const path = require("path");
const fs = require("fs");
const fsPromises = fs.promises;

// args
const folder = process.argv[2];
const workingDir = path.join(__dirname, folder);

// check
if (!folder || !fs.existsSync(workingDir)) {
  console.log("ERR: 폴더 이름을 arg로 넘겨주세요!");
  return;
}

// mkdir
const videoDir = path.join(__dirname, folder, "video");
const capturedDir = path.join(__dirname, folder, "captured");
const duplicatedDir = path.join(__dirname, folder, "duplicated");

!fs.existsSync(videoDir) && fs.mkdirSync(videoDir);
!fs.existsSync(capturedDir) && fs.mkdirSync(capturedDir);
!fs.existsSync(duplicatedDir) && fs.mkdirSync(duplicatedDir);

// logic
fsPromises.readdir(workingDir).then(processFiles);

// funcs
function processFiles(files) {
  {
    files.forEach((file) => {
      if (isVideoFile(file)) {
        move(file, videoDir);
      } else if (isCapturedFile(file)) {
        move(file, capturedDir);
      } else if (isDuplicatedFile(files, file)) {
        move(file, duplicatedDir);
      }
    });
  }
}

function isVideoFile(file) {
  const regExp = /(mp4|mov)$/gm;
  const match = file.match(regExp);
  return !!match;
}

function isCapturedFile(file) {
  const regExp = /(png|aae)$/gm;
  const match = file.match(regExp);
  return !!match;
}

function isDuplicatedFile(files, file) {
  if (!file.startsWith("IMG_") || file.startsWith("IMG_E")) {
    return false;
  }

  const edited = `IMG_E${file.split("_")[1]}`;
  const found = files.find((f) => f.includes(edited));
  return !!found;
}

function move(file, targetDir) {
  console.info(`move ${file} to ${targetDir}`);

  const oldPath = path.join(workingDir, file);
  const newPath = path.join(targetDir, file);

  fs.promises.rename(oldPath, newPath).catch(console.error);
}
