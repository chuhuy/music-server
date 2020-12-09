const { buildSchema } = require('graphql');
const albumSchema = require('./album');
const commentSchema = require('./comment');
const songSchema = require('./song');
const playlistSchema = require('./playlist');

const schema = buildSchema(`
    type Query {
        hello: String
        getFavoriteSong(first: Int offset: Int): [Song]
        getFavoriteAlbum(first: Int offset: Int): [Album]
        getPlaylist(first: Int offset: Int): [Playlist]
        getSongByPlaylist(first: Int offset: Int playlist_id: Int): [Song]
        isFavoriteSong(music_id: Int): Boolean
        isFavoriteAlbum(album_id: Int): Boolean
    }

    type Mutation {
        commentSong(music_id: Int content: String): Int
        addFavoriteSong(music_id: Int): Int
        addFavoriteAlbum(album_id: Int): Int
        createPlaylist(playlist_name: String): Int
        addSongToPlaylist(music_id: Int playlist_id: Int): Int
    }
`.concat(
    albumSchema,
    songSchema,
    commentSchema,
    playlistSchema
));

module.exports = schema;
