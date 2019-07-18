const _ = require('lodash');
const axios = require('axios');

const Block = require('./Block');
const Account = require('./Account');
const Transfer = require('./Transfer');

let seroRpc = null;

module.exports = function({ baseURL = '', timeout = 30000, headers = {}, isDebug = false, jsonrpc = '2.0', id = 0 }) {
  if (_.isNull(seroRpc)) {
    seroRpc = axios.create({
      baseURL,
      timeout,
      headers,
    });
  }

  const account = new Account(seroRpc, isDebug, jsonrpc, id);
  const block = new Block(seroRpc, isDebug, jsonrpc, id);
  const transfer = new Transfer(seroRpc, isDebug, jsonrpc, id);

  return {
    block,
    account,
    transfer,
  };
};
