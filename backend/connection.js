const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// CORS aktivieren (vor den Routen)
app.use(cors()); //hierbei werden Anfragen aus allen Routen erlaubt, ist in einer Produktionsumgebung nicht sicher!
// Deshalb: 
// Konfiguration für CORS
//const corsOptions = {
    //origin: 'http://localhost:8080', // Erlaubt nur Anfragen von dieser Adresse
   //methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Erlaubt alle HTTP-Methoden
    //credentials: true, // Erlaubt das Senden von Cookies über Cross-Origin-Anfragen
    //optionsSuccessStatus: 204, // Ein spezieller Statuscode für Preflight-Anfragen
//};

app.use(bodyParser.json());

app.post('/login', (req, res) => {
    const enteredPassword = req.body.password;
    const correctPassword = 'Test';

    console.log('Anfrage zum Login erhalten. Passwort:', enteredPassword);

    if (enteredPassword === correctPassword) {
        res.status(200).json({ message: 'Login erfolgreich' });
    } else {
        res.status(401).json({ message: 'Falsches Passwort' });
    }
});

app.listen(port, () => {
    console.log(`Server läuft auf Port ${port}`);
});
