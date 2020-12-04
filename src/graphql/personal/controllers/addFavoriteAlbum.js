const Album = require('./../models/album');

const addFavoriteAlbumController = (args, context) => {
    const album = new Album();
    if(args.album_id && context.user.name) return album.addFavoriteAlbum(context.user.name, args.album_id);
    else return 0;
}

module.exports = addFavoriteAlbumController;
