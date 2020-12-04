const Explore = require('./../models/explore');

const songsByGenreController = (args) => {
    const explore = new Explore();
    let first = args.first || parseInt(process.env.DEFAULT_PAGINATION_ITEMS);
    let offset = args.offset || 0;
    if(args.genre_id) return explore.getSongsByGenreID(first, offset, args.genre_id);
    else return [];
}

module.exports = songsByGenreController;
