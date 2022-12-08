import userModel from '../model/users.json' assert { type: "json" };
import { promises as fsPromises } from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';

const userDB = {
    users: userModel,
    setUser: function (data) { this.users = data }
}

const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });
    //check for duplicate usernames in the db
    const duplicate = userDB.users.find(person => person.username === user);
    if (duplicate) return res.sendStatus(409); //Conflict
    try {
        //encrypt pwd
        const hashedPwd = await bcrypt.hash(pwd, 10);
        //store the new user
        const newUser = {
            "username": user,
            "roles": { "User": 2001 },
            "password": hashedPwd
        };
        userDB.setUser([...userDB.users, newUser]);
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(userDB.users)
        );
        console.log(userDB.users);
        res.status(201).json({ 'success': `New user ${user} was created!` })
    } catch (err) {
        res.status(500).json({ 'message': err.message })
    }
}

export { handleNewUser };