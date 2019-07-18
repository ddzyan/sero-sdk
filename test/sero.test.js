const assert = require('assert');
const SeroSdk = require('../lib');
const randomstring = require('randomstring');

const getRandom = function(length = 15, charset = 'alphabetic') {
  const randomString = randomstring.generate({
    length,
    charset,
  });
  return randomString;
};

describe('sero sdk should work', function() {
  let seroSdk = null;
  let newPkrRandom = null;
  let newSk = null;
  let newPk = null;
  before(function() {
    seroSdk = SeroSdk({ baseURL: 'http://127.0.0.1:53716', isDebug: true });
  });
  it('createAccount', () => {
    const seedStr = getRandom(15);
    const result = seroSdk.account.createAccount(seedStr);
    const { sk, tk, pk, tk_base58, pk_base58, sk_base58 } = result;
    assert(sk, 'sk does not exist');
    assert(tk, 'tk_hex does not exist');
    assert(pk, 'pk does not exist');
    assert(tk_base58, 'tk_base58 does not exist');
    assert(sk_base58, 'sk_base58 does not exist');
    assert(pk_base58, 'pk_base58 does not exist');
    newPk = pk;
    newSk = sk;
  });

  it('generatePKr', () => {
    const result = seroSdk.account.generatePKr(newPk);
    const { pkr, pkr_base58, rnd } = result;
    newPkrRandom = rnd;
    assert(pkr, 'pkr does not exist');
    assert(rnd, 'rnd does not exist');
  });

  it('generateSkr', () => {
    const skr = seroSdk.account.generateSkr(newSk, newPkrRandom);
    assert(skr, 'skr does not exist');
  });

  it('getBalance', async () => {
    try {
      const result = await seroSdk.account.getBalance(`0x${newPk}`);
      assert(result.result >= 0, 'getBalance error');
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

  it('getBlocksInfo', async () => {
    try {
      const result = await seroSdk.block.getBlocksInfo(1251606, 1);
      assert(result.result.length > 0, 'getBlocksInfo error');
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

  it.skip('createTx', async () => {
    try {
      const result = await seroSdk.transfer.createTx({
        from:
          '0xab189440849da94cd5519e9cb174f06af4f41f0897451a67aa16322757ec691a34cfa407ba1fa9ca8b1aa59f38066250cc7ac17e9710ece5779fe67dcbea2213',
        refundTo:
          '0x2fYBi9UppMQZtEeS2XBLUVjYFEfHF8w1UFD4C76nRggZ8UsNdB1kUTsejGEtaHJkCZcNrfmGxQKhYaENCXHVCJvrv1xJcwSq2gyY2vQWtt2ZeyqeojWQtHB1VbmBjggTb73',
        receptions: [
          {
            //接受者信息
            Addr: '', //接受者PKr|PK，PK会自动转成PKr
            Currency: 'SERO', //币名
            Value: 100000000000, //币的数量
          },
        ],
      });
      console.log('createTx', result);
      assert(result.result.BlockHash, 'createTx error');
    } catch (error) {
      assert(false, error);
    }
  });

  it.skip('signTx', () => {
    try {
      const result = seroSdk.transfer.signTx('', 'TNeVdoCNthrjsPjaLIrKknfleFNMGNYNqewlnVezxGpoixByoTxtwDQZNLioIiFj');
      console.log('signTx', signTx);
      assert(result.result.BlockHash, 'signTx error');
    } catch (error) {
      assert(false, error);
    }
  });

  it.skip('broadcast', async () => {
    try {
      const result = await seroSdk.transfer.broadcast('');
      console.log('broadcast', result);
      assert(result.result.BlockHash, 'broadcast error');
    } catch (error) {
      assert(false, error);
    }
  });
});
