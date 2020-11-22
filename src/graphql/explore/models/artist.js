const connection = require('./../../../database/connect');

class Artist {
    constructor (artist_id, name, description, image_url) {
        this.artist_id = artist_id;
        this.name = name;
        this.description = description;
        this.image_url = image_url;
    }
}