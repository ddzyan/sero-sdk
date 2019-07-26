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
    seroSdk = SeroSdk({ baseURL: 'http://127.0.0.1:53716', isDebug: false });
  });
  after(async function() {
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

  it.skip('createTx', async () => {
    try {
      const result = await seroSdk.transfer.createTx({
        From: '0x6d1e492a0461c1a1a5043fa241a907ed21fb0173532af9bfec3643e19986482be2f737a74455d239a0f87f9208dbdcace4d51477c53a4c69f91c7180355d0c91',
        RefundTo:
          '0x09ec7a0ad0d5fb0ba2c4f97d69caa22b0339ff3aeb58d403fc27a7106cd93030470a7de49b4c43f47b030cb7219ea36bd14db224da8a3a55c007e16319c96e91a5f960173381c24d74da2e88c39e72f5933989ed606db286b30c30aa0c4a7786',
        Receptions: [
          {
            //接受者信息
            Addr:
              '0x21a69e93b087cc87555ab9551b638d3957c1ff0d7eaf60da97af1d0331dd56a2a08761ae4d2f508fdf8a3f771cb3702f6e9e65fb2ac23da1ef5d176e12a2851ae6d6c91f7de41a20d8f54259416fb8d446c74a099b18c5f2c65adb8e5dd7bf2d',
            Currency: 'SERO', //币名
            Value: 9975000000000019 //币的数量
          }
        ]
      });
      assert(result.result, 'createTx error');
      unsiginTx = result.result;
    } catch (error) {
      assert(false, error);
    }
  });

  it.skip('signTx', async () => {
    try {
      const result = await seroSdk.transfer.signTx(JSON.stringify(unsiginTx), 'gPaeGWHPixgHjhc');
      console.log('signTx', result);
      assert(result, 'signTx error');
      signTx = result;
    } catch (error) {
      assert(false, error);
    }
  });

  it.skip('broadcast', async () => {
    try {
      const result = await seroSdk.transfer.broadcast(JSON.parse(signTx));
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
