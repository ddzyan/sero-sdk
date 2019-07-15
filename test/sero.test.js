const assert = require('assert');
const SeroSdk = require('../lib');

describe('sero sdk should work', function() {
  before(function() {
    const seroSdk = new SeroSdk('http://172.31.225.20:53716');
    Object.assign(this, seroSdk);
  });
  it('createAccount', () => {
    const result = this.account.createAccount();
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
      const balance = await this.account.getBalance('123456');
      assert(Number.parseInt(balance) > 0, 'balance error');
    } catch (error) {
      assert(false, error);
    }
  });
});
