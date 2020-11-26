const Playlist = require('./../models/playlist');

const createPlaylistController = (args, context) => {
    const playlist = new Playlist();
    if(args.playlist_name && context.user.name) return playlist.createPlaylist(context.user.name, args.playlist_name);
    else return 0;
}

module.exports = createPlaylistController;
