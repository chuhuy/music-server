const Playlist = require('./../models/playlist');

const addSongToPlaylistController = (args, context) => {
    const playlist = new Playlist();
    if(args.music_id && context.user.name && args.playlist_id) return playlist.addSongToPlaylist(args.music_id, args.playlist_id)
    else return 0;
}

module.exports = addSongToPlaylistController;
