const db = require('../database')

exports.all = async () => {
    const { rows } = await db.getPool().query("select * from authors order by id")
    return db.camelize(rows)
}

// add check that there really is a row to return
exports.get = async (id) => {
    const { rows } = await db.getPool().query("select * from authors where id = $1", [id])
    return db.camelize(rows)[0]
}

exports.add = async (author) => {
    return await db.getPool().query("insert into authors (first_name, last_name) values ($1, $2) returning *", [author.firstName, author.lastName])
}

exports.update = async (author) => {
    return await db.getPool().query("update authors set first_name = $1, last_name = $2 where id = $3 returning *", [author.firstName, author.lastName, author.id])
}

exports.upsert = async (author) => {
    if (author.id) {
        exports.update(author)
    } else {
        exports.add(author)
    }
}

// old methods for authors stored in the model

// const authors = [
//     {firstName: 'Suzanne', lastName: 'Clarke'}, 
//     {firstName: 'Robin', lastName: 'Hobb'},
//     {firstName: 'J.R.R.', lastName: 'Tolkien'},
//     {firstName: 'Gregory', lastName: 'Maguire'}
// ]

// exports.all = authors

// exports.update = (author) => {
//     authors[author.id] = author
// }

// exports.add = (author) => {
//     authors.push(author)
// }

// exports.get = (i) => {
//     return authors[i]
// }

// exports.upsert = (author) => {
//     if (author.id) {
//         exports.update(author)
//     } else {
//         exports.add(author)
//     }
// }