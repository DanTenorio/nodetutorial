import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import path from 'path';
import User from '../model/User.js';


const handleLogout = async (req, res) => {
    //On Client, also delete access token
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); // No content
    const refreshToken = cookies.jwt;

    // Is refresh token in db
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        //Clear cookie
        res.clearCookie('jwt', { httpOnly: true })
        return res.sendStatus(204);
    }
    //Reaching this point found samerefresh token in db so delete it from db
    foundUser.refreshToken = '';
    const result = await foundUser.save();
    console.log(result);


    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true }); //In prod when set and delete cookie secure: true - only serves on https
    res.sendStatus(204);
}

export { handleLogout }