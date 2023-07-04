"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const { saveDeck, getDeckByName } = require('./mongodb');
const app = (0, express_1.default)();
const port = 8080;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.post('/api/decks', async (req, res) => {
    try {
        const { name, deck } = req.body;
        await saveDeck({ name, deck });
        res.json({ message: 'Deck saved successfully' });
    }
    catch (error) {
        console.error('Error saving deck:', error);
        res.status(500).json({ error: 'Failed to save deck' });
    }
});
app.get('/api/decks', async (req, res) => {
    try {
        const deckName = req.query.name;
        if (!deckName) {
            return res.status(400).json({ error: 'Invalid deck name' });
        }
        const deck = await getDeckByName(deckName);
        if (!deck) {
            return res.status(404).json({ error: 'Deck not found' });
        }
        res.json([deck]);
    }
    catch (error) {
        console.error('Error retrieving deck:', error);
        res.status(500).json({ error: 'Failed to retrieve deck' });
    }
});
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
