const { buildSchema } = require('graphql');
const enums = require('./enum');
const songSchema = require('./song');
const artistSchema = require('./artist');

const schema = buildSchema(`
    type Query {
        chart(area: Area): [Song]
    }
`.concat(
    enums,
    songSchema,
    artistSchema
));

module.exports = schema;
