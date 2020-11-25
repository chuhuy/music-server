const Explore = require('./../models/explore');

const albumsByGenreController = (args) => {
    const explore = new Explore();
    let first = args.first || parseInt(process.env.DEFAULT_PAGINATION_ITEMS);
    let offset = args.offset || 0;
    if(args.genre_id) return explore.getAlbumsByGenre(first, offset, args.genre_id);
    else return [];
}

module.exports = albumsByGenreController;
