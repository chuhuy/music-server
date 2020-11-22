const connection = require('../../../database/connect');
const util = require('util');

const query = util.promisify(connection.query).bind(connection);

class Explore {
    async getChart(area_id) {
        const queryString = `SELECT m.music_id, m.title, m.release_date, m.url, m.image_url, m.lyric 
                             FROM music m
                             JOIN music_genre mg
                             ON m.music_id = mg.music_id
                             WHERE mg.genre_id = ?
                             ORDER BY m.monthly_counter DESC
                             LIMIT 20;`;
        try {
            const result = await query(queryString, [area_id]);
            return result;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async getGenres() {
        const queryString = `SELECT g.genre_id, g.name, g.image_url
                             FROM genre g;`;
        try {
            const result = await query(queryString);
            return result;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async getLatestSongs(first, offset) {
        const queryString = `SELECT m.music_id, m.title, m.release_date, m.url, m.image_url, m.lyric 
                             FROM music m
                             ORDER BY m.release_date DESC
                             LIMIT ?, ?;`
        try {
            const result = await query(queryString, [offset, first]);
            return result;
        } catch (error) {
            console.log(error);
            return [];
        }
    }
}

module.exports = Explore;
