import { generateRSAKeys, rsaEncrypt, rsaDecrypt } from './rsa-cipher.js';

const rsaEncryptButton = document.getElementById('rsa-encrypt-btn');
const rsaEncryptInput = document.getElementById('rsa-encrypt-input');
const rsaKey_e = document.getElementById('rsa-encrypt-key-e');
const rsaKey_n = document.getElementById('rsa-encrypt-key-n');
const rsaEncryptResult = document.getElementById('rsa-encrypt-result');

rsaEncryptButton.addEventListener('click', () => {
  const message = rsaEncryptInput.value;
  const e = parseInt(rsaKey_e.value, 10);
  const n = parseInt(rsaKey_n.value, 10);

  if (!message || isNaN(e) || isNaN(n)) {
    rsaEncryptResult.textContent = 'Please provide a valid message and keys.';
    return;
  }

  try {
    const encryptedMessage = rsaEncrypt(message, { e, n });
    rsaEncryptResult.innerHTML = `<p class="w-[340px]"> Encrypted Message: ${encryptedMessage}<p>`;
  } catch (error) {
    console.error('Encryption error:', error);
    rsaEncryptResult.textContent = 'Encryption failed. Please check your input.';
  }
});

const rsaDecryptButton = document.getElementById('rsa-decrypt-btn');
const rsaDecryptInput = document.getElementById('rsa-decrypt-input');
const rsaKey_d = document.getElementById('rsa-decrypt-key-d');
const rsaKey_n_decrypt = document.getElementById('rsa-decrypt-key-n');
const rsaDecryptResult = document.getElementById('rsa-decrypt-result');

rsaDecryptButton.addEventListener('click', () => {
  const encryptedMessage = rsaDecryptInput.value;
  const d = parseInt(rsaKey_d.value, 10);
  const n = parseInt(rsaKey_n_decrypt.value, 10);

  if (!encryptedMessage || isNaN(d) || isNaN(n)) {
    rsaDecryptResult.textContent = 'Please provide a valid encrypted message and keys.';
    return;
  }

  try {
    const decryptedMessage = rsaDecrypt(encryptedMessage, { d, n });
    rsaDecryptResult.textContent = `Decrypted Message: ${decryptedMessage}`;
  } catch (error) {
    console.error('Decryption error:', error);
    rsaDecryptResult.textContent = 'Decryption failed. Please check your input.';
  }
});