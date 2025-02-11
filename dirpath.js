/// @DirPath : dirpath.js

const app = require('./app.js');

const fs = require('fs');
const path = require('path');

const componentsPath = path.join(__dirname, 'components'); // @path : components
const componentFiles = fs.readdirSync(componentsPath).filter(file => file.endsWith('.js'));

for (const file of componentFiles) {
    const filePath = path.join(componentsPath, file);
    delete require.cache[require.resolve(filePath)];

    const component = require(filePath);
    console.log(`(js) Loaded component file: ${file}` .yellow);
}

const mysqlPath = path.join(__dirname, 'mysql'); // @path : mysql
const mysqlFiles = fs.readdirSync(mysqlPath).filter(file => file.endsWith('.js'));

for (const file of mysqlFiles) {
    const filePath = path.join(mysqlPath, file);
    delete require.cache[require.resolve(filePath)];

    const queryModule = require(filePath);
    console.log(`(js) Loaded MySQL query file: ${file}` .yellow);
}

const sampQueryPath = path.join(__dirname, 'samp-query'); // @path : samp-query
const sampQueryFiles = fs.readdirSync(sampQueryPath).filter(file => file.endsWith('.js'));

for (const file of sampQueryFiles) {
    const filePath = path.join(sampQueryPath, file);
    delete require.cache[require.resolve(filePath)];

    const component = require(filePath);
    console.log(`(js) Loaded samp-query file: ${file}` .yellow);
}

module.exports = async function loadDirPath() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 2000);
    });
};
