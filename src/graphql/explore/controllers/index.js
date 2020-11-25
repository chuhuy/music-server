const chartController = require('./chart');
const genreController = require('./genre');
const latestAlbumsController = require('./latestAlbums');
const latestSongsController = require('./latestSongs');
const songsByGenreController = require('./songsByGenre');
const top100Controller = require('./top100');
const albumsByGenreController = require('./albumsByGenre');
const songsByAlbumController = require('./songsByAlbum');
const searchBySongController = require('./searchBySong');
const searchByArtistController = require('./searchByArtist');
const searchByAlbumController = require('./searchByAlbum');
const getCommentController = require('./getComments');


const root = {
    chart: chartController,
    genres: genreController,
    latestSongs: latestSongsController,
    songsByGenre: songsByGenreController,
    top100: top100Controller,
    latestAlbums: latestAlbumsController,
    albumsByGenre: albumsByGenreController,
    songsByAlbum: songsByAlbumController,
    searchBySong: searchBySongController,
    searchByArtist: searchByArtistController,
    searchByAlbum: searchByAlbumController,
    getComments: getCommentController
};

module.exports = root;
