const { parse } = require('path');
const { off } = require('process');
const Explore = require('./../models/explore');

const latestSongsController = (args) => {
    const explore = new Explore();
    let first = args.first || parseInt(process.env.DEFAULT_PAGINATION_ITEMS);
    let offset = args.offset || 0;
    return explore.getLatestSongs(first, offset);
}

module.exports = latestSongsController;
