const comments = [
    {id: '0', bookId: '0', userEmail: 'h@user.com', text: 'Wow what a book. Incredible. Two stars.'},
    {id: '1', bookId: '0', userEmail: 'h@user.com', text: 'Actually nevermind this book sucks. Four stars.' },
    {id: '2', bookId: '0', userEmail: 'h@user.com', text: 'I recommended this book to my dad and he tried to fight me. Five stars.'
    }
]

// generate serial id
function getNextId() {
    return Math.max(...comments.map(c => c.id)) + 1
}

exports.add = (comment) => {
    comment.id = getNextId()
    comments.push(comment)
}

exports.update = (comment) => {
    comments[comment.id] = comment
}

exports.upsert = (comment) => {
    if (comment.id) {
        exports.update(comment)
    } else {
        exports.add(comment)
    }
}

exports.get = (id) => {
    return comments.find((comment) => {
        return comment.id == id
    })
}

exports.allForBook = (bookId) => {
    return comments.filter((comment) => {
        return comment.bookId == bookId
    })
}