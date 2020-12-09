const Album = require('./../models/album');

const isFavoriteAlbumController = (args, context) => {
    const album = new Album();
    if(context.user.name && args.album_id) return album.isFavoriteAlbum(context.user.name, args.album_id);
    else return false;
}

module.exports = isFavoriteAlbumController;
