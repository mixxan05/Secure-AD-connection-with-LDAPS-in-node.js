const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const ActiveDirectory = require('activedirectory');
const CryptoJS = require("crypto-js"); //Verschlüsselung

app.use(session);
app.post('/login', (req, res) => {

    const enteredPassword = req.body.password;
    const enteredUsername = req.body.username;
    req.session.username = enteredUsername;
    req.session.password = enteredPassword;
    const encryptP = req.body.password;
    const encryptU = req.body.username; //verschlüsselt
    const passphrase = req.body.t1;
    const bytesP = CryptoJS.AES.decrypt(encryptP, passphrase);
    const bytesU = CryptoJS.AES.decrypt(encryptU, passphrase);
    const decryptedP = bytesP.toString(CryptoJS.enc.Utf8);
    const decryptedU = bytesU.toString(CryptoJS.enc.Utf8); //entschlüsselt
    user = decryptedU;
    function AbgleichAD(decryptedP, decryptedU) {
        var activeDirectory = new ActiveDirectory({
            url: global.URL,
            baseDN: global.baseDN,
            username: global.usernameValue,
            password: global.passwordValue,
            tlsOptions: {
                rejectUnauthorized: true,
            },
        });
        let authenticationAttempted = false;
        activeDirectory.authenticate(decryptedU, decryptedP, (error) => {

            if (authenticationAttempted) {
                return;
            }
            authenticationAttempted = true;

            if (error) {
                console.log('Fehlgeschlagener Login. Username:', decryptedU, 'Zeit:', new Date().toLocaleString());
                console.log('ERROR: ' + JSON.stringify(error));
                return res.status(401).json({ success: false, message: 'Falsches Passwort' });
            } else {

                loggedIn = true;
                isAuthenticated = true;
                console.log('Erfolgreicher Login. Username:', decryptedU, 'Zeit:', new Date().toLocaleString());
                return res.status(200).json({ success: true, message: 'Login erfolgreich', user: decryptedU });
            }
            next();
        });
    }

    AbgleichAD(decryptedP, decryptedU);

});
app.listen(port, () => {
    console.log(`Server läuft auf Port ${port}`);
});
