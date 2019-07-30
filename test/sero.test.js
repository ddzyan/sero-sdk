const assert = require('assert');
const SeroSdk = require('../lib');
const randomstring = require('randomstring');

const getRandom = function(length = 15, charset = 'alphabetic') {
  const randomString = randomstring.generate({
    length,
    charset
  });
  return randomString;
};

describe('sero sdk should work', function() {
  let seroSdk = null;
  let newPkrRandom = null;
  let newSk = null;
  let newPk = null;
  let unsiginTx = null;
  let signTx = null;
  before(function() {
    seroSdk = SeroSdk({ baseURL: 'http://127.0.0.1:53716', isDebug: true });
  });
  after(async function() {
    const result = await seroSdk.account.clearUsedFlag('0xab189440849da94cd5519e9cb174f06af4f41f0897451a67aa16322757ec691a34cfa407ba1fa9ca8b1aa59f38066250cc7ac17e9710ece5779fe67dcbea2213');
    assert(result.result, 'clearUsedFlag error');
  });
  it.skip('createAccount', () => {
    const seedStr = getRandom(15);
    const result = seroSdk.account.createAccount(seedStr);
    console.log('createAccount', result);
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

  it.skip('generatePKr', () => {
    const result = seroSdk.account.generatePKr(newPk);
    console.log('generatePKr', result);
    const { pkr, rnd } = result;
    newPkrRandom = rnd;
    assert(pkr, 'pkr does not exist');
    assert(rnd, 'rnd does not exist');
  });

  it.skip('generateSkr', () => {
    const skr = seroSdk.account.generateSkr(newSk, newPkrRandom);
    console.log('generateSkr', skr);
    assert(skr, 'skr does not exist');
  });

  it.skip('getBalance', async () => {
    try {
      const result = await seroSdk.account.getBalance(`0x${newPk}`);
      assert(result.result >= 0, 'getBalance error');
    } catch (error) {
      assert(false, error);
    }
  });

  it.skip('getLastBlock', async () => {
    try {
      const result = await seroSdk.block.getLastBlock();
      assert(result.result.BlockNumber > 0, 'getLastBlock error');
    } catch (error) {
      assert(false, error);
    }
  });

  it.skip('getBlockByNumber', async () => {
    try {
      const result = await seroSdk.block.getBlockByNumber(109);
      assert(result.result.TxHashes.length > 0, 'getBlockByNumber error');
    } catch (error) {
      assert(false, error);
    }
  });

  it.skip('getBlocksInfo', async () => {
    try {
      const result = await seroSdk.block.getBlocksInfo(1251606, 1);
      assert(result.result.length > 0, 'getBlocksInfo error');
    } catch (error) {
      assert(false, error);
    }
  });

  it.skip('getBlockByTxHash', async () => {
    try {
      const result = await seroSdk.block.getBlockByTxHash('0xd54dfe82a3be34c87dacd4243ad9a879ceb39ef7d3a6dbd6e3f3b8c450125dfc');
      assert(result.result.BlockHash, 'getBlockByTxHash error');
    } catch (error) {
      assert(false, error);
    }
  });

  it('createTx', async () => {
    try {
      const result = await seroSdk.transfer.exchangeCreateTx({
        From: '0xab189440849da94cd5519e9cb174f06af4f41f0897451a67aa16322757ec691a34cfa407ba1fa9ca8b1aa59f38066250cc7ac17e9710ece5779fe67dcbea2213',
        RefundTo:
          '0x04d4f287b9421d8161ac05c4827e3985f2d0346d5742f4ac4c01dbcf6fea4a87e796fd5a1750c5be4f5a8b6e6ce24c30c7701bfa8c70a8c49f7a6b2beb962b80655155b4bf37585a0519a3bbba7a26f628074551c4c412b0c401b9ff27eb5086',
        Receptions: [
          {
            //接受者信息
            Addr:
              '0x0d463603790d755ecdf465907949cadd83a36f4f1e2fd19116e0a2f293bcf4011ce10443117f8b8952b27008f92c218637fa0c10459a26908bb19c63f063d9052b4d85dd9d6a3978185f8b73acee12f21313a7cf17f8facd26de7e7ca405dd07',
            Currency: 'SERO', //币名
            Value: 20 //币的数量
          }
        ]
      });
      assert(result.result, 'createTx error');
      unsiginTx = result.result;
    } catch (error) {
      assert(false, error);
    }
  });

  it('signTx', async () => {
    try {
      const result = await seroSdk.transfer.signTx(JSON.stringify(unsiginTx), 'TNeVdoCNthrjsPjaLIrKknfleFNMGNYNqewlnVezxGpoixByoTxtwDQZNLioIiFj');
      console.log('signTx', result);
      assert(result, 'signTx error');
      signTx = result;
    } catch (error) {
      assert(false, error);
    }
  });

  it('broadcast', async () => {
    try {
      const result = await seroSdk.transfer.exchangeBroadcast(JSON.parse(signTx));
      console.log('broadcast', result);
      assert.equal(result.error, undefined, 'broadcast error');
    } catch (error) {
      assert(false, error);
    }
  });

  it.skip('getTransactionReceipt', async () => {
    try {
      const result = await seroSdk.transfer.getTransactionReceipt('0x2264b9b0a847796148aec6fbdb94e0dbbe4b57a0207cd2f5318ec1228f2d7e36');
      assert.equal(result.result.transactionHash, '0x2264b9b0a847796148aec6fbdb94e0dbbe4b57a0207cd2f5318ec1228f2d7e36', 'getTransactionReceipt error');
    } catch (error) {
      assert(false, error);
    }
  });
});
