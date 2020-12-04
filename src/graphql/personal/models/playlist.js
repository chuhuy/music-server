const connection = require('../../../database/connect');
const util = require('util');

const query = util.promisify(connection.query).bind(connection);

class Playlist {
    async createPlaylist(username, playlist_name) {
        const queryString = `INSERT INTO playlist (name, uuid)
            VALUES (?, (SELECT u.uuid FROM user u WHERE u.username = ?));`
        try {
            const result = await query(queryString, [playlist_name, username]);
            return result.affectedRows;
        } catch (error) {
            console.log(error);
            return 0;
        }
    }
    async getPlaylist(first, offset, username) {
        const queryString = `SELECT p.playlist_id, p.name, p.image_url FROM playlist p
            JOIN user u ON p.uuid = u.uuid
            WHERE u.username = ?
            ORDER BY p.playlist_id LIMIT ?, ?;`;
        try {
            const result = await query(queryString, [username, offset, first]);
            return result;
        } catch (error) {
            console.log(error);
            return [];
        }
    }
    async addSongToPlaylist(username, music_id, playlist_id) {
        const queryString = ``;
        try {
            const result = await query(queryString, []);
            if(result.affectedRows) return 1;
            else return 0;
        } catch (error) {
            console.log(error);
            return 0;
        }
    }
}

module.exports = Playlist;
