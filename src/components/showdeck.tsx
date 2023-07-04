import React, { useState, useEffect } from 'react';
import { fetchDecks } from './api';
import Used from './Used';
import './showdeck.css';

interface Card {
  id: number;
  name: string;
  type: string;
  frameType: string;
  desc: string;
  race: string;
  archetype: string;
  card_sets: {
    set_name: string;
    set_code: string;
    set_rarity: string;
    set_rarity_code: string;
    set_price: string;
  }[];
  card_images: {
    id: number;
    image_url: string;
    image_url_small: string;
    image_url_cropped: string;
  }[];
  card_prices: {
    cardmarket_price: string;
    tcgplayer_price: string;
    ebay_price: string;
    amazon_price: string;
    coolstuffinc_price: string;
  }[];
  count: number;
}

interface NestedDeck {
  deck: Card[];
  extraDeck: any[];
}

interface Deck {
  _id: string;
  name: string;
  deck: NestedDeck;
}

const ShowDeck: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [decks, setDecks] = useState<Deck[]>([]);
  const [isCardsLoaded, setIsCardsLoaded] = useState(false);

  useEffect(() => {
    const fetchDecksData = async () => {
      try {
        const response = await fetchDecks(searchTerm);
        setDecks(response);
      } catch (error) {
        console.error('Failed to fetch deck data:', error);
      }
    };

    if (searchTerm) {
      fetchDecksData();
    } else {
      setDecks([]);
    }
  }, [searchTerm]);

  const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleLoadCardsClick = () => {
    setIsCardsLoaded(!isCardsLoaded);
  };

  return (
    <div className="container">
      <h2 className="title">Search for a Saved Deck</h2>
      <input type="text" value={searchTerm} onChange={handleSearchTermChange} placeholder="Enter deck name" />
      <button className="search-button" onClick={handleLoadCardsClick}>
        {isCardsLoaded ? 'Hide Deck' : 'Show Deck'}
      </button>
      {isCardsLoaded && decks.length > 0 && (
        <div className="deck-cards">
          {decks.map((deck) => (
            <div className="deck-wrapper" key={deck._id}>
              <h3 className="deck-name">{deck.name}</h3>
              <div className="card-list">
                {deck.deck.deck.map((card: Card) => (
                  <div className="card-wrapper" key={card.id}>
                    <Used cardName={card.name} />
                    <img src={card.card_images[0].image_url} alt={card.name} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowDeck;
