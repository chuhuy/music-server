const Album = require('./../models/album');

const getFavoriteSongController = (args, context) => {
    const album = new Album();
    let first = args.first || parseInt(process.env.DEFAULT_PAGINATION_ITEMS);
    let offset = args.offset || 0;
    if(context.user.name) return album.getFavoriteAlbum(first, offset, context.user.name);
    else return [];
}

module.exports = getFavoriteSongController;
