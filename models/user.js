const users = [{
    email:"h@user.com",
    name:"v",
    salt:"c5b35da881cff9d48708c7f8995494fe",
    encryptedPassword:"7d2c5f05f1d5455fe7b9dab1e768e7d273e1a2a96bd740fb7fe5661b34adb268"
}]

var crypto = require('crypto')

const createSalt = () => {
    return crypto.randomBytes(16).toString('hex')
}

const encryptPassword = (password, salt) => {
    return crypto.pbkdf2Sync(password, salt, 310000, 32, 'sha256').toString('hex')
}

exports.register = (user) => {
    let salt = createSalt()
    let new_user = {
        email: user.email,
        name: user.name,
        salt: salt,
        encryptedPassword: encryptPassword(user.password, salt)
    }
    console.log(JSON.stringify(new_user))
    users.push(new_user)
}

exports.getByEmail = (email) => {
    return users.find((user) => user.email === email)
}

// exports.register = (user) => {
//     if (exports.getByEmail(user.email)) {
//         return false
//     }
//     users.push(user)
// }

exports.login = (login) => {
    let user = exports.getByEmail(login.email)
    if (!user) {
        return null
    }
    let encryptedPassword = encryptPassword(login.password, user.salt)
    if (user.encryptedPassword === encryptedPassword) {
        return user
    }
    return null
}

exports.get = (i) => {
    return users[i];
}

exports.all = users