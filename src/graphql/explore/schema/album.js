const albumSchema = `
    type Album {
        album_id: String!
        title: String!
        release_date: String
        image_url: String
    }
`;

module.exports = albumSchema;
