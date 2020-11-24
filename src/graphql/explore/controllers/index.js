const chartController = require('./chart');
const genreController = require('./genre');
const latestSongsController = require('./latestSongs');
const songsByGenreController = require('./songsByGenre');

const root = {
    chart: chartController,
    genre: genreController,
    latestSongs: latestSongsController,
    songsByGenre: songsByGenreController
};

module.exports = root;
