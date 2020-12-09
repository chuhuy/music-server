const Artist = require('./../models/artist');

const songsByArtistController = (args) => {
    const artist = new Artist();
    if(args.artist_id) return artist.getSongsByArtist(args.artist_id);
    else return [];
}

module.exports = songsByArtistController;
