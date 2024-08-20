const express = require('express');
const CORS = require('cors');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

dotenv.config();

// Use body-parser middleware

app.use(bodyParser.json()); 
app.use(CORS())

const url = 'mongodb://localhost:27017/';
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

// Database Name

const dbName = 'passwords';

// Connect to MongoDB
client.connect()
  .then(() => {
    console.log('Connected to MongoDB');
    
    // Define routes after successful connection
    app.get('/', async (req, res) => {
      try {
        const db = client.db(dbName);
        const collection = db.collection('documents');
        const findResult = await collection.find({}).toArray();
        res.send(findResult);
      } catch (error) {
        res.status(500).send('Error retrieving documents');
      }
    });

    app.post('/', async (req, res) => {
      try {
        const db = client.db(dbName);
        const collection = db.collection('documents');
        await collection.insertOne(req.body);
        res.send('Document inserted');
      } catch (error) {
        res.status(500).send('Error inserting document');
      }
    });
    app.delete('/', async (req, res) => {
      try {
        const db = client.db(dbName);
        const collection = db.collection('documents');
        await collection.deleteOne(req.body);
        res.send('Document Deleted');
      } catch (error) {
        res.status(500).send('Error Deleting document');
      }
    });

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });