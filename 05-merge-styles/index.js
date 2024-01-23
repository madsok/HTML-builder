const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, 'styles');
const distPath = path.join(__dirname, 'project-dist');

let data = '';

fs.readdir(srcPath, (err, objects) => {
  objects.forEach((obj) => {
    const readStream = fs.createReadStream(`${srcPath}/${obj}`);
    const writeStream = fs.createWriteStream(`${distPath}/bundle.css`);

    if (obj.split('.')[1] === 'css') {
      readStream.on('data', (chunk) => {
        data += chunk.toString();
      });

      readStream.on('end', () => {
        writeStream.write(data);
      });
    }
  });
});
