# @dingocoin-js/addressing
JavaScript util library for manipulating Dingocoin addresses. It allows you to easily create Dingocoin private keys, convert them into Dingocoin addresses; to validate Dingocoin addresses, and to export and import your private keys.

## Installation
`npm install @dingocoin-js/addressing`

## Usage
```
// Import package.
const addressing = require('@dingocoin-js/addressing');

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
assert(privKey == addressing.fromWif(privKeyWif));
```

## Testing (mocha)
`npm test`

## Contributing
Please create a PR or drop a message in our community.

## Community
- [Dev forum](https://dev.dingocoin.org)
- [General Discord](https://discord.gg/y3J946HFQM)
- [Other channels](https://dingocoin.org/community)
