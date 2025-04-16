const db = require('../database')

exports.all = async () => {
    const { rows } = await db.getPool().query("select * from genres order by id")
    return db.camelize(rows)
}

exports.get = async (id) => {
    const { rows } = await db.getPool().query("select * from authors where id = $1", [id])
    return db.camelize(rows)[0]
}

exports.add = async (genre) => {
    return await db.getPool().query("insert into genres (name) values ($1) returning *", [genre.name])
}

exports.update = async (genre) => {
    return await db.getPool().query("update genres set name = $1 where id = $2 returning *", [genre.name, genre.id])
}

exports.upsert = async (genre) => {
    if(genre.id) {
        exports.update(genre)
    } else {
        exports.add(genre)
    }
}

// old methods for genres stored in the model

// const genres = [
//   * genres *
// ]

// exports.all = genres

// exports.update = (genre) => {
//     genres[genre.id] = genre
// }

// exports.add = (genre) => {
//     genres.push(genre)
// }

// exports.get = (i) => {
//     return genres[i]
// }

// exports.upsert = (genre) => {
//     if(genre.id) {
//         exports.update(genre)
//     } else {
//         exports.add(genre)
//     }
// }