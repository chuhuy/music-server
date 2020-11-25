const Album = require('./../models/album');

const searchByAlbumController = (args) => {
    const album = new Album();
    let first = args.first || parseInt(process.env.DEFAULT_PAGINATION_ITEMS);
    let offset = args.offset || 0;
    if(args.keyword) return album.searchByAlbumTitle(first, offset, args.keyword);
    else return [];
}

module.exports = searchByAlbumController;
