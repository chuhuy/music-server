const connection = require('../../../database/connect');
const util = require('util');

const query = util.promisify(connection.query).bind(connection);

class Explore {
    async getChart(area_id) {
        const queryString = `SELECT m.music_id, m.title, m.release_date, m.url, m.image_url, m.lyric, 
        GROUP_CONCAT(DISTINCT a.name SEPARATOR ', ') AS artists FROM music m 
        JOIN music_genre mg ON m.music_id = mg.music_id 
        JOIN music_artist ma ON ma.music_id = m.music_id 
        JOIN artist a ON a.artist_id = ma.artist_id 
        WHERE mg.genre_id = ? GROUP BY m.music_id 
        ORDER BY m.monthly_counter DESC LIMIT 20;`;
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
        const queryString = `SELECT m.music_id, m.title, m.release_date, m.url, m.image_url, m.lyric,
        GROUP_CONCAT(DISTINCT a.name SEPARATOR ', ') AS artists
        FROM music m
        JOIN music_artist ma ON m.music_id = ma.music_id
        JOIN artist a ON a.artist_id = ma.artist_id
        GROUP BY m.music_id
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
    async getSongsByGenre(first, offset, genre_id) {
        const queryString = `SELECT m.music_id, m.title, m.release_date, m.url, m.image_url, m.lyric, 
        GROUP_CONCAT(DISTINCT a.name SEPARATOR ', ') AS artists FROM music m 
        JOIN music_genre mg ON m.music_id = mg.music_id 
        JOIN music_artist ma ON ma.music_id = m.music_id 
        JOIN artist a ON a.artist_id = ma.artist_id 
        WHERE mg.genre_id = ? GROUP BY m.music_id 
        ORDER BY m.monthly_counter DESC LIMIT ?, ?;`;
        try {
            const result = await query(queryString, [genre_id, offset, first]);
            return result;
        } catch (error) {
            console.log(error);
            return [];
        }
    }
}

module.exports = Explore;
