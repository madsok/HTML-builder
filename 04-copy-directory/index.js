const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, 'files');
const dirCopyPath = path.join(__dirname, 'files-copy');

fs.rm(dirCopyPath, { recursive: true }, () => {
  fs.mkdir(dirCopyPath, () => {
    fs.readdir(dirPath, (err, objects) => {
      objects.forEach((obj) => {
        fs.copyFile(`${dirPath}/${obj}`, `${dirCopyPath}/${obj}`, () => true);
      });
    });
  });
});
