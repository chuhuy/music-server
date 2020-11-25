const { buildSchema } = require('graphql');
const enums = require('./enum');
const songSchema = require('./song');
const artistSchema = require('./artist');
const genreSchema = require('./genre');
const albumSchema = require('./album');

const schema = buildSchema(`
    type Query {
        chart(area: Area): [Song]
        genres: [Genre]
        latestSongs(first: Int offset: Int): [Song]
        songsByGenre(first: Int offset: Int genre_id: Int): [Song]
        albumsByGenre(first: Int offset: Int genre_id: Int): [Album]
        top100(genre_id: Int): [Song]
        latestAlbums(first: Int offset: Int): [Album]
        songsByAlbum(album_id: Int): [Song]
        searchBySong(first: Int offset: Int keyword: String): [Song]
        searchByArtist(first: Int offset: Int keyword: String): [Artist]
    }
`.concat(
    enums,
    songSchema,
    artistSchema,
    genreSchema,
    albumSchema
));

module.exports = schema;
