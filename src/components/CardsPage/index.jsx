import React, { useState, useEffect } from 'react';
import './index.css';

function CardsPage() {
  const [cardsData, setCardsData] = useState([]);
  useEffect(() => {
    const url = 'https://api.github.com/repos/trumanpvt/iteco/json';
    fetch(url).then(
      (res) => setCardsData(res),
    );
  });

  return (
    <>
      <div>Test div</div>
      <div>
        {cardsData}
      </div>
    </>
  );
}

export default CardsPage;
