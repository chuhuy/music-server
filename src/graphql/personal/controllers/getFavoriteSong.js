const Song = require('./../models/song');

const getFavoriteSongController = (args, context) => {
    const song = new Song();
    let first = args.first || parseInt(process.env.DEFAULT_PAGINATION_ITEMS);
    let offset = args.offset || 0;
    if(context.user.name) return song.getFavoriteSong(first, offset, context.user.name);
    else return [];
}

module.exports = getFavoriteSongController;
