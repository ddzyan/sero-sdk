const assert = require('assert');
const randomstring = require('randomstring');
const SeroSdk = require('../lib');

const getRandom = function({ length = 15, charset = 'alphabetic' }) {
  const randomString = randomstring.generate({
    length,
    charset,
  });
  return randomString;
};

describe('sero sdk should work', function() {
  let seroSdk = null;
  let txHash = null;
  let pkStr = null;
  before(function() {
    seroSdk = SeroSdk({ baseURL: 'http://172.31.225.20:53716' }, true);
  });
  it('createAccount', () => {
    //const seedStr = getRandom({ length: 64 });
    const result = seroSdk.account.createAccount('TNeVdoCNthrjsPjaLIrKknfleFNMGNYNqewlnVezxGpoixByoTxtwDQZNLioIiFj');
    console.log('createAccount',result);
    const { sk, tk_hex, pk, tk_base58, pk_base58 } = result;
    assert(sk, 'sk does not exist');
    assert(tk_hex, 'tk_hex does not exist');
    assert(pk, 'pk does not exist');
    pkStr = pk;
    assert(tk_base58, 'tk_base58 does not exist');
    assert(tk_base58, 'tk_base58 does not exist');
    assert(pk_base58, 'pk_base58 does not exist');
  });

  it('generatePKr', () => {
    const result = seroSdk.account.generatePKr(pkStr);
    console.log('generatePKr',result);
    const { pkr, pkr_hex, pkr_base58 } = result;
    assert(pkr, 'sk does not exist');
    assert(pkr_hex, 'tk_hex does not exist');
    assert(pkr_base58, 'pk does not exist');
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
      assert(false, error);
    }
  });

  it('getLastBlock', async () => {
    try {
      const result = await seroSdk.block.getLastBlock();
      assert(result.result.BlockNumber > 0, 'getLastBlock error');
    } catch (error) {
      assert(false, error);
    }
  });

  it('getBlockByNumber', async () => {
    try {
      const result = await seroSdk.block.getBlockByNumber(109);
      console.log('getBlockByNumber',result);
      assert(result.result.TxHashes.length > 0, 'getBlockByNumber error');
      txHash = result.result.TxHashes[0];
    } catch (error) {
      assert(false, error);
    }
  });

  it('getBlockByTxHash', async () => {
    try {
      const result = await seroSdk.block.getBlockByTxHash(txHash);
      console.log('getBlockByTxHash',result);
      assert(result.result, 'getBlockByTxHash error');
    } catch (error) {
      assert(false, error);
    }
  });
});
