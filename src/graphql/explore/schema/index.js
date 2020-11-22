const { buildSchema } = require('graphql');
const enums = require('./enum');
const songSchema = require('./song');
const artistSchema = require('./artist');
const genreSchema = require('./genre');

const schema = buildSchema(`
    type Query {
        chart(area: Area): [Song]
        genres: [Genre]
        latestSongs(first: Int offset: Int): [Song]
    }
`.concat(
    enums,
    songSchema,
    artistSchema,
    genreSchema
));

module.exports = schema;
