const authors = [
    {firstName: 'Suzanne', lastName: 'Clarke'}, 
    {firstName: 'Robin', lastName: 'Hobb'},
    {firstName: 'J.R.R.', lastName: 'Tolkien'},
    {firstName: 'Gregory', lastName: 'Maguire'}
]

exports.all = authors

exports.add = (author) => {
    authors.push(author)
}