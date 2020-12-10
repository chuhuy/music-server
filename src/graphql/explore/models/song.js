const connection = require('./../../../database/connect');
const util = require('util');

const query = util.promisify(connection.query).bind(connection);

class Song {
    async searchBySongTitle (first, offset, keyword) {
        const queryString = `SELECT m.music_id, m.title, m.release_date, m.url, m.image_url, m.lyric,
        GROUP_CONCAT(DISTINCT a.name SEPARATOR ', ') AS artists
        FROM music m
        JOIN music_artist ma ON m.music_id = ma.music_id
        JOIN artist a ON a.artist_id = ma.artist_id
        WHERE m.title LIKE ?
        GROUP BY m.music_id
        ORDER BY m.music_id
        LIMIT ?, ?;`;
        try {
            const result = await query(queryString, [`%${keyword}%`, offset, first]);
            return result;
        } catch (error) {
            console.log(error);
            return [];
        }
    }
    async getComments (first, offset, music_id) {
        const queryString = `SELECT c.comment_id, c.content, c.created_at, u.display_name, u.image_url, u.default_avatar 
                             FROM comment c JOIN user u ON c.uuid = u.uuid
                             WHERE c.music_id = ?
                             ORDER BY c.created_at DESC LIMIT ?, ?;`;
        try {
            const result = await query(queryString, [music_id, offset, first]);
            return result;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async songCounter (music_id) {
        const queryString = `UPDATE music m
                             SET m.monthly_counter = m.monthly_counter + 1,
                             m.total_counter = m.total_counter + 1
                             WHERE m.music_id = ?;`;
        try {
            const result = await query(queryString, [music_id]);
            if(result.changedRows) return 1;
            else return 0;
        } catch (error) {
            console.log(error);
            return 0;
        }
    }
    async resetWeeklyCounter () {
        const queryString = `UPDATE music m
        SET m.monthly_counter = 0;`;
        try {
            const result = await query(queryString);
            if(result.changedRows) return 1;
            else return 0;
        } catch (error) {
            console.log(error);
            return 0;
        }
    }
    async dailyTrendingSong() {
        const queryString = `SELECT m.title, m.image_url,
                             GROUP_CONCAT(DISTINCT a.name SEPARATOR ', ') AS artists
                             FROM music m
                             JOIN music_artist ma ON m.music_id = ma.music_id
                             JOIN artist a ON a.artist_id = ma.artist_id
                             GROUP BY m.music_id
                             ORDER BY m.monthly_counter DESC
                             LIMIT 1;`;
        try {
            const result = await query(queryString);
            return result[0];
        } catch (error) {
            console.log(error);
            return {};
        }
    }
}

module.exports = Song;
