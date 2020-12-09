const commentSongController = require('./commentSong');
const addFavoriteSongController = require('./addFavoriteSong');
const getFavoriteSongController = require('./getFavoriteSong');
const createPlaylistController = require('./createPlaylist');
const getPlaylistController = require('./getPlaylist');
const addFavoriteAlbumController = require('./addFavoriteAlbum');
const getFavoriteAlbumController = require('./getFavoriteAlbum');
const addSongToPlaylistController = require('./addSongToPlaylist');
const getSongByPlaylistController = require('./getSongByPlaylist');
const isFavoriteSongController = require('./isFavoriteSong');
const isFavoriteAlbumController = require('./isFavoriteAlbum');

const root = {
    commentSong: commentSongController,
    addFavoriteSong: addFavoriteSongController,
    getFavoriteSong: getFavoriteSongController,
    createPlaylist: createPlaylistController,
    getPlaylist: getPlaylistController,
    addFavoriteAlbum: addFavoriteAlbumController,
    getFavoriteAlbum: getFavoriteAlbumController,
    addSongToPlaylist: addSongToPlaylistController,
    getSongByPlaylist: getSongByPlaylistController,
    isFavoriteSong: isFavoriteSongController,
    isFavoriteAlbum: isFavoriteAlbumController,
};

module.exports = root;