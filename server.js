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
        let insertQuery = `INSERT INTO comic(title) VALUES('${comic.title}');`;
    
        client.query(insertQuery, (err, result) => {
          if (!err) {
            res.status(200).send(comic);
          } else {
            console.error(err.message);
          }
          client.end();
        });
    });

  return app;
}

module.exports = server;
