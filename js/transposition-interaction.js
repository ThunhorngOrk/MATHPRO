import {transpositionCipherDecrypt, transpositionCipherEncrypt} from './transposition-cipher.js';

const transpositionCipherEncryptButton = document.getElementById('transposition-encrypt-btn');
const transpositionCipherDecryptButton = document.getElementById('transposition-decrypt-btn');
const transpositionInput = document.getElementById('transposition-input');
const transpositionKey = document.getElementById('transposition-key');
const transpositionResult = document.getElementById('transposition-result');

transpositionCipherEncryptButton.addEventListener('click', () => {
    const plaintext = transpositionInput.value;
    const key = transpositionKey.value;
    const ciphertext = transpositionCipherEncrypt(plaintext, key);
    transpositionResult.innerHTML = `${ciphertext}`;
    transpositionResult.value = ciphertext;
});

transpositionCipherDecryptButton.addEventListener('click', () => {
    const ciphertext = transpositionInput.value;
    const key = transpositionKey.value;
    const plaintext = transpositionCipherDecrypt(ciphertext, key);
    transpositionResult.innerHTML = `${plaintext}`;
    transpositionResult.value = plaintext;
});