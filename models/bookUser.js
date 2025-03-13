const bookUsers = [
    {bookId: '0', userEmail: 'h@user.com', status: 'to_read'},
    {bookId: '1', userEmail: 'h@user.com', status: 'reading'},
    {bookId: '2', userEmail: 'h@user.com', status: 'read'}
]

// possible statuses
exports.statuses = [
    'to_read',
    'reading',
    'read'
]

// get a bookUser connection
exports.get = (bookId, userEmail) => {
    return bookUsers.find((bookUser) => {
        return bookUser.bookId == bookId && bookUser.userEmail == userEmail
    })
}

// get all bookUser connections related to a certain user
exports.allForUser = (userEmail) => {
    return bookUsers.filter((bookUser) => {
        return bookUser.userEmail == userEmail
    })
}

// add a new bookUser relationship
exports.add = (bookUser) => {
    bookUsers.push(bookUser)
}

// update an existing bookUser relationship
exports.update = (i, bookUser) => {
    bookUsers[i] = bookUser
}

// we also have upsert? should I deprecate the above? idk
// oh right we need the above to enable this on the form lolllll
exports.upsert = (bookUser) => {
    let i = bookUsers.findIndex((bu) => {
        return bu.bookId == bookUser.bookId && bu.userEmail == bookUser.userEmail
    })
    if (i == -1) {
        exports.add(bookUser)
    } else {
        exports.update(bookUser)
    }
}