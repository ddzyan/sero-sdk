const _ = require('lodash');
const axios = require('axios');

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

  const block = new Account(seroRpc);
  const account = new Block(seroRpc);
  const transfer = new Transfer(seroRpc);

  return {
    block,
    account,
    transfer,
  };
};
