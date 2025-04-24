const db = require('../database')

// possible statuses
exports.statuses = [
    'to_read',
    'reading',
    'read'
]

// get a bookUser connection
exports.get = async (book, user) => {
    const { rows } = await db.getPool().query("select * from books_users where book_id = $1 and user_id = $2", [book.id, user.id])
    return db.camelize(rows)[0]
}

// get all bookUser connections related to a certain user
exports.allForUser = async (user) => {
    const { rows } = db.getPool().query("select books.title, books_users.status from books_users join books on books.id = books_users.book_id where user_id = $1;", [user.id])
    return db.camelize(rows)
}

// add a new bookUser relationship
exports.add = async (bookUser) => {
    return db.getPool().query("insert into books_users (book_id, user_id, status) values ($1, $2, $3) returning *)", [bookUser.bookId, bookUser.userId, bookUser.status])
}

// update an existing bookUser relationship
exports.update = async (bookUser) => {
    return await db.getPool().query("update books_users set status = $1 where id = $2 returning *", [bookUser.status, bookUser.id])
}

// we also have upsert? should I deprecate the above? idk
// oh right we need the above to enable this on the form lolllll
exports.upsert = (bookUser) => {
    if (bookUser.id) {
        return exports.update(bookUser)
    } else {
        return exports.add(bookUser)
    }
}