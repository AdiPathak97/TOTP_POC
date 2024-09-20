// server.js
const express = require('express');
const OTPAuth = require('otpauth');
const cookieParser = require('cookie-parser');
const qrcode = require('qrcode');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Route to generate a TOTP secret and QR code
app.get('/generate', async (req, res) => {
    const totp = new OTPAuth.TOTP({
        label: 'TOTP Proof of Concept',
        issuer: 'Aditya Pathak',
        secret: new OTPAuth.Secret(), // Random secret
    });

    const otpauthUrl = totp.toString(); // Get otpauth URL (for QR codes)

    // Generate QR code for easier scanning
    const qrCode = await qrcode.toDataURL(otpauthUrl);
    res.json({ secret: totp.secret.base32, qrCode });
});

// Route to verify TOTP token
app.post('/verify', (req, res) => {
    const { token, secret } = req.body;

    // Use the provided secret to verify the TOTP
    const totp = new OTPAuth.TOTP({
        secret: OTPAuth.Secret.fromBase32(secret), // Parse base32 secret
    });

    const isValid = totp.validate({ token, window: 1 }); // Allow a small time window for clock drift

    if (isValid !== null) {
        res.json({ status: 'success', message: 'TOTP Verified' });
    } else {
        res.json({ status: 'error', message: 'Invalid TOTP' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
