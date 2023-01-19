const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');

app.use(cors())

app.get('/json', (req, res) => {
    fs.readFile('./data/index.json', (err, data) => {
        res.send(JSON.parse(data));
    })
})

app.get('/json/:id', (req, res) => {
    const id = req.params.id;

    fs.readFile('./data/index.json', (err, data) => {
        const hajok = JSON.parse(data);
        const hajobyId = hajok.find(index => index.id === Number(id));
        if(!hajobyId) {
            res.status(404).send({error: `id: ${id} not found`});
            return;
        }
        res.send(hajobyId);
    })
})

app.listen(3000);
