import express, { urlencoded, json, static as expressStatic } from 'express';
const app = express();
import path, { join } from 'path';
import cors from 'cors';
import corsOptions from './config/corsOptions.js';
import { logger } from './middleware/logEvents.js';
import errorHandler from './middleware/errorHandler.js';
import verifyJWT from './middleware/verifyJWT.js';
import cookieParser from 'cookie-parser';
import {fileURLToPath} from 'url';
import rootRouter from './routes/root.js';
import registerRouter from './routes/register.js';
import authRouter from './routes/auth.js';
import employeeRouter from './routes/api/employees.js';
import refreshRouter from './routes/refresh.js';
import logoutRouter from './routes/logout.js';
import credentials from './middleware/credentials.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3500;

//custom middleware logger
app.use(logger);

//Handle options credentials check - before CORS!
//and fetch cookies credentials requirements
app.use(credentials);

//Cross origin resource sharing
app.use(cors(corsOptions));

//Built-in middleware to handle urlencoded data form data
app.use(urlencoded({extended: false}));

//built in middleware for json
app.use(json());

//middleware for cookies
app.use(cookieParser());

//serve static files
app.use(expressStatic(join(__dirname, '/public')));

app.use('/', rootRouter);
app.use('/register', registerRouter);
app.use('/auth', authRouter);
app.use('/refresh', refreshRouter);
app.use('/logout', logoutRouter)
app.use(verifyJWT);
app.use('/employees', employeeRouter);

//app.use('/') Does not use regex, use method mostly used for middle ware
app.all('*', (req, res) => {
    res.status(404);
    if(req.accepts('html')) {
        res.sendFile(join(__dirname,'views','404.html'));
    } else if(req.accepts('json')) {
        res.json({error: '404 Not Found'});
    } else {
        res.type('txt').send('404 Not Found');
    }
})

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))