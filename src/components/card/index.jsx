import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './index.css';

function Card(props) {
  const [expandCard, setExpandCard] = useState(false);
  const { card, cardNumber } = props;
  const date = new Date(card.expiringDate).toLocaleDateString();
  const currency = card.currency === 'RUR' ? '₽' : '$';

  return (
    <>
      <div className="card">
        <div className="cardHeader">
          <div className="cardHeader__top">
            <div className="cardTitle">
              {`${card.title}, ${currency}`}
            </div>
            <div className="cardDate">
              {date}
            </div>
            <button
              role="button"
              className="cardHeader__buttonExpand"
              onClick={() => setExpandCard(!expandCard)}
            >
              <div
                className={`cardHeader__buttonIcon ${expandCard ? 'cardHeader__buttonIcon_rotate' : ''}`}
              />
            </button>
          </div>
          <div className="cardHeader__bottom">
            {`***${cardNumber}`}
          </div>
        </div>
        <div
          className={`cardDescription ${expandCard ? 'cardDescription_show' : 'cardDescription_hide'}`}
        >
          {card.description}
        </div>
      </div>
    </>
  );
}

Card.propTypes = {
  card: PropTypes.shape({
    // cardNumber: PropTypes.string,
    currency: PropTypes.string,
    description: PropTypes.string,
    expiringDate: PropTypes.string,
    title: PropTypes.string,
    value: PropTypes.number,
  }),
  cardNumber: PropTypes.string,
};

Card.defaultProps = {
  card: {
    // cardNumber: '',
    currency: '',
    description: '',
    expiringDate: '',
    title: '',
    value: '',
  },
  cardNumber: '',
};

export default Card;
