const Explore = require('./../models/explore');

const top100ListController = (args) => {
    let explore = new Explore();
    let first = args.first || parseInt(process.env.DEFAULT_PAGINATION_ITEMS);
    let offset = args.offset || 0;
    return explore.getTop100List(first, offset);
}

module.exports = top100ListController;
