const Explore = require('./../models/explore');

const top100Controller = (args) => {
    const explore = new Explore();
    if(args.genre_id) return explore.getSongsByGenre(args.genre_id);
    else return [];
}

module.exports = top100Controller;
