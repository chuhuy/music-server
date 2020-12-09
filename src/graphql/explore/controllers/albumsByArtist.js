const Artist = require('./../models/artist');

const albumsByArtistController = (args) => {
    const artist = new Artist();
    if(args.artist_id) return artist.getAlbumsByArtist(args.artist_id);
    else return [];
}

module.exports = albumsByArtistController;
