const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, 'secret-folder');

fs.readdir(dirPath, (err, objects) => {
  objects.forEach((obj) => {
    fs.stat(`${dirPath}/${obj}`, (err, stats) => {
      if (stats.isFile()) {
        const name = obj.split('.')[0];
        const ext = obj.split('.')[1];
        const size = stats.size / 1024 + 'kb';
        console.log(`${name} - ${ext} - ${size}`);
      }
    });
  });
});
