const Explore = require("./../models/explore");
const redis = require("redis");
const PORT_REDIS = process.env.PORT || 6379;
const client = redis.createClient(PORT_REDIS);

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
