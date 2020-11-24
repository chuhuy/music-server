const chartController = require('./chart');
const genreController = require('./genre');
const latestSongsController = require('./latestSongs');
const songsByGenreController = require('./songsByGenre');
const top100Controller = require('./top100');

const root = {
    chart: chartController,
    genre: genreController,
    latestSongs: latestSongsController,
    songsByGenre: songsByGenreController,
    top100: top100Controller
};

module.exports = root;
