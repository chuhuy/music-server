const { buildSchema } = require('graphql');
const albumSchema = require('./album');
const commentSchema = require('./comment');
const songSchema = require('./song');
const playlistSchema = require('./playlist');

const schema = buildSchema(`
    type Query {
        hello: String
        getFavoriteSong(first: Int offset: Int): [Song]
        getPlaylist(first: Int offset: Int): [Playlist]
    }

    type Mutation {
        commentSong(music_id: Int content: String): Int
        addFavoriteSong(music_id: Int): Int
        createPlaylist(playlist_name: String): Int
    }
`.concat(
    albumSchema,
    songSchema,
    commentSchema,
    playlistSchema
));

module.exports = schema;
