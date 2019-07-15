const assert = require('assert');
const SeroSdk = require('../lib');

describe('sero sdk should work', function() {
  let seroSdk = null;
  before(function() {
    seroSdk = SeroSdk({ baseURL: 'http://172.31.225.20:53716' }, true);
  });
  it('createAccount', () => {
    const result = seroSdk.account.createAccount('fd1b401d2bbfa09fba577b398b09b5ea075bd8f37773095c6e62271a4b080977');
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
        assert(Number.parseInt(result.result) > 0, 'balance error');
      } else {
        throw result.error;
      }
    } catch (error) {
      assert(false, JSON.stringify(error));
    }
  });
});
