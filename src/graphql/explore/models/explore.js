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
}

module.exports = Explore;
