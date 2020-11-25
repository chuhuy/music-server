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
        ORDER BY m.release_date DESC LIMIT ?, ?;`;
        try {
            const result = await query(queryString, [genre_id, offset, first]);
            return result;
        } catch (error) {
            console.log(error);
            return [];
        }
    }
    async getSongsByGenre(genre_id) {
        const queryString = `SELECT m.music_id, m.title, m.release_date, m.url, m.image_url, m.lyric, 
        GROUP_CONCAT(DISTINCT a.name SEPARATOR ', ') AS artists FROM music m 
        JOIN music_genre mg ON m.music_id = mg.music_id 
        JOIN music_artist ma ON ma.music_id = m.music_id 
        JOIN artist a ON a.artist_id = ma.artist_id 
        WHERE mg.genre_id = ? GROUP BY m.music_id 
        ORDER BY m.total_counter DESC LIMIT 100;`;
        try {
            const result = await query(queryString, [genre_id]);
            return result;
        } catch (error) {
            console.log(error);
            return [];
        }
    }
    async getLatestAlbums(first, offset) {
        const queryString = `SELECT a1.*,
        GROUP_CONCAT(DISTINCT a2.name SEPARATOR ', ') AS artists
        FROM album a1
        JOIN album_artist aa ON a1.album_id = aa.album_id
        JOIN artist a2 ON a2.artist_id = aa.artist_id
        GROUP BY a1.album_id
        ORDER BY a1.release_date DESC
        LIMIT ?, ?;`
        try {
            const result = await query(queryString, [offset, first]);
            return result;
        } catch (error) {
            console.log(error);
            return [];
        }
    }
    async getAlbumsByGenre(first, offset, genre_id) {
        const queryString = `SELECT a1.*,
        GROUP_CONCAT(DISTINCT a2.name SEPARATOR ', ') AS artists
        FROM album a1
        JOIN album_artist aa ON a1.album_id = aa.album_id
        JOIN artist a2 ON a2.artist_id = aa.artist_id
        JOIN album_genre ag ON ag.album_id = a1.album_id
        WHERE ag.genre_id = ?
        GROUP BY a1.album_id
        ORDER BY a1.album_id
        LIMIT ?, ?;`
        try {
            const result = await query(queryString, [genre_id, offset, first]);
            return result;
        } catch (error) {
            console.log(error);
            return [];
        }
    }
    async getSongsByAlbum(album_id) {
        const queryString = `SELECT m.music_id, m.title, m.release_date, m.url, m.image_url, m.lyric, 
        GROUP_CONCAT(DISTINCT a.name SEPARATOR ', ') AS artists FROM music m
        JOIN music_artist ma ON ma.music_id = m.music_id 
        JOIN artist a ON a.artist_id = ma.artist_id 
        WHERE m.album_id = ? GROUP BY m.music_id 
        ORDER BY m.music_id DESC;`;
        try {
            const result = await query(queryString, [album_id]);
            return result;
        } catch (error) {
            console.log(error);
            return [];
        }
    }
}

module.exports = Explore;
