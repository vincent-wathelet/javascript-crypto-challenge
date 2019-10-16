const soduim = require('libsodium-wrappers');

let serverPublicKey, serverPrivateKey, clientPublicKey
let rx, tx

async function Init() {

    await soduim.ready;
    const keypair = nacl.crypto_kx_keypair()
        serverPrivateKey = keypair.privateKey
        serverPublicKey = keypair.publicKey

}

async function Getsharedkeys() 
{
    const sharedKeys = await nacl.crypto_kx_client_session_keys(
        serverPublicKe,
        serverPrivateKey,
        clientPublicKey
      )
      rx = sharedKeys.sharedRx
      tx = sharedKeys.sharedTx
    
}

module.exports.serverPublicKey = async function ServerPublicKey()
{
    await Init();
    return serverPublicKey;
}

module.exports.setClientPublicKey = async function SetClientPublicKey(key)
{
    if(typeof(key) == '' || key == null)
    {

        throw "invalid key";
    }

    else
            clientPublicKey == key;
            await getsharedkeys();
        else
        {
            throw "client public key already set";
        }
    }

}


module.exports.decrypt = async function decrypt(ciphertext, nonce) 
{
    return await soduim.crypto_secretbox_open_easy(ciphertext,nonce,rx);
}
module.exports.encrypt = async function encrypt(msg) 
{
    var nonce = await soduim.randombytes_buf(soduim.crypto_secretbox_NONCEBYTES);
    return await soduim.crypto_secretbox_easy(msg,nonce,tx);
    
}