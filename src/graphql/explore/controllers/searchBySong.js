const Song = require('./../models/song');

const searchBySongController = (args) => {
    const song = new Song();
    let first = args.first || parseInt(process.env.DEFAULT_PAGINATION_ITEMS);
    let offset = args.offset || 0;
    if(args.keyword) return song.searchBySongTitle(first, offset, args.keyword);
    else return [];
}

module.exports = searchBySongController;
