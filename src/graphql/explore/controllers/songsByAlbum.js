const Explore = require('./../models/explore');

const songsByAlbumController = (args) => {
    const explore = new Explore();
    if(args.album_id) return explore.getSongsByAlbum(args.album_id);
    else return [];
}

module.exports = songsByAlbumController;
