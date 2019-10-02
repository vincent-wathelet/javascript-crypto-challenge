const soduim = require('libsodium-wrappers');
let key = null;

module.exports.setKey = async function setKey(keyi)
{
    key = keyi;
}

module.exports.decrypt = async  function decrypt(ciphertext, nonce)
{
    if(key == null)
    {
        throw 'no key';
    }
    else
    {
        return soduim.crypto_secretbox_open_easy(ciphertext,nonce,key);
    }
}
