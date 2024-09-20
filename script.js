// DOM elements
const generateBtn = document.getElementById('generate-btn');
const verifyBtn = document.getElementById('verify-btn');
const qrCodeContainer = document.getElementById('qr-code-container');
const secretDisplay = document.getElementById('secret-display');
const tokenInput = document.getElementById('token-input');
const messageDisplay = document.getElementById('message-display');

let secret = '';

// Function to generate the TOTP secret and QR code
async function generateSecret() {
    try {
        const response = await fetch('http://localhost:3000/generate');
        const data = await response.json();

        // Display the secret and QR code
        secret = data.secret;
        secretDisplay.innerText = `Secret: ${secret}`;
        qrCodeContainer.innerHTML = `<img src="${data.qrCode}" alt="QR Code">`;
    } catch (error) {
        console.error('Error generating secret:', error);
        messageDisplay.innerText = 'Error generating secret. Check console for details.';
    }
}

// Function to verify the TOTP token
async function verifyToken() {
    const token = tokenInput.value;

    try {
        const response = await fetch('http://localhost:3000/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: token,
                secret: secret
            })
        });

        const data = await response.json();
        messageDisplay.innerText = data.message;
        messageDisplay.style.color = data.status === 'success' ? 'green' : 'red';
    } catch (error) {
        console.error('Error verifying token:', error);
        messageDisplay.innerText = 'Error verifying token. Check console for details.';
    }
}

// Event listeners for the buttons
generateBtn.addEventListener('click', generateSecret);
verifyBtn.addEventListener('click', verifyToken);
