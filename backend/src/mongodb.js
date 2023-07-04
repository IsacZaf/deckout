const { MongoClient } = require('mongodb');
require('dotenv').config();

const username = 'test';
const password = 'test';
const databaseName = 'DeckOut';
const uri = `mongodb+srv://${username}:${password}@deckout.b3oqil7.mongodb.net/${databaseName}?retryWrites=true&w=majority`;

async function saveDeck(deckData) {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();

    console.log('Connected to MongoDB');

    const database = client.db(databaseName);
    const collection = database.collection('decks');

    const result = await collection.insertOne(deckData);
    console.log('Deck saved with _id:', result.insertedId);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  } finally {
    await client.close();
  }
}

async function getDeckByName(name) {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();

    console.log('Connected to MongoDB');

    const database = client.db(databaseName);
    const collection = database.collection('decks');

    const deck = await collection.findOne({ name });
    return deck;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  } finally {
    await client.close();
  }
}

module.exports = { saveDeck, getDeckByName };
