const Artist = require('./../models/artist');

const searchByArtistController = (args) => {
    const artist = new Artist();
    let first = args.first || parseInt(process.env.DEFAULT_PAGINATION_ITEMS);
    let offset = args.offset || 0;
    if(args.keyword) return artist.searchByArtistName(first, offset, args.keyword);
    else return [];
}

module.exports = searchByArtistController;
