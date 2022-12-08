import path from 'path';
import userModel from '../model/users.json' assert { type: "json" };
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const userDB = {
    users: userModel,
    setUser: function (data) { this.users = data }
}
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { promises as fsPromises } from 'fs';//Working with this since we are still working with files
import { join } from 'path';

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });
    const foundUser = userDB.users.find(person => person.username === user);
    if (!foundUser) return res.sendStatus(401);//Unauthorized
    //Evaluate password
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        const roles = Object.values(foundUser.roles);
        // Create JWTs
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": foundUser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' }
        );
        const refreshToken = jwt.sign(
            { 'username': foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        //Saving refresh token w current user
        const otherUsers = userDB.users.filter(person => person.username !== foundUser.username);
        const currentUser = { ...foundUser, refreshToken };
        userDB.setUser([...otherUsers, currentUser]);
        await fsPromises.writeFile(
            join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(userDB.users)
        );
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });//More secure than local storage or cookie available to js r
        //remove secure: true if testing w thunder client
        res.json({ accessToken });
    } else {
        res.sendStatus(401);
    }
}

export { handleLogin }