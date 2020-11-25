const connection = require('../../../database/connect');
const util = require('util');

const query = util.promisify(connection.query).bind(connection);

class Personal {

}

module.exports = Personal;
