const addressing = require("../");
const assert = require('assert');

describe("addressing", () => {
  let privKey = null;
  it("Generating random privKey", () => {
    privKey = addressing.randomPrivateKey();
  });
  it("Conversion to WIF", () => {
    addressing.toWif(privKey);
  });
  it("Validation of WIF", () => {
    assert(addressing.isWif(addressing.toWif(privKey)));
  });
  it("Conversion from WIF", () => {
    assert(addressing.fromWif(addressing.toWif(privKey)).equals(privKey));
  });
  it("Conversion to address", () => {
    addressing.toAddress(privKey);
  });
  it("Validation of address", () => {
    assert(addressing.isAddress(addressing.toAddress(privKey)));
  });
});
