const connection = require('./../../../database/connect');
const util = require('util');

const query = util.promisify(connection.query).bind(connection);

class Album {
    async searchByAlbumTitle (first, offset, keyword) {
        const queryString = `SELECT a1.*,
        GROUP_CONCAT(DISTINCT a2.name SEPARATOR ', ') AS artists
        FROM album a1
        JOIN album_artist aa ON a1.album_id = aa.album_id
        JOIN artist a2 ON a2.artist_id = aa.artist_id
        WHERE a1.title LIKE ?
        GROUP BY a1.album_id
        ORDER BY a1.album_id
        LIMIT ?, ?;`;
        try {
            const result = await query(queryString, [`%${keyword}%`, offset, first]);
            return result;
        } catch (error) {
            console.log(error);
            return [];
        }
    }
}

module.exports = Album;
