const { buildSchema } = require('graphql');
const enums = require('./enum');
const songSchema = require('./song');
const artistSchema = require('./artist');
const genreSchema = require('./genre');
const albumSchema = require('./album');
const commentSchema = require('./comment');

const schema = buildSchema(`
    type Query {
        chart(area: Area): [Song]
        genres(first: Int offset: Int): [Genre]
        latestSongs(first: Int offset: Int): [Song]
        songsByGenre(first: Int offset: Int genre_id: Int): [Song]
        albumsByGenre(first: Int offset: Int genre_id: Int): [Album]
        top100(genre_id: Int): [Song]
        latestAlbums(first: Int offset: Int): [Album]
        songsByAlbum(album_id: Int): [Song]
        searchBySong(first: Int offset: Int keyword: String): [Song]
        searchByArtist(first: Int offset: Int keyword: String): [Artist]
        searchByAlbum(first: Int offset: Int keyword: String): [Album]
        getComments(first: Int offset: Int music_id: Int): [Comment]
        getArtistByID(artist_id: Int): Artist
        top100List(first: Int offset: Int): [Genre]
        songsByArtist(artist_id: Int): [Song]
        albumsByArtist(artist_id: Int): [Album]
    }
    type Mutation {
        songCounter(music_id: Int): Int
    }
`.concat(
    enums,
    songSchema,
    artistSchema,
    genreSchema,
    albumSchema,
    commentSchema
));

module.exports = schema;
