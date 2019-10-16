const soduim = require('libsodium-wrappers');

let serverPublicKey, serverPrivateKey, clientPublicKey;
let rx, tx;

async function Init() {

    await soduim.ready;
    const keypair = soduim.crypto_kx_keypair();
    serverPrivateKey = keypair.privateKey;
    serverPublicKey = keypair.publicKey;

}

/*async function Getsharedkeys() 
{
    await Init();
    const sharedKeys = await soduim.crypto_kx_server_session_keys(
        serverPublicKey,
        serverPrivateKey,
        clientPublicKey
      );
      rx = sharedKeys.sharedRx;
      tx = sharedKeys.sharedTx;
    
}*/

module.exports.serverPublicKey = async function ServerPublicKey()
{
    await Init();
    return serverPublicKey;
}

module.exports.setClientPublicKey =  function SetClientPublicKey(key)
{

        if(key != null && (typeof(clientPublicKey) == 'undefined' || clientPublicKey == null || clientPublicKey == key ) )
        {
            clientPublicKey = key;
        }
        else
        {
            throw "client public key already set";
        }

    

}


module.exports.decrypt =  function decrypt(ciphertext, nonce) 
{
    const sharedKeys = soduim.crypto_kx_server_session_keys(
        serverPublicKey,
        serverPrivateKey,
        clientPublicKey
      );
    return  soduim.crypto_secretbox_open_easy(ciphertext,nonce,sharedKeys.sharedRx);
}
module.exports.encrypt =  function encrypt(msg) 
{
    const sharedKeys = soduim.crypto_kx_server_session_keys(
        serverPublicKey,
        serverPrivateKey,
        clientPublicKey
      );
    var nonce =  soduim.randombytes_buf(soduim.crypto_secretbox_NONCEBYTES);
    var ciphertext = soduim.crypto_secretbox_easy(msg,nonce,sharedKeys.sharedTx);
    return { ciphertext, nonce};
    
}