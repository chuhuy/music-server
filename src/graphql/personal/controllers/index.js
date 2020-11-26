const commentSongController = require('./commentSong');
const addFavoriteSongController = require('./addFavoriteSong');
const getFavoriteSongController = require('./getFavoriteSong');
const createPlaylistController = require('./createPlaylist');
const getPlaylistController = require('./getPlaylist');

const root = {
    hello: (args, context) => {
        // console.log(args)
        console.log(context.user.name)
        return "hello"
    },
    commentSong: commentSongController,
    addFavoriteSong: addFavoriteSongController,
    getFavoriteSong: getFavoriteSongController,
    createPlaylist: createPlaylistController,
    getPlaylist: getPlaylistController
};

module.exports = root;