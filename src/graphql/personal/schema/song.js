const songSchema = `
    type Song {
        music_id: Int!
        title: String!
        release_date: String
        url: String!
        image_url: String
        lyric: String
        artists: String
    }
`;

module.exports = songSchema;
