const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'text.txt');

const readline = require('readline');

const writeStream = fs.createWriteStream(filePath);

let rl = readline.createInterface(process.stdin, process.stdout);

rl.setPrompt('Welcome! Type something in console. ');
rl.prompt();

rl.on('line', (text) => {
  if (text === 'exit') {
    console.log('Exiting...');
    rl.close();
  } else {
    console.log(`You have typed '${text}'. Type something else.`);
    writeStream.write(text);
  }
});

rl.on('SIGINT', () => {
  console.log('Exiting...');
  rl.close();
});
