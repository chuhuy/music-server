const connection = require('./../../../database/connect');
const util = require('util');

const query = util.promisify(connection.query).bind(connection);

class Artist {
    async searchByArtistName (first, offset, keyword) {
        const queryString = `SELECT * FROM artist a
        WHERE a.name LIKE ?
        ORDER BY a.artist_id
        LIMIT ?, ?;`;
        try {
            const result = await query(queryString, [`%${keyword}%`, offset, first]);
            return result;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async getArtistByID (artist_id) {
        const queryString = `SELECT * FROM artist a WHERE a.artist_id = ?`;
        try {
            const result = await query(queryString, [artist_id]);
            return result[0];
        } catch (error) {
            console.log(error);
            return {};
        }
    }
    async getSongsByArtist(artist_id) {
        const queryString = `SELECT sub.* FROM (SELECT m.music_id, m.title, m.release_date, m.url, m.image_url, m.lyric, 
                             GROUP_CONCAT(DISTINCT a.name SEPARATOR ', ') AS artists FROM music m
                             JOIN music_artist ma ON ma.music_id = m.music_id 
                             JOIN artist a ON a.artist_id = ma.artist_id 
                             GROUP BY m.music_id 
                             ORDER BY m.music_id ASC) as sub
                             JOIN music_artist ma ON ma.music_id = sub.music_id
                             JOIN artist a ON a.artist_id = ma.artist_id
                             WHERE a.artist_id = ? AND sub.artists LIKE CONCAT('%', a.name , '%');`;
        try {
            const result = await query(queryString, [artist_id]);
            return result;
        } catch (error) {
            console.log(error);
            return [];
        }
    }
    async getAlbumsByArtist(artist_id) {
        const queryString = `SELECT sub.* FROM (SELECT a1.*,
                             GROUP_CONCAT(DISTINCT a2.name SEPARATOR ', ') AS artists
                             FROM album a1
                             JOIN album_artist aa ON a1.album_id = aa.album_id
                             JOIN artist a2 ON a2.artist_id = aa.artist_id
                             GROUP BY a1.album_id
                             ORDER BY a1.release_date ASC) as sub
                             JOIN album_artist aa ON aa.album_id = sub.album_id
                             JOIN artist a ON a.artist_id = aa.artist_id
                             WHERE a.artist_id = ? AND sub.artists LIKE CONCAT('%', a.name , '%');`;
        try {
            const result = await query(queryString, [artist_id]);
            return result;
        } catch (error) {
            console.log(error);
            return [];
        }
    }
}

module.exports = Artist;
