const db = require('../database')

// const authors = [
//     {firstName: 'Suzanne', lastName: 'Clarke'}, 
//     {firstName: 'Robin', lastName: 'Hobb'},
//     {firstName: 'J.R.R.', lastName: 'Tolkien'},
//     {firstName: 'Gregory', lastName: 'Maguire'}
// ]

// exports.all = authors

exports.all = async() => {
    const { rows } = await db.getPool().query("select * from authors order by id")
    return db.camelize(rows)
}

exports.upsert = (author) => {
    if (author.id) {
        exports.update(author)
    } else {
        exports.add(author)
    }
}

exports.update = (author) => {
    authors[author.id] = author
}

exports.add = (author) => {
    authors.push(author)
}

exports.get = (i) => {
    return authors[i]
}