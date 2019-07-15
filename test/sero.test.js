const assert = require('assert');
const randomstring = require('randomstring');
const SeroSdk = require('../lib');

const getRandom = function(length = 15, charset = 'alphabetic') {
  const randomString = randomstring.generate({
    length,
    charset,
  });
  return randomString;
};

describe('sero sdk should work', function() {
  let seroSdk = null;
  let lastBlockNumber = null;
  before(function() {
    seroSdk = SeroSdk({ baseURL: 'http://172.31.225.20:53716' }, true);
  });
  it('createAccount', () => {
    const seedStr = `${getRandom()}${Date.now()}`;
    const result = seroSdk.account.createAccount(seedStr);
    const { sk, tk_hex, pk, tk_base58, pk_base58 } = result;
    assert(sk, 'sk does not exist');
    assert(tk_hex, 'tk_hex does not exist');
    assert(pk, 'pk does not exist');
    assert(tk_base58, 'tk_base58 does not exist');
    assert(tk_base58, 'tk_base58 does not exist');
    assert(pk_base58, 'pk_base58 does not exist');
  });

  it('getBalance', async () => {
    try {
      const result = await seroSdk.account.getBalance('123456');
      if (result.result) {
        assert(Number.parseInt(result.result) > 0, 'getBalance error');
      } else {
        throw result.error;
      }
    } catch (error) {
      assert(false, JSON.stringify(error));
    }
  });

  it('getLastBlock', async () => {
    try {
      const result = await seroSdk.block.getLastBlock();
      if (result.result) {
        lastBlockNumber = Number.parseInt(result.result, '16').toString('10');
        assert(lastBlockNumber > 0, 'getLastBlock error');
      } else {
        throw result.error;
      }
    } catch (error) {
      assert(false, JSON.stringify(error));
    }
  });

  it('getBlockByNumber', async () => {
    try {
      const result = await seroSdk.block.getBlockByNumber(lastBlockNumber);
      if (result.result) {
        assert(Number.parseInt(result.result) > 0, 'getBlockByNumber error');
      } else {
        throw result.error;
      }
    } catch (error) {
      assert(false, JSON.stringify(error));
    }
  });

  it('getBlockByHash', async () => {
    try {
      const result = await seroSdk.block.getBlockByHash(
        '0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331'
      );
      if (result.result) {
        assert(Number.parseInt(result.result) > 0, 'getBlockByHash error');
      } else {
        throw result.error;
      }
    } catch (error) {
      assert(false, JSON.stringify(error));
    }
  });
});
