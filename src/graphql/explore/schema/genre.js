const genreSchema = `
    type Genre {
        genre_id: Int!
        name: String!
        image_url: String
        songs: [Song]
    }
`;

module.exports = genreSchema;
