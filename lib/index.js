const _ = require('lodash');
const Block = require('./Block');
const Account = require('./Account');
const Transfer = require('./Transfer');

let seroRpc = null;

module.exports = function({ baseURL = '', timeout = 1000, headers = {} }) {
  if (_.isNull(seroRpc)) {
    seroRpc = axios.create({
      baseURL,
      timeout,
      headers,
    });
  }
  return {
    block: new Block(seroRpc),
    account: new Account(seroRpc),
    transfer: new Transfer(seroRpc),
  };
};
