const assert = require('assert');
const SeroSdk = require('../lib');
const randomstring = require('randomstring');

const getRandom = function (length = 15, charset = 'alphabetic') {
  const randomString = randomstring.generate({
    length,
    charset
  });
  return randomString;
};

describe('sero sdk should work', function () {
  let seroSdk = null;
  let newPkrRandom = null;
  let newSk = null;
  let newPk = null;
  let unsiginTx = null;
  let signTx = null;
  before(function () {
    seroSdk = SeroSdk({ baseURL: 'http://10.199.6.34:53716', isDebug: true });
  });
  after(async function () {
    const result = await seroSdk.account.clearUsedFlag('0xab189440849da94cd5519e9cb174f06af4f41f0897451a67aa16322757ec691a34cfa407ba1fa9ca8b1aa59f38066250cc7ac17e9710ece5779fe67dcbea2213');
    assert(result.result, 'clearUsedFlag error');
  });
  it('createAccount', () => {
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

  it('generatePKr', () => {
    const result = seroSdk.account.generatePKr(newPk);
    console.log('generatePKr', result);
    const { pkr, rnd } = result;
    newPkrRandom = rnd;
    assert(pkr, 'pkr does not exist');
    assert(rnd, 'rnd does not exist');
  });

  it('generateSkr', () => {
    const skr = seroSdk.account.generateSkr(newSk, newPkrRandom);
    console.log('generateSkr', skr);
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
            //接受者信息 pkrhash
            Addr:
              '0xaa65700d80a078362e7860ae2b0147f35035d6fb09c3f3edf99054f274247903b5e587428a59173bead404e26fbaa3c28c13ce093a87d6775f9683a2f0cfe58286a257513a24cdde4465cf3952fdfd9069b10546412d342693b056eecc6cc203',
            Currency: 'SERO', //币名
            Value: 192499979999999 //币的数量
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

  it('getTransactionReceipt', async () => {
    try {
      const result = await seroSdk.transfer.getTransactionReceipt('0x2264b9b0a847796148aec6fbdb94e0dbbe4b57a0207cd2f5318ec1228f2d7e36');
      assert.equal(result.result.transactionHash, '0x2264b9b0a847796148aec6fbdb94e0dbbe4b57a0207cd2f5318ec1228f2d7e36', 'getTransactionReceipt error');
    } catch (error) {
      assert(false, error);
    }
  });
});
