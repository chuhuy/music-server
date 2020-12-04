const commentSchema = `
    type Comment {
        comment_id: Int!
        content: String!
        created_at: String!
        display_name: String!
        image_url: String
        default_avatar: Int
    }
`;

module.exports = commentSchema;
