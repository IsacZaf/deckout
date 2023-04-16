import React, { useState, useEffect } from 'react';
import { fetchCardData } from './api';
import "./card.css";

// Define the props for the renamed component
type UsedProps = {
  cardName: string; // Pass in the card name as a prop
};

// Define the type for card data
type CardData = {
  card_images: { image_url_small: string, image_url: string }[];
  name: string;
  type: string;
  desc: string;
  race: string;
  attribute: string;
  level: string;
  atk: string;
  def: string;
  linkval: string;
  linkmarkers: string;
};

const Used: React.FC<UsedProps> = ({ cardName }) => {
  const [cardData, setCardData] = useState<CardData[] | null>(null); // State to store card data
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    // Fetch card data when the component mounts
    const fetchCard = async () => {
      try {
        const response = await fetchCardData();
        setCardData(response);
      } catch (error) {
        console.error('Failed to fetch card data:', error);
      }
    };
    fetchCard();
  }, []);

  // Find the index of the card in the cardData array based on the card name
  const cardIndex = cardData ? cardData.findIndex(card => card.name === cardName) : -1;


  return (
    <div className="deck-card">
      {cardIndex !== -1 ? (
        <React.Fragment>
          <button className="card-button" onClick={() => setShowModal(!showModal)}>
            <img className="card-image" src={cardData?.[cardIndex]?.card_images?.[0]?.image_url_small ?? ''} alt={cardData?.[cardIndex]?.name ?? ''} />
          </button>
          <div className="card-details">
            <h3 className="card-name">{cardData?.[cardIndex]?.name ?? ''}</h3>
            <p className="card-type">{cardData?.[cardIndex]?.type ?? ''}</p>
            {showModal && (
              <div className="card-modal active">
                <img className="card-modal-image" src={cardData?.[cardIndex]?.card_images?.[0]?.image_url ?? ''} alt={cardData?.[cardIndex]?.name ?? ''} />
                <div className="card-modal-content">
                  <p className="card-modal-desc">Description: {cardData?.[cardIndex]?.desc ?? ''}</p>
                  <p className="card-modal-type">Type: {cardData?.[cardIndex]?.type ?? ''}</p>
                  <p className="card-modal-race">Race: {cardData?.[cardIndex]?.race ?? ''}</p>
                  {cardData?.[cardIndex]?.type.includes('Monster') && (
                    <React.Fragment>
                      <p className="card-modal-attribute">Attribute: {cardData?.[cardIndex]?.attribute ?? ''}</p>
                      <p className="card-modal-level">Level/Rank: {cardData?.[cardIndex]?.level ?? ''}</p>
                      <p className="card-modal-atk">Attack: {cardData?.[cardIndex]?.atk ?? ''}</p>
                      <p className="card-modal-atk">Defense: {cardData?.[cardIndex]?.def ?? ''}</p>
                      {cardData?.[cardIndex]?.type === 'Link Monster' && (
                        <React.Fragment>
                          <p className="card-modal-link-value">Link Value: {cardData?.[cardIndex]?.linkval ?? ''}</p>
                          <p className="card-modal-link-markers">Link Markers: {cardData?.[cardIndex]?.linkmarkers ? cardData?.[cardIndex]?.linkmarkers.split(', ').join(', ') : ''}</p>
                        </React.Fragment>
                        
                      )}
                    </React.Fragment>
                  )}
                  <button className="used-close" onClick={() => setShowModal(false)}> Close</button>
                </div>
              </div>
            )}
          </div>
        </React.Fragment>
      ) : (
        <p>Cards loading...</p>
      )}
    </div>
);

};

export default Used;
