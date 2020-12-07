const Explore = require("./../models/explore");

const chartController = (args) => {
  let explore = new Explore();

  switch (args.area) {
    case "KPOP": {
      const res = explore.getChart(8);
      console.log(res);
      return res;
    }
    case "VPOP": {
      return explore.getChart(16);
    }
    case "USUK": {
      return explore.getChart(1);
    }
  }
};

module.exports = chartController;
