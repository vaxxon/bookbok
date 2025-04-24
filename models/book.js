const db = require('../database')

exports.all = async () => {
    const { rows } = await db.getPool().query("select * from books order by id")
    return db.camelize(rows)
}

exports.add = async (book) => {
    const { rows } = await db.getPool().query("insert into books (title, publishing_year, genre_id) values ($1, $2, $3) returning *", [book.title, book.publishingYear, book.genreId])
    let newBook = db.camelize(rows)[0]
    await addAuthorsToBook(newBook, book.authorIds)
    return newBook
}

exports.get = async (id) => {
    const { rows } = await db.getPool().query("select * from books where id = $1", [id])
    return db.camelize(rows)[0]
}

exports.update = async (book) => {
    const { rows } = await db.getPool().query("update books set title = $1, publishing_year = $2, genre_id = $3 where id = $4 returning *", [book.title, book.publishingYear, book.genreId, book.id])
    let newBook = db.camelize(rows)[0]
    await deleteAuthorsForBook(newBook)
    await addAuthorsToBook(newBook, book.authorIds)
    return newBook
}

exports.upsert = async (book) => {
    if (book.authorIds && !Array.isArray(book.authorIds)) {
        book.authorIds = [book.authorIds]
    }
    if (book.id) {
        exports.update(book)
    } else {
        exports.add(book)
    }
}

const addAuthorsToBook = async (book, authorIds) => {
    authorIds.forEach(async (authorId) => {
        await db.getPool().query("insert into books_authors (author_id, book_id) values ($1, $2)", [authorId, book.id])
    });
}

const deleteAuthorsForBook = async (book) => {
    db.getPool().query("delete from books_authors where book_id = $1", [book.id])
}