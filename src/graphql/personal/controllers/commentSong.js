const Song = require('./../models/song');

const commentSongController = (args, context) => {
    const song = new Song();
    if(args.music_id && args.content && context.user.name) return song.commentSong(context.user.name, args.music_id, args.content);
    else return 0;
}

module.exports = commentSongController;
