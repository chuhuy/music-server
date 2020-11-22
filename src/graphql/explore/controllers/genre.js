const Explore = require('./../models/explore');

const genreController = (args) => {
    let explore = new Explore();
    return explore.getGenres();
}

module.exports = genreController;
