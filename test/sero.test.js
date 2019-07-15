const assert = require('assert');
const { Account, Block, Transfer } = require('../lib');

describe('sero sdk should work', function() {
  it('createAccount', () => {
    const result = Account.createAccount();
    const { sk, tk_hex, pk, tk_base58, pk_base58 } = result;
    assert(sk, 'sk does not exist');
    assert(tk_hex, 'tk_hex does not exist');
    assert(pk, 'pk does not exist');
    assert(tk_base58, 'tk_base58 does not exist');
    assert(tk_base58, 'tk_base58 does not exist');
    assert(pk_base58, 'pk_base58 does not exist');
  });
});
