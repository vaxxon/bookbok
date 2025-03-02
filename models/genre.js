const genres = ["fantasy", "sci-fi", "historical fiction", "nonfiction"]

exports.all = genres

exports.upsert = (genre) => {
    if(genre.id) {
        exports.update(genre)
    } else {
        exports.add(genre)
    }
}

exports.update = (genre) => {
    genres[genre.id] = genre
}

exports.add = (genre) => {
    genres.push(genre)
}

exports.get = (i) => {
    return genres[i]
}