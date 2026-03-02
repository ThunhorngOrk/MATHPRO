
  // ============ UTILITY FUNCTIONS ============
        function cleanText(text) {
            return text.toString().toUpperCase().replace(/[^A-Z]/g, '');
        }

        // ============ CAESAR / SHIFT CIPHER FUNCTIONS ============
        function shift_cipher_encryption(text, shift) {
            if (!text) return '';
            shift = parseInt(shift) % 26;
            if (isNaN(shift)) shift = 0;
            
            return text.toString().toUpperCase().split('').map(char => {
                if (char.match(/[A-Z]/)) {
                    let code = char.charCodeAt(0);
                    let shifted = ((code - 65 + shift) % 26 + 26) % 26 + 65;
                    return String.fromCharCode(shifted);
                }
                return char;
            }).join('');
        }

        function shift_cipher_decryption(text, shift) {
            return shift_cipher_encryption(text, 26 - (parseInt(shift) % 26));
        }

        function caesar_brute_force_decrypt(ciphertext) {
            let results = [];
            for (let shift = 1; shift <= 25; shift++) {
                results.push({
                    shift: shift,
                    plaintext: shift_cipher_decryption(ciphertext, shift)
                });
            }
            return results;
        }

        // ============ AFFINE CIPHER FUNCTIONS ============
        function modInverse(a, m) {
            a = ((a % m) + m) % m;
            for (let x = 1; x < m; x++) {
                if ((a * x) % m === 1) return x;
            }
            return 1;
        }

        function isCoprime(a, m) {
            a = Math.abs(a);
            let b = m;
            while (b) {
                let t = b;
                b = a % b;
                a = t;
            }
            return a === 1;
        }

        function affineCipherEncrypt(text, a, b) {
            if (!text) return '';
            a = parseInt(a);
            b = parseInt(b);
            
            if (isNaN(a) || isNaN(b)) return 'Invalid keys';
            if (!isCoprime(a, 26)) return 'Key a must be coprime to 26';
            
            a = ((a % 26) + 26) % 26;
            b = ((b % 26) + 26) % 26;
            
            return text.toString().toUpperCase().split('').map(char => {
                if (char.match(/[A-Z]/)) {
                    let x = char.charCodeAt(0) - 65;
                    let encrypted = (a * x + b) % 26;
                    return String.fromCharCode(encrypted + 65);
                }
                return char;
            }).join('');
        }

        function affineCipherDecrypt(text, a, b) {
            if (!text) return '';
            a = parseInt(a);
            b = parseInt(b);
            
            if (isNaN(a) || isNaN(b)) return 'Invalid keys';
            if (!isCoprime(a, 26)) return 'Key a must be coprime to 26';
            
            a = ((a % 26) + 26) % 26;
            b = ((b % 26) + 26) % 26;
            
            let a_inv = modInverse(a, 26);
            
            return text.toString().toUpperCase().split('').map(char => {
                if (char.match(/[A-Z]/)) {
                    let y = char.charCodeAt(0) - 65;
                    let decrypted = (a_inv * ((y - b + 26) % 26)) % 26;
                    return String.fromCharCode(decrypted + 65);
                }
                return char;
            }).join('');
        }

        function affine_brute_force_decrypt(ciphertext) {
            let results = [];
            const possibleA = [1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25];
            
            for (let a of possibleA) {
                for (let b = 0; b < 26; b++) {
                    try {
                        let plaintext = affineCipherDecrypt(ciphertext, a, b);
                        if (plaintext && !plaintext.includes('Invalid')) {
                            results.push({ a, b, plaintext });
                        }
                    } catch (e) {}
                }
            }
            return results;
        }

        // ============ TRANSPOSITION CIPHER FUNCTIONS ============
        function transpositionCipherEncrypt(text, key) {
            if (!text || !key) return '';
            
            text = text.toString().replace(/\s+/g, '').toUpperCase();
            key = key.toString();
            
            let cols = key.length;
            let rows = Math.ceil(text.length / cols);
            
            let grid = [];
            let charIndex = 0;
            for (let i = 0; i < rows; i++) {
                grid[i] = [];
                for (let j = 0; j < cols; j++) {
                    if (charIndex < text.length) {
                        grid[i][j] = text[charIndex];
                    } else {
                        grid[i][j] = 'X';
                    }
                    charIndex++;
                }
            }
            
            let keyOrder = key.split('').map((char, index) => ({ 
                char: parseInt(char) || index, 
                index 
            })).sort((a, b) => a.char - b.char);
            
            let result = '';
            for (let item of keyOrder) {
                let col = item.index;
                for (let row = 0; row < rows; row++) {
                    result += grid[row][col];
                }
            }
            
            return result;
        }

        function transpositionCipherDecrypt(text, key) {
            if (!text || !key) return '';
            
            text = text.toString().toUpperCase();
            key = key.toString();
            
            let cols = key.length;
            let rows = Math.ceil(text.length / cols);
            
            let keyOrder = key.split('').map((char, index) => ({ 
                char: parseInt(char) || index, 
                originalIndex: index 
            })).sort((a, b) => a.char - b.char);
            
            let totalChars = text.length;
            let baseRows = Math.floor(totalChars / cols);
            let extraCols = totalChars % cols;
            
            let colLengths = new Array(cols).fill(baseRows);
            for (let i = 0; i < extraCols; i++) {
                colLengths[i]++;
            }
            
            let grid = Array(rows).fill().map(() => Array(cols).fill(''));
            
            let pos = 0;
            for (let i = 0; i < keyOrder.length; i++) {
                let col = keyOrder[i].originalIndex;
                for (let row = 0; row < colLengths[i]; row++) {
                    if (pos < text.length) {
                        grid[row][col] = text[pos++];
                    }
                }
            }
            
            let result = '';
            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    result += grid[row][col];
                }
            }
            
            return result.replace(/X+$/, '');
        }

        // ============ RSA FUNCTIONS ============
        function gcd(a, b) {
            while (b !== 0) {
                let t = b;
                b = a % b;
                a = t;
            }
            return a;
        }

        function modInverseBigInt(e, phi) {
            let m0 = phi;
            let y = 0;
            let x = 1;
            
            if (phi === 1) return 0;
            
            while (e > 1) {
                let q = Math.floor(e / phi);
                let t = phi;
                
                phi = e % phi;
                e = t;
                t = y;
                
                y = x - q * y;
                x = t;
            }
            
            if (x < 0) x += m0;
            
            return x;
        }

        function generateRSAKeys(p, q) {
            p = parseInt(p);
            q = parseInt(q);
            
            let n = p * q;
            let phi = (p - 1) * (q - 1);
            
            let e = 65537;
            
            while (gcd(e, phi) !== 1) {
                e += 2;
            }
            
            let d = modInverseBigInt(e, phi);
            
            return {
                n: n.toString(),
                e: e.toString(),
                d: d.toString()
            };
        }

        function rsaEncrypt(message, publicKey) {
            let { e, n } = publicKey;
            e = parseInt(e);
            n = parseInt(n);
            
            return message.toString().split('').map(char => {
                let m = char.charCodeAt(0);
                let result = 1;
                for (let i = 0; i < e; i++) {
                    result = (result * m) % n;
                }
                return result.toString();
            }).join(',');
        }

        function rsaDecrypt(encryptedMessage, privateKey) {
            let { d, n } = privateKey;
            d = parseInt(d);
            n = parseInt(n);
            
            return encryptedMessage.toString().split(',').map(numStr => {
                if (!numStr.trim()) return '';
                let c = parseInt(numStr.trim());
                let result = 1;
                for (let i = 0; i < d; i++) {
                    result = (result * c) % n;
                }
                return String.fromCharCode(result);
            }).join('');
        }

        // ============ EVENT LISTENERS ============
        document.addEventListener('DOMContentLoaded', function() {
            console.log('DOM loaded - setting up event listeners');
            
            // Caesar Cipher
            const caesarEncryptBtn = document.getElementById('caesar-encrypt-btn');
            const caesarDecryptBtn = document.getElementById('caesar-decrypt-btn');
            const caesarInput = document.getElementById('caesar-input');
            const caesarResult = document.getElementById('caesar-result');

            if (caesarEncryptBtn) {
                caesarEncryptBtn.addEventListener('click', function() {
                    const text = caesarInput.value;
                    if (!text) {
                        caesarResult.textContent = 'Please enter some text';
                        return;
                    }
                    const encrypted = shift_cipher_encryption(text, 3);
                    caesarResult.textContent = encrypted;
                });
            }

            if (caesarDecryptBtn) {
                caesarDecryptBtn.addEventListener('click', function() {
                    const text = caesarInput.value;
                    if (!text) {
                        caesarResult.textContent = 'Please enter some text';
                        return;
                    }
                    const decrypted = shift_cipher_decryption(text, 3);
                    caesarResult.textContent = decrypted;
                });
            }

            // Shift Cipher
            const shiftEncryptBtn = document.getElementById('shift-encrypt-btn');
            const shiftDecryptBtn = document.getElementById('shift-decrypt-btn');
            const shiftBruteForceBtn = document.getElementById('shift-brute-force-btn');
            const shiftInput = document.getElementById('shift-input');
            const shiftKey = document.getElementById('shift-key');
            const shiftResult = document.getElementById('shift-result');

            if (shiftEncryptBtn) {
                shiftEncryptBtn.addEventListener('click', function() {
                    const text = shiftInput.value;
                    const key = shiftKey.value;
                    
                    if (!text) {
                        shiftResult.textContent = 'Please enter some text';
                        return;
                    }
                    if (!key) {
                        shiftResult.textContent = 'Please enter a key';
                        return;
                    }
                    
                    const encrypted = shift_cipher_encryption(text, key);
                    shiftResult.textContent = encrypted;
                });
            }

            if (shiftDecryptBtn) {
                shiftDecryptBtn.addEventListener('click', function() {
                    const text = shiftInput.value;
                    const key = shiftKey.value;
                    
                    if (!text) {
                        shiftResult.textContent = 'Please enter some text';
                        return;
                    }
                    if (!key) {
                        shiftResult.textContent = 'Please enter a key';
                        return;
                    }
                    
                    const decrypted = shift_cipher_decryption(text, key);
                    shiftResult.textContent = decrypted;
                });
            }

            if (shiftBruteForceBtn) {
                shiftBruteForceBtn.addEventListener('click', function() {
                    const text = shiftInput.value;
                    
                    if (!text) {
                        shiftResult.textContent = 'Please enter some text';
                        return;
                    }
                    
                    const results = caesar_brute_force_decrypt(text);
                    let resultText = '';
                    for (let i = 0; i < results.length; i++) {
                        resultText += `Shift ${results[i].shift}: ${results[i].plaintext}\n`;
                    }
                    shiftResult.textContent = resultText;
                    shiftResult.style.whiteSpace = 'pre-line';
                });
            }

           // Affine Cipher Event Listeners
const affineEncryptBtn = document.getElementById('affine-encrypt-btn');
const affineDecryptBtn = document.getElementById('affine-decrypt-btn');
const affineBruteForceBtn = document.getElementById('affine-brute-force-btn');
const affineInput = document.getElementById('affine-input');
const affineKeyA = document.getElementById('affine-key-a');
const affineKeyB = document.getElementById('affine-key-b');
const affineResult = document.getElementById('affine-result');

if (affineEncryptBtn) {
    affineEncryptBtn.addEventListener('click', function() {
        console.log('Affine encrypt clicked');
        const text = affineInput.value;
        const keyA = affineKeyA.value;
        const keyB = affineKeyB.value;
        
        if (!text) {
            affineResult.textContent = 'Please enter some text';
            return;
        }
        if (!keyA || !keyB) {
            affineResult.textContent = 'Please enter both keys a and b';
            return;
        }
        
        const encrypted = affineCipherEncrypt(text, keyA, keyB);
        affineResult.textContent = encrypted;
    });
}

if (affineDecryptBtn) {
    affineDecryptBtn.addEventListener('click', function() {
        console.log('Affine decrypt clicked');
        const text = affineInput.value;
        const keyA = affineKeyA.value;
        const keyB = affineKeyB.value;
        
        if (!text) {
            affineResult.textContent = 'Please enter some text';
            return;
        }
        if (!keyA || !keyB) {
            affineResult.textContent = 'Please enter both keys a and b';
            return;
        }
        
        const decrypted = affineCipherDecrypt(text, keyA, keyB);
        affineResult.textContent = decrypted;
    });
}

if (affineBruteForceBtn) {
    affineBruteForceBtn.addEventListener('click', function() {
        console.log('Affine brute force clicked');
        const text = affineInput.value;
        
        if (!text) {
            affineResult.textContent = 'Please enter some text';
            return;
        }
        
        const results = affine_brute_force_decrypt(text);
        let resultText = 'Brute Force Results (first 10):\n';
        for (let i = 0; i < Math.min(10, results.length); i++) {
            resultText += `a=${results[i].a}, b=${results[i].b}: ${results[i].plaintext}\n`;
        }
        affineResult.textContent = resultText;
        affineResult.style.whiteSpace = 'pre-line';
    });
}

// Transposition Cipher Event Listeners
const transpositionEncryptBtn = document.getElementById('transposition-encrypt-btn');
const transpositionDecryptBtn = document.getElementById('transposition-decrypt-btn');
const transpositionInput = document.getElementById('transposition-input');
const transpositionKey = document.getElementById('transposition-key');
const transpositionResult = document.getElementById('transposition-result');

if (transpositionEncryptBtn) {
    transpositionEncryptBtn.addEventListener('click', function() {
        console.log('Transposition encrypt clicked');
        const text = transpositionInput.value;
        const key = transpositionKey.value;
        
        if (!text) {
            transpositionResult.textContent = 'Please enter some text';
            return;
        }
        if (!key) {
            transpositionResult.textContent = 'Please enter a key';
            return;
        }
        
        const encrypted = transpositionCipherEncrypt(text, key);
        transpositionResult.textContent = encrypted;
    });
}

if (transpositionDecryptBtn) {
    transpositionDecryptBtn.addEventListener('click', function() {
        console.log('Transposition decrypt clicked');
        const text = transpositionInput.value;
        const key = transpositionKey.value;
        
        if (!text) {
            transpositionResult.textContent = 'Please enter some text';
            return;
        }
        if (!key) {
            transpositionResult.textContent = 'Please enter a key';
            return;
        }
        
        const decrypted = transpositionCipherDecrypt(text, key);
        transpositionResult.textContent = decrypted;
    });
}

// RSA Key Generation
const rsaKeygenBtn = document.getElementById('rsa-keygen-btn');
const rsaKeygenP = document.getElementById('rsa-keygen-p');
const rsaKeygenQ = document.getElementById('rsa-keygen-q');
const rsaKeygenResult = document.getElementById('rsa-keygen-result');

if (rsaKeygenBtn) {
    rsaKeygenBtn.addEventListener('click', function() {
        console.log('RSA keygen clicked');
        const p = rsaKeygenP.value;
        const q = rsaKeygenQ.value;
        
        if (!p || !q) {
            rsaKeygenResult.textContent = 'Please enter both prime numbers';
            return;
        }
        
        if (parseInt(p) < 2 || parseInt(q) < 2) {
            rsaKeygenResult.textContent = 'Prime numbers must be greater than 1';
            return;
        }
        
        const keys = generateRSAKeys(p, q);
        rsaKeygenResult.innerHTML = `
            <div class="text-green-600 font-bold mb-2">✅ Keys Generated Successfully!</div>
            <div><span class="font-semibold">Public Key (e, n):</span> (${keys.e}, ${keys.n})</div>
            <div><span class="font-semibold">Private Key (d, n):</span> (${keys.d}, ${keys.n})</div>
        `;
    });
}

// RSA Encryption
const rsaEncryptBtn = document.getElementById('rsa-encrypt-btn');
const rsaEncryptInput = document.getElementById('rsa-encrypt-input');
const rsaEncryptKeyE = document.getElementById('rsa-encrypt-key-e');
const rsaEncryptKeyN = document.getElementById('rsa-encrypt-key-n');
const rsaEncryptResult = document.getElementById('rsa-encrypt-result');

if (rsaEncryptBtn) {
    rsaEncryptBtn.addEventListener('click', function() {
        console.log('RSA encrypt clicked');
        const text = rsaEncryptInput.value;
        const e = rsaEncryptKeyE.value;
        const n = rsaEncryptKeyN.value;
        
        if (!text) {
            rsaEncryptResult.textContent = 'Please enter text to encrypt';
            return;
        }
        if (!e || !n) {
            rsaEncryptResult.textContent = 'Please enter public key (e) and modulus (n)';
            return;
        }
        
        const encrypted = rsaEncrypt(text, { e, n });
        rsaEncryptResult.innerHTML = `
            <div class="text-blue-600 font-bold mb-2">🔐 Encrypted Message:</div>
            <div class="break-all">${encrypted}</div>
        `;
    });
}

// RSA Decryption
const rsaDecryptBtn = document.getElementById('rsa-decrypt-btn');
const rsaDecryptInput = document.getElementById('rsa-decrypt-input');
const rsaDecryptKeyD = document.getElementById('rsa-decrypt-key-d');
const rsaDecryptKeyN = document.getElementById('rsa-decrypt-key-n');
const rsaDecryptResult = document.getElementById('rsa-decrypt-result');

if (rsaDecryptBtn) {
    rsaDecryptBtn.addEventListener('click', function() {
        console.log('RSA decrypt clicked');
        const ciphertext = rsaDecryptInput.value;
        const d = rsaDecryptKeyD.value;
        const n = rsaDecryptKeyN.value;
        
        if (!ciphertext) {
            rsaDecryptResult.textContent = 'Please enter ciphertext';
            return;
        }
        if (!d || !n) {
            rsaDecryptResult.textContent = 'Please enter private key (d) and modulus (n)';
            return;
        }
        
        const decrypted = rsaDecrypt(ciphertext, { d, n });
        rsaDecryptResult.innerHTML = `
            <div class="text-green-600 font-bold mb-2">🔓 Decrypted Message:</div>
            <div>${decrypted}</div>
        `;
    });
}

// Navigation active state
const sections = document.querySelectorAll('[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    })
}
)

})