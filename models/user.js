const users = [
    {name: 'Suzanne', email: 'user@bookbok.com', password: 'password0'}
]

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