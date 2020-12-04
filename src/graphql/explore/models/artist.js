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
}

module.exports = Artist;
