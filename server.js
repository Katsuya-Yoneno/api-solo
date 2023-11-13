const express = require('express');
const client = require('./connection.js');

function server() {
  const app = express();
  app.use(express.json());
  
  app.get('/', (req, res) => {
      res.sendFile(__dirname + '/index.html');
    });
    
    app.post('/comics', (req, res) => {
        client.connect();
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
    
    app.get('/comics', (req, res) => {
        client.connect();
        const query = `SELECT DISTINCT title FROM comic;`
        client.query(query, (err, result) => {
            if (!err) {
                // console.log(result.rows);
                res.status(200).send(result.rows);
            } else {
                console.error(err.message);
            }
        });
    })

  return app;
}

module.exports = server;
