import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';//v4 as uuid

import { existsSync } from 'fs';
import { promises as fsPromises } from 'fs';
import path, { join } from 'path';
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    console.log(logItem);
    try{
        if(!existsSync(join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(join(__dirname, '..', 'logs'));
        } 
        await fsPromises.appendFile(join(__dirname, '..', 'logs', logName), logItem);
    } catch(err) {
        console.log(err);
    }
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt')
    console.log(`${req.method} ${req.path}`);
    next();
}

export  {logger, logEvents};