const Playlist = require('./../models/playlist');

const getPlaylistController = (args, context) => {
    const playlist = new Playlist();
    let first = args.first || parseInt(process.env.DEFAULT_PAGINATION_ITEMS);
    let offset = args.offset || 0;
    console.log(first)
    if(context.user.name) return playlist.getPlaylist(first, offset, context.user.name);
    else return [];
}

module.exports = getPlaylistController;
