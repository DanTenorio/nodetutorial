const fsPromises = require('fs').promises;
// const fs = require('fs');
const path = require('path');

const fileOps = async() => {
    try{
        const data = await fsPromises.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8');
        console.log(data);
        await fsPromises.unlink(path.join(__dirname, 'files', 'starter.txt'), data);//Deletes
        await fsPromises.writeFile(path.join(__dirname, 'files', 'promiseWrite.txt'), data);
        await fsPromises.appendFile(path.join(__dirname, 'files', 'promiseWrite.txt'), '\nNice to meet you!');
        await fsPromises.rename(path.join(__dirname, 'files', 'promiseWrite.txt'), path.join(__dirname, 'files', 'promiseComplete.txt'));
        const newData = await fsPromises.readFile(path.join(__dirname, 'files', 'promiseComplete.txt'), 'utf8');
        console.log(newData);
    } catch (err) {
        console.log(err);
    }
}

fileOps();

// fs.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8', (err, data) => {
//     if(err) throw err;
//     console.log(data);
//     console.log("----------------------------------------------------");
// })

// fs.readFile("./files/starter.txt", (err, data) => {
//     if(err) throw err;
//     console.log(data.toString());
//     console.log("----------------------------------------------------");
// })

// fs.readFile("./files/starter.txt", 'utf8', (err, data) => {
//     if(err) throw err;
//     console.log(data);
//     console.log("----------------------------------------------------");
// })

// //Shows that node is async
// console.log('Hello...')

// fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), "Nice to meet you Danny", (err) => {
//     if(err) throw err;
//     console.log("Write complete");
//     console.log("----------------------------------------------------");

//     //Since node is async this prevents write happening after append
//     fs.appendFile(path.join(__dirname, 'files', 'reply.txt'), "\nHow are you?", (err) => {
//         if(err) throw err;
//         console.log("Append complete");
//         console.log("----------------------------------------------------");

//         fs.rename(path.join(__dirname, 'files', 'reply.txt'), path.join(__dirname, 'files', 'replyEdit.txt'), err => {
//             if(err) throw err;
//             console.log("Rename complete");
//             console.log("----------------------------------------------------");
//         })
//     })
// })


// fs.appendFile(path.join(__dirname, 'files', 'reply2.txt'), "How are you?", (err) => {
//     if(err) throw err;
//     console.log("Append complete");
//     console.log("----------------------------------------------------");
// })

//Exit on uncaught errors
process.on('uncaughtException', err => {
    console.log(`There was an uncaught error: ${err}`);
    process.exit(1);
})