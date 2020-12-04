const Playlist = require('./../models/playlist');

const getSongByPlaylistController = (args, context) => {
    const playlist = new Playlist();
    let first = args.first || parseInt(process.env.DEFAULT_PAGINATION_ITEMS);
    let offset = args.offset || 0;
    if(context.user.name && args.playlist_id) return playlist.getSongByPlaylist(offset, first, args.playlist_id);
    else return [];
}

module.exports = getSongByPlaylistController;
