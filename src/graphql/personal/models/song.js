const connection = require('../../../database/connect');
const util = require('util');

const query = util.promisify(connection.query).bind(connection);

class Song {
    async commentSong(username, music_id, content) {
        const queryString = `INSERT INTO comment (content, uuid, music_id, created_at)
            VALUES (?, (SELECT u.uuid FROM user u
            WHERE u.username = ?), ?, CURRENT_TIMESTAMP());`;
        try {
            const result = await query(queryString, [content, username, music_id]);
            return result.affectedRows;
        } catch (error) {
            console.log(error);
            return 0;
        }
    }
    async addFavoriteSong(username, music_id) {
        const queryString = `INSERT INTO user_music
            VALUES ((SELECT u.uuid FROM user u WHERE u.username = ?), ?);`;
        try {
            const result = await query(queryString, [username, music_id]);
            return result.affectedRows;
        } catch (error) {
            console.log(error);
            return 0;
        }
    }
    async getFavoriteSong(first, offset, username) {
        const queryString = `SELECT m.music_id, m.title, m.release_date, m.url, m.image_url, m.lyric,
            GROUP_CONCAT(DISTINCT a.name SEPARATOR ', ') AS artists 
            FROM music m JOIN user_music um ON m.music_id = um.music_id 
            JOIN user u ON u.uuid = um.uuid 
            JOIN music_artist ma ON ma.music_id = m.music_id 
            JOIN artist a ON a.artist_id = ma.artist_id 
            WHERE u.username = ? GROUP BY m.music_id
            ORDER BY m.music_id LIMIT ?, ?;`;
        try {
            const result = await query(queryString, [username, offset, first]);
            return result;
        } catch (error) {
            console.log(error);
            return [];
        }
    }
    async isFavoriteSong(username, music_id) {
        const queryString = `SELECT COUNT(*) AS exist FROM user_music um
                             JOIN user u ON u.uuid = um.uuid
                             WHERE u.username = ? AND um.music_id = ?;`;
        try {
            const result = await query(queryString, [username, music_id])
            return (!!result[0].exist);
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

module.exports = Song;
