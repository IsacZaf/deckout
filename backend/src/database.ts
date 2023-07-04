const { MongoClient } = require('mongodb');

const mongoURL = 'mongodb://localhost:27017';
const dbName = 'tt';

let db = null;

async function connectToDatabase() {
  try {
    const client = new MongoClient(mongoURL);

    await client.connect();

    db = client.db(dbName);
    console.log('Connected to the database');
    return db;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}

module.exports = {
  connectToDatabase,
};
