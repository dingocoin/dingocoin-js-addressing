const crypto = require("crypto");
const secp256k1 = require("secp256k1");
const bs58 = require("bs58");

const isBs58 = (x) => {
  try {
    bs58.decode(x);
    return true;
  } catch (e) {
    return false;
  }
};

// Helper bs58 decode.
const decodeBs58 = (x) => {
  return Buffer.from(bs58.decode(x));
}

// Helper SHA256.
const sha256 = (x) => {
  return crypto.createHash("sha256").update(x).digest();
};

// Helper RIPEMD160.
const ripemd160 = (x) => {
  return crypto.createHash("ripemd160").update(x).digest();
};

// Creates a random Dingocoin private key.
const randomPrivateKey = () => {
  return crypto.randomBytes(32);
};

// Validate WIF.
const isWif = (wif) => {
  if (!isBs58(wif)) {
    return false;
  }
  const raw = decodeBs58(wif);
  if (raw.length !== 37 && raw.length !== 38) {
    return false;
  }
  if (raw[0] !== 0x9e) {
    return false;
  }
  const checksum = sha256(sha256(raw.slice(0, raw.length - 4)));
  return raw.slice(raw.length - 4, raw.length).equals(checksum.slice(0, 4));
};

// Export private key to WIF.
const toWif = (privKey) => {
  const header = Buffer.from([0x9e]);
  const data = privKey;
  const extra = Buffer.from([0x01]);
  const checksum = sha256(sha256(Buffer.concat([header, data, extra])));
  return bs58.encode(
    Buffer.concat([header, data, extra, checksum.slice(0, 4)])
  );
};

// Import private key from WIF.
const fromWif = (wif) => {
  if (!isWif(wif)) {
    throw new Error("Incorrect or unsupported format");
  }
  return decodeBs58(wif).slice(1, 1 + 32);
};

// Validate Dingocoin address.
const isAddress = (address) => {
  if (!isBs58(address)) {
    return false;
  }
  const raw = decodeBs58(address);

  if (raw.length !== 25) {
    return false;
  }
  if (raw[0] !== 0x16 && raw[0] !== 0x1e) {
    return false;
  }
  const checksum = sha256(sha256(raw.slice(0, 21)));
  return raw.slice(21, 25).equals(checksum.slice(0, 4));
};

// SECP256k1 private key to public key.
const privateKeyToPublicKey = (privKey) => {
  const pubKey = secp256k1.publicKeyCreate(
    new Uint8Array(privKey),
    (compressed = true)
  );
  return Buffer.from(pubKey);
};

// Create Dingocoin address from public key.
const publicKeyToAddress = (pubKey) => {
  const data = ripemd160(sha256(pubKey));
  const header = Buffer.from([0x1e]);
  const checksum = sha256(sha256(Buffer.concat([header, data]))).slice(0, 4);
  return bs58.encode(Buffer.concat([header, data, checksum]));
};

// Create Dingocoin address from secp256k1 priv key.
const toAddress = (privKey) => {
  return publicKeyToAddress(privateKeyToPublicKey(privKey));
};

module.exports = {
  randomPrivateKey,
  isWif,
  toWif,
  fromWif,
  isAddress,
  toAddress
};
