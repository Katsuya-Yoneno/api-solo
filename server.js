const express = require('express');
const client = require('./connection.js');
const path = require('path');

function server() {
    const app = express();
    app.use(express.json());
    client.connect();

    // index.html の送信
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'index.html'));
    });

    // 静的ファイルの提供
    app.use(express.static(__dirname));

    app.post('/api/comics', (req, res) => {
        const comic = req.body;
        const query = `INSERT INTO comic(title) VALUES('${comic.title}');`;

        client.query(query, (err, result) => {
            if (!err) {
                res.status(200).send(comic);
            } else {
                console.error(err.message);
            }
        });
    });

    app.get('/api/comics', (req, res) => {
        const query = `SELECT id, title FROM comic ORDER BY id;`;
        client.query(query, (err, result) => {
            if (!err) {
                res.status(200).send(result.rows);
            } else {
                console.error(err.message);
            }
        });
    });

    app.patch('/api/comics/:idOrTitle', (req, res) => {
        const param = req.params.idOrTitle;
        let query = '';
        if (!isNaN(parseInt(param))) {
            // param = id
            query = `UPDATE comic SET title = '${req.body.title}' WHERE id = ${param};`;
        } else {
            // param = name
            query = `UPDATE comic SET title = '${req.body.title}' WHERE title = '${param}';`;
        }
        client.query(query, (err, result) => {
            if (!err) {
                res.status(200).send(req.body);
            } else {
                console.error(err.message);
            }
        });
    });

    app.delete('/api/comics/:idOrTitle', (req, res) => {
        const param = req.params.idOrTitle;
        let query = '';
        if (!isNaN(parseInt(param))) {
            // param = id
            query = `DELETE FROM comic WHERE id = ${param};`;
        } else {
            // param = name
            query = `DELETE FROM comic WHERE title = '${param}';`;
        }
        client.query(query, (err, result) => {
            if (!err) {
                res.status(200).send(req.body);
            } else {
                console.error(err.message);
            }
        });
    });

    return app;
}

module.exports = server;
