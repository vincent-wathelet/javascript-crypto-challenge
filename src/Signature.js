const soduim = require('libsodium-wrappers');
let keypair = null;
let loadLibsodium = async () => await soduim.ready;

(async () => {
    await loadLibsodium();
    keypair = soduim.crypto_sign_keypair();
})();

module.exports.verifyingKey = async function verifyingKey()
{
    await loadLibsodium();
    
    return keypair.publicKey;


}

module.exports.sign = async function sign(msg)
{
    return soduim.crypto_sign(msg,keypair.privateKey);
}