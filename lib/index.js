const _ = require('lodash');
const axios = require('axios');

const Block = require('./Block');
const Account = require('./Account');
const Transfer = require('./Transfer');

let seroRpc = null;

module.exports = function({ baseURL = '', timeout = 1000, headers = {} }, isDebug = false) {
  if (_.isNull(seroRpc)) {
    seroRpc = axios.create({
      baseURL,
      timeout,
      headers,
    });
  }

  const account = new Account(seroRpc, isDebug);
  const block = new Block(seroRpc, isDebug);
  const transfer = new Transfer(seroRpc, isDebug);

  return {
    block,
    account,
    transfer,
  };
};
