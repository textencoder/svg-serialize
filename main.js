const {parse} = require('svgson');
const fs = require('fs');
const path = require('path')

const folderPath = './vectors/';

const entries = fs.readdirSync(folderPath);
//console.log(typeof entries);
//console.log(entries)
//console.log(entries.length);
//return;

fs.appendFile('./db.json', '[', err => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('[ written');
})

fs.readdirSync(folderPath)
.map(fileName => {
    const fullPath = path.join(folderPath + fileName);
    console.log('file name: ', fileName);
    console.log('full path: ', fullPath);
    fs.readFile(fullPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        //console.log(data);
        parse(data)
        .then(json => {
            let vector;
            //const vector = JSON.stringify(json, null, 2) + ",";
            //improve modularity of the below conditional
            if (entries.indexOf(fileName) === 2) {
                vector = JSON.stringify({name: fileName, data: json}, null, 2) + '\n';
            } else {
                vector = JSON.stringify({name: fileName, data: json}, null, 2) + "," + '\n';
            }   
                
            //console.log(`${vector},`);
            //vector = JSON.stringify({name: fileName, data: json}, null, 2);
            fs.appendFile('./db.json', vector, err => {
                if (err) {
                    console.error(err);
                }
                console.log('success!')
            })
        })
    })
})
//setTimeout for final character is a band-aid solution
setTimeout(() => {
    fs.appendFile('./db.json', ']', err => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('] written');
    })
}, 1000)

//occasional unexpected behavior of writing commas