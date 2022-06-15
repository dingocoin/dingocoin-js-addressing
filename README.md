# dingocoin-js-addressing
Dingocoin address manipulation utils

## Installation
`npm install @dingocoin-js/addressing`

## Usage
```
// Import package.
const address = require('@dingocoin-js/addressing');

// Creating random private key.
const privKey = addressing.randomPrivateKey();

// Deriving Dingocoin address from private key.
const address = addressing.toAddress(privKey);

// Validate Dingocoin address.
console.log(addressing.isAddress(address));

// Export private key to Wallet Import Format (WIF).
const privKeyWif = addressing.toWif(privKey);

// Validate private key in WIF.
console.log(addressing.isWif(privKeyWif));

// Import private key from  WIF.
assert(privKey = addressing.fromWif(privKeyWif));
```

