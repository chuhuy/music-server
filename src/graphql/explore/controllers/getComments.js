const Song = require('./../models/song');

const getCommentsController = (args) => {
    const song = new Song();
    let first = args.first || parseInt(process.env.DEFAULT_PAGINATION_ITEMS);
    let offset = args.offset || 0;
    if(args.music_id) return song.getComments(first, offset, args.music_id);
    else return [];
}

module.exports = getCommentsController;