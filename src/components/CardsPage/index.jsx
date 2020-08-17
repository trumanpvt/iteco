import React, { useState, useEffect, useInput } from 'react';
import axios from 'axios';

// import Search from '../search';
import Card from '../card';

import './index.css';

function CardsPage() {
  const [cardsData, setCardsData] = useState([]);
  const [cardsSearch, setCardsSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://api.jsonbin.io/b/5f3ae7b24d9399103616cd5e',
      );

      setCardsData(result.data.cards);
    };

    fetchData();
  }, []);

  function renderSearch(cards) {
    console.log(cards);

    return (
      <div>
        <form autoComplete="off">
          <label htmlFor="search">
            Поиск карт:
            <input
              name="search"
              type="text"
              value={cardsSearch}
              onChange={(e) => setCardsSearch(e.target.value.replace(/\D/, ''))}
            />
          </label>
        </form>
      </div>
    );
  }

  function renderCard(card) {
    const cardNumber = card.cardNumber.slice(card.cardNumber.length - 4);

    if (!cardsSearch || cardNumber.includes(cardsSearch)) {
      return (
        <Card
          key={card.cardNumber}
          card={card}
          cardNumber={cardNumber}
          className="card"
        />
      );
    }

    return null;
  }

  return (
    <>
      <div>{renderSearch(cardsData)}</div>
      <div>
        {cardsData.map((card) => (
          renderCard(card)
        ))}
      </div>
    </>
  );
}

export default CardsPage;
