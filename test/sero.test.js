const assert = require('assert');
const SeroSdk = require('../lib');

describe('sero sdk should work', function() {
  let seroSdk = null;
  before(function() {
    seroSdk = SeroSdk({ baseURL: 'http://172.31.225.20:53716' });
  });
  it('createAccount', () => {
    const result = this.seroSdk.account.createAccount();
    console.log(result);
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
      const balance = await this.seroSdk.account.getBalance('123456');
      assert(Number.parseInt(balance) > 0, 'balance error');
    } catch (error) {
      assert(false, error);
    }
  });
});
