const Song = require('./../models/song');

const resetWeeklyController = () => {
    const song = new Song();
    return song.resetWeeklyCounter();
}

module.exports = resetWeeklyController;
