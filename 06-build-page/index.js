const fs = require('fs/promises');
const fsOld = require('fs');
const path = require('path');

async function copyFiles (dircopyName, initDir) {
    const dirPath = path.join(__dirname, initDir);
    const dirCopyPath = path.join(__dirname, dircopyName);
    
    await fs.rm(dirCopyPath, { recursive: true, force: true }); 
    
    await fs.mkdir(dirCopyPath, { recursive: true });

    const files = await fs.readdir(dirPath);

    for (let file of files) {
        await fs.copyFile(`${dirPath}/${file}`, `${dirCopyPath}/${file}`);
    }
}

async function mergeStyles () {
    const srcPath = path.join(__dirname, 'styles');
    const distPath = path.join(__dirname, 'project-dist');
    
    const files = await fs.readdir(srcPath);
    const writeStream = fsOld.createWriteStream(`${distPath}/style.css`);

    for (let file of files) {
        if (file.split('.')[1] === 'css') {
            const readStream = fsOld.createReadStream(`${srcPath}/${file}`);
            
            readStream.pipe(writeStream, { end: false });
      
            await new Promise(res => readStream.on('end', res));
        }
    };

    writeStream.end();
}

async function createHTML() {
    const srcPath = path.join(__dirname, 'template.html');
    const distPath = path.join(__dirname, 'project-dist');
    const templatesPath = path.join(__dirname, 'components');

    const files = await fs.readdir(templatesPath);
    
    let templates = {};

    for (let file of files) {
        const templateName = `{{${file.split('.')[0]}}}`;

        const data = await fs.readFile(`${templatesPath}/${file}`);

        templates[templateName] = data;
    }

    let page = await fs.readFile(srcPath, 'utf-8');

    for (let key in templates) {
        page = page.replace(key, templates[key]);
    }

    page = page.replace(/\n\s*\n/g, '\n');

    await fs.writeFile(`${distPath}/index.html`, page);
}

async function buildPage () {
    await copyFiles('project-dist/assets/fonts', 'assets/fonts');
    await copyFiles('project-dist/assets/img', 'assets/img');
    await copyFiles('project-dist/assets/svg', 'assets/svg');
    await mergeStyles();
    await createHTML();
}

buildPage();