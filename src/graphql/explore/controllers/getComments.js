const Song = require('./../models/song');

const getCommentsController = (args) => {
    const song = new Song();
    let first = args.first || parseInt(process.env.DEFAULT_PAGINATION_ITEMS);
    let offset = args.offset || 0;
    return song.getComments(first, offset, music_id);
}

module.exports = getCommentsController;