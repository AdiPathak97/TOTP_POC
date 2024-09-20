# TOTP_POC
A  Proof of Concept demonstrating working of TOTP based authentication.

<hr>

### How to use:

1. Clone repo and go to directory
2. Install dependencies with `npm install`
3. Start backend with `node server.js`
4. Open `index.html`
5. Click on `Generate Secret` to generate secret key and QR Code
6. Scan QR Code with an app like [Aegis](https://getaegis.app/) or Google Authenticator or Authy
7. Enter token generated in app in `Enter TOTP Token` field
8. Click on `Verify Token` to verify TOTP

