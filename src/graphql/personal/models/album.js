const connection = require('../../../database/connect');
const util = require('util');

const query = util.promisify(connection.query).bind(connection);

class Album {
    async addFavoriteAlbum(username, album_id) {
        const queryString = `INSERT INTO user_album
            VALUES ((SELECT u.uuid FROM user u WHERE u.username = ?), ?);`;
        try {
            const result = await query(queryString, [username, album_id]);
            return result.affectedRows;
        } catch (error) {
            console.log(error);
            return 0;
        }
    }
    async getFavoriteAlbum(first, offset, username) {
        const queryString = `SELECT a.* FROM album a
                             JOIN user_album ua ON a.album_id = ua.album_id
                             JOIN user u ON u.uuid = ua.uuid
                             WHERE u.username = ?
                             ORDER BY a.album_id LIMIT ?, ?;`;
        try {
            const result = await query(queryString, [username, offset, first]);
            return result;
        } catch (error) {
            console.log(error);
            return [];
        }
    }
    async isFavoriteAlbum(username, album_id) {
        const queryString = `SELECT COUNT(*) AS exist FROM user_album ua
                             JOIN user u ON u.uuid = ua.uuid
                             WHERE u.username = ? AND ua.album_id = ?;`;
        try {
            const result = await query(queryString, [username, album_id])
            return (!!result[0].exist);
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

module.exports = Album;
