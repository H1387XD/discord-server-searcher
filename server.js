const express = require('express');
const multer = require('multer');
const fs = require('fs');
const app = express();
const port = 5500;

app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(multer().none());

app.post('/upload', (req, res) => {
    const { textInputN, textInputL, textInputK } = req.body;

    if (textInputN && textInputL && textInputK) {
        fs.readFile('servers.json', 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading JSON file:', err);
                res.status(500).send('Internal Server Error');
                return;
            }

            const jsonData = JSON.parse(data);

            jsonData[textInputN] = {
                "Discord_Link": textInputL,
                "Discord_server_name": textInputN,
                "keywords": textInputK.split(' ')
            };

            fs.writeFile('servers.json', JSON.stringify(jsonData, null, 4), err => {
                if (err) {
                    console.error('Error writing JSON file:', err);
                    res.status(500).send('Internal Server Error');
                } else {
                    res.status(200).send('Server updated successfully');
                }
            });
        });
    } else {
        res.status(400).send('Bad Request');
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});