const chartController = require('./chart');
const genreController = require('./genre');
const latestSongsController = require('./latestSongs');

const root = {
    chart: chartController,
    genre: genreController,
    latestSongs: latestSongsController
};

module.exports = root;
