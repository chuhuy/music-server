const Song = require('./../models/song');

const isFavoriteSongController = (args, context) => {
    const song = new Song();
    if(context.user.name && args.music_id) return song.isFavoriteSong(context.user.name, args.music_id);
    else return false;
}

module.exports = isFavoriteSongController;
