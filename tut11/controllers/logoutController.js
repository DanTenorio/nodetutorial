import path from 'path';
import userModel from '../model/users.json' assert { type: "json" };
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const userDB = {
    users: userModel,
    setUsers: function (data) { this.users = data }
}
import {promises as fsPromises} from 'fs';

const handleLogout = async (req, res) => {
    //On Client, also delete access token
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(204); // No content
    const refreshToken = cookies.jwt;

    // Is refresh token in db
    const foundUser = userDB.users.find(person => person.refreshToken === refreshToken);
    if(!foundUser) {
        //Clear cookie
        res.clearCookie('jwt', {httpOnly: true})
        return res.sendStatus(204);
    }
    //Reaching this point found samerefresh token in db so delete it from db
    const otherUsers = userDB.users.filter(person => person.refreshToken !== foundUser.refreshToken);
    const currentUser = {...foundUser, refreshToken: ''};
    userDB.setUsers([...otherUsers, currentUser]);
    await fsPromises.writeFile(
        path.join(__dirname, '..', 'model', 'users.json'),
        JSON.stringify(userDB.users)
    );

    res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true}); //In prod when set and delete cookie secure: true - only serves on https
    res.sendStatus(204);
}

export { handleLogout }