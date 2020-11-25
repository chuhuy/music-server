const Explore = require('./../models/explore');

const latestAlbumsController = (args) => {
    const explore = new Explore();
    let first = args.first || parseInt(process.env.DEFAULT_PAGINATION_ITEMS);
    let offset = args.offset || 0;
    return explore.getLatestAlbums(first, offset);
}

module.exports = latestAlbumsController;
