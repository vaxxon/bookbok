const books = [
    {title: 'Piranesi', publishingYear: 2020},
    {title: 'Ship of Magic', publishingYear: 1998},
    {title: 'The Lord of the Rings', publishingYear: 1954},
    {title: 'Wicked', publishingYear: 1995}
]

exports.all = books

exports.add = (book) => {
    books.push(book)
} 