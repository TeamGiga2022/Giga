/*
Encryption implementation using AES-JS, without node.js the HTML requires the script listed below:
<script type="text/javascript" src="https://cdn.rawgit.com/ricmoo/aes-js/e27b99df/index.js"></script>
written by ak on 18/04/2022
*/
// An example 128-bit key and example 256-bit key
var key = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ];
var key_256 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
               16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28,
               29, 30, 31];

// The initialization vector (must be 16 bytes) needs to be pseudorandom but in this case is simply unique
var iv = [ 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36 ];

//character used for padding
var pad = "{";
// The input text must be a multiple of 16 bytes
var Text = 'TextMustBe16Byte';
// add padding to text to fit 16 byte blocks.

//padding to appropriate size for aes cipher
function padding(Text){
  let BlockSize = 16;
  let Padsize = (BlockSize - Text.length % BlockSize); //gives a number of characters to fit on the end.
  Text = Text+pad.repeat(Padsize)
  return (Text);

}
//unpadding curly braces once transfered and decrypted
function unpadding(decryptedText){
  workspace = decryptedText.slice(-16, -1); //padding is always added at the end
  for (let step = 0; step < 16; step++){
    if (workspace[step] == pad ){
      spot = (16 - step); //find how far from end the padding begins
      decryptedText = decryptedText.slice(0, -spot); //copy from begining to where padding begins
      break;
    }
  }
  return (decryptedText);
}

function encrypt(Text){
  //once padded to appropriate blocksize, convert text into bytes
  var textBytes = aesjs.utils.utf8.toBytes(padding(Text));
  //set up the cipher block chaining encryption from AES-JS library with keys
  var aesCbc = new aesjs.ModeOfOperation.cbc(key_256, iv);
  //perform the cbc encryption
  var encryptedBytes = aesCbc.encrypt(textBytes);
  return encryptedBytes;
}
// The cipher-block chaining mode of operation maintains internal
// state, so to decrypt a new instance must be instantiated.
function decrypt(encryptedBytes){
  var aesCbc = new aesjs.ModeOfOperation.cbc(key_256, iv);
  var decryptedBytes = aesCbc.decrypt(encryptedBytes);
  // Convert our bytes back into text
  var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
  return unpadding(decryptedText);
}

console.log(decrypt(encrypt(padding(Text))));
/*
//transfer this over: how does sockets work in JS

// To print or store the binary data, you may convert it to hex
var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
console.log(encryptedHex);
// "104fb073f9a131f2cab49184bb864ca2"

// When ready to decrypt the hex string, convert it back to bytes
var encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);
*/
