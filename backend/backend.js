const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const port = 5000;

// Verbinden Sie sich mit der MongoDB-Datenbank
const uri = 'mongodb://mongo:27017';
const client = new MongoClient(uri, { useUnifiedTopology: true });
let db;
client.connect(err => {
  if (err) {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  }
  db = client.db('TestDB');

  console.log(countries);
  console.log(db);



app.get('/test', (req, res) => {
    if (db) {
      res.json({ status: 'connected' });
    } else {
      res.json({ status: 'disconnected' });
    }
  });

  // Route zum Abrufen von Daten aus der MongoDB-Datenbank
  app.get('/data', async (req, res) => {
    try {
      if (!db) {
        throw new Error('Database not initialized');
      }
      const data = await db.collection('countries').find().toArray();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.listen(port, () => {
    console.log(`Backend listening at http://localhost:${port}`);
  });
});
