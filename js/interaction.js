import { shift_cipher_encryption, shift_cipher_decryption, caesar_brute_force_decrypt} from './caesar-cipher.js';


const caesarEncryptButton = document.getElementById('caesar-encrypt-btn');
const caesarDecryptButton = document.getElementById('caesar-decrypt-btn');

caesarEncryptButton.addEventListener('click', () => {
    const plaintext = document.getElementById('caesar-input').value;
    if(plaintext.length === 0){
        resultDiv.innerHTML = `<p>Please Enter Valid Input</p>`;
        return;
    }
    const ciphertext = shift_cipher_encryption(plaintext, 3);
    const resultDiv = document.getElementById('caesar-result');
    resultDiv.innerHTML = `<p>${ciphertext}</p>`;
});

caesarDecryptButton.addEventListener('click', () => {
    const ciphertext = document.getElementById('caesar-input').value;
    if(ciphertext.length === 0){
        resultDiv.innerHTML = `<p>Please Enter Valid Input</p>`;
        return;
    }
    const plaintext = shift_cipher_decryption(ciphertext, 3);
    const resultDiv = document.getElementById('caesar-result');
    resultDiv.innerHTML = `<p>${plaintext}</p>`;
});

const shiftEncryptButton = document.getElementById('shift-encrypt-btn');
const shiftDecryptButton = document.getElementById('shift-decrypt-btn');
const shiftBruteForceButton = document.getElementById('shift-brute-force-btn');
const shiftResultDiv = document.getElementById('shift-result');

shiftEncryptButton.addEventListener('click', () => {
    const plaintext = document.getElementById('shift-input').value;
    const key = parseInt(document.getElementById('shift-key').value);
    const ciphertext = shift_cipher_encryption(plaintext, key);
    shiftResultDiv.innerHTML = `<p>${ciphertext}</p>`;
});

shiftDecryptButton.addEventListener('click', () => {
    const ciphertext = document.getElementById('shift-input').value;
    const key = parseInt(document.getElementById('shift-key').value);
    const plaintext = shift_cipher_decryption(ciphertext, key);
    shiftResultDiv.innerHTML = `<p>${plaintext}</p>`;
});

shiftBruteForceButton.addEventListener('click', () => {
    const ciphertext = document.getElementById('shift-input').value;
    if(ciphertext.length === 0){
        shiftResultDiv.innerHTML = `<p>Please Enter Valid Input</p>`;
        return;
    }
    const results = caesar_brute_force_decrypt(ciphertext);
    shiftResultDiv.innerHTML = results.map((result, index) => `<p>k=${index+1}: ${result.plaintext}</p>`).join('');
});