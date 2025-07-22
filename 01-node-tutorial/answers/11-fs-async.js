const {readFile, writeFile} = require('fs');
console.log('start');
readFile('./content/first.txt', 'utf8', (err, result) => {
    if (err) {
        console.log(err);
        return;
    }  
    const first = result;
    readFile('./content/second.txt', 'utf8', (err, result) => { 
        if (err) {
            console.log(err);
            return;
        }
        const second = result;
        writeFile(
            './temporary/fileA.txt',
            `Here is the result: ${first}, ${second}`,
            {flag: 'a'},
            (err, result) => {
                if (err) {
                    console.log(`Error reading the first file ${err}`);
                    return;
                }
                console.log('done with this task');
        
            }
        );
    }
    );                    
});
console.log('starting the next one');    