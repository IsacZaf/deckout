import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
const { saveDeck, getDeckByName } = require('./mongodb');

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(cors());

app.post('/api/decks', async (req: Request, res: Response) => {
  try {
    const { name, deck } = req.body;
    await saveDeck({ name, deck });
    res.json({ message: 'Deck saved successfully' });
  } catch (error) {
    console.error('Error saving deck:', error);
    res.status(500).json({ error: 'Failed to save deck' });
  }
});

app.get('/api/decks', async (req: Request, res: Response) => {
  try {
    const deckName = req.query.name as string;
    if (!deckName) {
      return res.status(400).json({ error: 'Invalid deck name' });
    }

    const deck = await getDeckByName(deckName);
    if (!deck) {
      return res.status(404).json({ error: 'Deck not found' });
    }

    res.json([deck]);
  } catch (error) {
    console.error('Error retrieving deck:', error);
    res.status(500).json({ error: 'Failed to retrieve deck' });
  }
});


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
