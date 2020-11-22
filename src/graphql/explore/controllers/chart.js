const Explore = require('./../models/explore');

const chartController = (args) => {
    let explore = new Explore();

    switch (args.area) {
        case 'KPOP': {
            const result = explore.getChart(8);
            return result;
        };
        case 'VPOP': {
            return explore.getChart(16);
        };
        case 'USUK': {
            return explore.getChart(8);
        };
    }
};

module.exports = chartController;
