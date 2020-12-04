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
    async addSongToPlaylist(music_id, playlist_id) {
        const queryString = `INSERT INTO playlist_music
                             VALUES (?, ?)`;
        try {
            const result = await query(queryString, [playlist_id, music_id]);
            if(result.affectedRows) return 1;
            else return 0;
        } catch (error) {
            console.log(error);
            return 0;
        }
    }
    async getSongByPlaylist(offset, first, playlist_id) {
        const queryString = `SELECT m.music_id, m.title, m.release_date, m.url, m.image_url, m.lyric,
                             GROUP_CONCAT(DISTINCT a.name SEPARATOR ', ') AS artists 
                             FROM music m JOIN music_artist ma ON ma.music_id = m.music_id 
                             JOIN artist a ON a.artist_id = ma.artist_id
                             JOIN playlist_music pm ON pm.music_id = m.music_id
                             WHERE pm.playlist_id = ? GROUP BY m.music_id
                             ORDER BY m.music_id LIMIT ?, ?;`;
        try {
            const result = await query(queryString, [playlist_id, offset, first]);
            return result;
        } catch (error) {
            console.log(error);
            return [];
        }
    }
}

module.exports = Playlist;
