const connection = require("../../../database/connect");
const util = require("util");
// const redis = require("redis");
// const PORT_REDIS = process.env.PORT || 6379;
// const client = redis.createClient(PORT_REDIS);
const query = util.promisify(connection.query).bind(connection);
// const redisGet = util.promisify(client.get).bind(client);

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
        console.log(result);
        return result;
      } catch (error) {
        console.log(error);
        return [];
      }

    // const area = "usuk";
    // if (area_id === 1) area = "usuk";
    // else if (area_id === 8) area === "kpop";
    // else if (area_id === 16) area === "vpop";

    // try {
    //   const res = await redisGet(area);
    //   // console.log(res);
    //   return JSON.parse(res);
    // } catch {
    //   console.log(error);
    //   const queryString = `SELECT m.music_id, m.title, m.release_date, m.url, m.image_url, m.lyric, 
    //         GROUP_CONCAT(DISTINCT a.name SEPARATOR ', ') AS artists FROM music m 
    //         JOIN music_genre mg ON m.music_id = mg.music_id 
    //         JOIN music_artist ma ON ma.music_id = m.music_id 
    //         JOIN artist a ON a.artist_id = ma.artist_id 
    //         WHERE mg.genre_id = ? GROUP BY m.music_id 
    //         ORDER BY m.monthly_counter DESC LIMIT 20;`;
    //   try {
    //     const result = await query(queryString, [area_id]);
    //     console.log(result);
    //     return result;
    //   } catch (error) {
    //     console.log(error);
    //     return [];
    //   }
    // }
  }

  async getGenres(first, offset) {
    const queryString = `SELECT g.genre_id, g.name, g.image_url
                             FROM genre g LIMIT ?, ?;`;
    try {
      const result = await query(queryString, [offset, first]);
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
        LIMIT ?, ?;`;
    try {
      const result = await query(queryString, [offset, first]);
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  async getSongsByGenreID(first, offset, genre_id) {
    const queryString = `SELECT m.music_id, m.title, m.release_date, m.url, m.image_url, m.lyric, 
        GROUP_CONCAT(DISTINCT a.name SEPARATOR ', ') AS artists FROM music m 
        JOIN music_genre mg ON m.music_id = mg.music_id 
        JOIN music_artist ma ON ma.music_id = m.music_id 
        JOIN artist a ON a.artist_id = ma.artist_id 
        WHERE mg.genre_id = ? GROUP BY m.music_id 
        ORDER BY m.release_date DESC LIMIT ?, ?;`;
    try {
      const result = await query(queryString, [genre_id, offset, first]);
      console.log(result);
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
        LIMIT ?, ?;`;
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
        LIMIT ?, ?;`;
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
  async getTop100List(first, offset) {
    const queryString = `SELECT g.genre_id, g.name, g.top_image AS image_url FROM genre g
                             WHERE g.top_image IS NOT NULL ORDER BY g.genre_id LIMIT ?, ?;`;
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
