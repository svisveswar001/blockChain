const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { sha256 } = require("ethereum-cryptography/sha256");
const { utf8ToBytes } = require("ethereum-cryptography/utils");

const publicKey = '039cc405eb3481bd69586c3da4b4589e1cbc995066b1d7b77ba38fb09e20d7c3fb';
const privateKey = 'df7fce27ba74f9231141be7ed2c7033fe8e3068d084885b67ac3899f079a98a8';
/*
const privateKey = secp.secp256k1.utils.randomPrivateKey();
console.log('private key:', toHex(privateKey));

const publicKey = secp.secp256k1.getPublicKey(privateKey);
const slicedKey = keccak256(publicKey.slice(1).slice(-20));
console.log('public key:', toHex(publicKey));
console.log('sliced key:', toHex(slicedKey)); */

const messageHash = toHex(sha256(utf8ToBytes("Verify Sender")));
/*const signature = secp.secp256k1.sign(messageHash,privateKey);
//const isSigned = secp.secp256k1.verify(signature, messageHash, publicKey);

console.log("Message Hash", signature); */

secp.sign(secp.utils.hexToBytes(messageHash), privateKey, { recovered: true }).then(data => {
    const [signature, recovery_bit] = data
    let sig = toHex(signature);
    console.log("Your Signature:", sig)
    console.log("Your Recovery Bit:", recovery_bit)
    let fullSig = sig + recovery_bit.toString()
    console.log("Copy and paste this as the full signature, this has the recovery bit attached to the end:\n", fullSig)
})
