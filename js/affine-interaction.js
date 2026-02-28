import {affineCipherEncrypt, affineCipherDecrypt, affine_brute_force_decrypt} from './affine-cipher.js'

const affineEncryptButton = document.getElementById('affine-encrypt-btn');
const affineDecryptButton = document.getElementById('affine-decrypt-btn');
const affineBruteForceButton = document.getElementById('affine-brute-force-btn');
const affineResultDiv = document.getElementById('affine-result');
const affineInput = document.getElementById('affine-input');
const affineKeyA = document.getElementById('affine-key-a');
const affineKeyB = document.getElementById('affine-key-b');

affineEncryptButton.addEventListener('click', () => {
    const text = affineInput.value;
    const keyA = parseInt(affineKeyA.value, 10);
    const keyB = parseInt(affineKeyB.value, 10);
    const encryptedText = affineCipherEncrypt(text, keyA, keyB);
    affineResultDiv.textContent = `Encrypted: ${encryptedText}`;
}
);

affineDecryptButton.addEventListener('click', () => {
    const text = affineInput.value;
    const keyA = parseInt(affineKeyA.value, 10);
    const keyB = parseInt(affineKeyB.value, 10);
    if(isNaN(keyA) || isNaN(keyB)) {
        affineResultDiv.textContent = 'Invalid keys!';
        return;    
    }
    const decryptedText = affineCipherDecrypt(text, keyA, keyB);
    affineResultDiv.textContent = `Decrypted: ${decryptedText}`;
});

affineBruteForceButton.addEventListener('click', () => {
    const text = affineInput.value;
    const decryptedTexts = affine_brute_force_decrypt(text);
    affineResultDiv.innerHTML = `<strong>Brute Force Results:</strong><br>${decryptedTexts.map((result, index) => `<strong>KeyA: ${result.a} and KeyB: ${result.b} Decryption:</strong> ${result.plaintext}`).join('<br>')}`;
});


