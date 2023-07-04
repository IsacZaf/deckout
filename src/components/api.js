import axios from 'axios';

export const fetchCardData = async () => {
  try {
    const response = await axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php');
    const deckData = response.data.data;
    console.log('Fetched card data:', deckData);
    return deckData;
  } catch (error) {
    console.error('Failed to fetch deck data:', error);
    throw new Error('Failed to fetch deck data');
  }
};

export const fetchDecks = async (name) => {
  try {
    const url = name ? `http://localhost:8080/api/decks?name=${encodeURIComponent(name)}` : 'http://localhost:8080/api/decks';
    const response = await axios.get(url);
    const decks = response.data;
    console.log('Fetched decks:', decks);
    return decks;
  } catch (error) {
    console.error('Failed to fetch decks:', error);
    throw new Error('Failed to fetch decks');
  }
};
