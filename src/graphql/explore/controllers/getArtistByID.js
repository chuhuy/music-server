const Artist = require('./../models/artist');

const getArtistByIDController = (args) => {
    const artist = new Artist();
    if(args.artist_id) return artist.getArtistByID(args.artist_id);
    else return {};
}

module.exports = getArtistByIDController;
