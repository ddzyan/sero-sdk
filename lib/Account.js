const { Account: account } = require('js-sero-client');

class Account {
  static createAccount() {
    let seed = Buffer.alloc(32, 'fd1b401d2bbfa09fba577b398b09b5ea075bd8f37773095c6e62271a4b080977', 'hex');
    let keys = account.NewKeys(seed); //seed 可以直接用字符串(hex|base58)
    let sk = keys.sk.toString('hex');
    let tk_hex = keys.tk.toString('hex');
    let tk_base58 = keys.tk.ToBase58();
    let pk = keys.pk.toString('hex');
    let pk_base58 = keys.pk.ToBase58();

    return { sk, tk_hex, pk, tk_base58, pk_base58 };
  }
}

module.exports = Account;
