const Song = require('./../models/song');

const songCounterController = (args) => {
    const song = new Song();
    if(args.music_id) return song.songCounter(args.music_id);
    else return 0;
}

module.exports = songCounterController;
