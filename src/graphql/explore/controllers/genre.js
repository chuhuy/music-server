const Explore = require('./../models/explore');

const genreController = (args) => {
    let explore = new Explore();
    let first = args.first || parseInt(process.env.DEFAULT_PAGINATION_ITEMS);
    let offset = args.offset || 0;
    return explore.getGenres(first, offset);
}

module.exports = genreController;
