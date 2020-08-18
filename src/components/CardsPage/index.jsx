import React, { useState, useEffect } from 'react';
import axios from 'axios';

// import Search from '../search';
import Card from '../card';

import './index.css';

function CardsPage() {
  const [cardsData, setCardsData] = useState([]);
  const [cardsSearch, setCardsSearch] = useState('');
  const [sortCards, setSortCards] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://api.jsonbin.io/b/5f3b105faf209d1016bd8ed1',
      );

      setCardsData(result.data.cards);
    };

    fetchData();
  }, []);

  function renderSearch() {
    return (
      <div>
        <form autoComplete="off">
          <label
            htmlFor="search"
            className="searchLabel"
          >
            <div className="searchText">
              Поиск карт:
            </div>
            <input
              id="search"
              name="search"
              type="text"
              value={cardsSearch}
              onChange={(e) => setCardsSearch(e.target.value.replace(/\D/, ''))}
              className="searchInput"
            />
          </label>
        </form>
      </div>
    );
  }

  function handleSort() {
    setSortCards(!sortCards);

    if (sortCards) {
      const sortedCards = cardsData.sort(
        (a, b) => new Date(b.expiringDate) - new Date(a.expiringDate),
      );
      setCardsData(sortedCards);
    } else {
      const sortedCards = cardsData.sort(
        (a, b) => new Date(a.expiringDate) - new Date(b.expiringDate),
      );
      setCardsData(sortedCards);
    }
  }

  function renderSort() {
    return (
      <button
        className="sortButton"
        onClick={handleSort}
        type="button"
      >
        Сортировать по дате
        <div className={`sortButtonArrow ${sortCards ? 'sortButtonArrow_sort' : ''}`} />
      </button>
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
          tabIndex={0}
        />
      );
    }

    return null;
  }

  return (
    <div className="cardsPage">
      {renderSearch()}
      {renderSort()}
      <div>
        {cardsData.map((card) => (
          renderCard(card)
        ))}
      </div>
    </div>
  );
}

export default CardsPage;
