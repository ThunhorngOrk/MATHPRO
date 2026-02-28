import {generateRSAKeys} from './rsa-cipher.js';

const input_p = document.getElementById('rsa-keygen-p');
const input_q = document.getElementById('rsa-keygen-q');
const keygenButton = document.getElementById('rsa-keygen-btn');
const output = document.getElementById('rsa-keygen-result');

keygenButton.addEventListener('click', () => {
    const p = BigInt(input_p.value);
    const q = BigInt(input_q.value);

    if (p <= 1n || q <= 1n) {
        output.textContent = 'Both p and q must be greater than 1.';
        return;
    }

    const { n, e, d } = generateRSAKeys(p, q);
    output.innerHTML = `<span class="text-green-700">Public Key: (e: ${e}, n: ${n})</span> <span class="text-red-700">Private Key: (d: ${d}, n: ${n})</span>`;
});
