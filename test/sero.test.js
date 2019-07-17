const assert = require('assert');
const SeroSdk = require('../lib');

describe('sero sdk should work', function() {
  let seroSdk = null;
  let pkStr = null;
  let pkBase58 = null;
  before(function() {
    seroSdk = SeroSdk({ baseURL: 'http://127.0.0.1:53716' ,isDebug : true});
  });
  it('createAccount', () => {
    const result = seroSdk.account.createAccount('TNeVdoCNthrjsPjaLIrKknfleFNMGNYNqewlnVezxGpoixByoTxtwDQZNLioIiFj');
    const { sk, tk_hex, pk, tk_base58, pk_base58 } = result;
    assert(sk, 'sk does not exist');
    assert(tk_hex, 'tk_hex does not exist');
    assert(pk, 'pk does not exist');
    assert(tk_base58, 'tk_base58 does not exist');
    assert(tk_base58, 'tk_base58 does not exist');
    assert(pk_base58, 'pk_base58 does not exist');
    pkStr = pk;
    pkBase58 = pk_base58;
  });

  it('generatePKr', () => {
    const result = seroSdk.account.generatePKr(pkStr);
    const { pkr, pkr_hex, pkr_base58 } = result;
    assert(pkr, 'sk does not exist');
    assert(pkr_hex, 'tk_hex does not exist');
    assert(pkr_base58, 'pk does not exist');
  });

  it('getBalance', async () => {
    try {
      const result = await seroSdk.account.getBalance(pkBase58);
      assert(result.result, 'getBalance error');
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
      assert(result.result.TxHashes.length > 0, 'getBlockByNumber error');
    } catch (error) {
      assert(false, error);
    }
  });

  it('getBlockByTxHash', async () => {
    try {
      const result = await seroSdk.block.getBlockByTxHash(
        '0xd54dfe82a3be34c87dacd4243ad9a879ceb39ef7d3a6dbd6e3f3b8c450125dfc'
      );
      assert(result.result.BlockHash, 'getBlockByTxHash error');
    } catch (error) {
      assert(false, error);
    }
  });
});
