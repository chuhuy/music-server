const connection = require('./../../../database/connect');

class Song {
    constructor (music_id, title, release_date, url, image_url, lyric, artist) {
        this.music_id = music_id;
        this.title = title;
        this.release_date = release_date;
        this.url = url;
        this.image_url = image_url;
        this.lyric = lyric;
        this.artist = artist;
    }

}

module.exports = Song;
