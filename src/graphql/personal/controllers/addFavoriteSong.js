const Song = require('./../models/song');

const addFavoriteSongController = (args, context) => {
    const song = new Song();
    if(args.music_id && context.user.name) return song.addFavoriteSong(context.user.name, args.music_id);
    else return 0;
}

module.exports = addFavoriteSongController;
