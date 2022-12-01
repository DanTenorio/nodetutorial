const fs = require('fs');

const rs = fs.createReadStream("./files/lorem.txt", {encoding: 'utf8'});//Could use path

const ws = fs.createWriteStream("./files/newLorem.txt");



// rs.on('data', (dataChunk) => {
//     ws.write(dataChunk);
// })

rs.pipe(ws);//Same thing but more efficient