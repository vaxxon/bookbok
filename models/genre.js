const genres = [
    {genre: "fantasy"}, 
    {genre: "sci-fi"},
    {genre: "historical fiction"},
    {genre: "mystery"},
    {genre: "graphic novel"},
    {genre: "young adult fiction"},
    {genre: "superhero slop"},
    {genre: "nonfiction"}
]

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