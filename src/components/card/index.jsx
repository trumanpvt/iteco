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
        <div
          className="cardHeader"
          onClick={() => setExpandCard(!expandCard)}
          onKeyDown={null}
          role="button"
          tabIndex={0}
        >
          <div className="cardHeader__top">
            <div className="cardHeader__topText">
              <div className="cardTitle">
                {`${card.title}, ${currency}`}
              </div>
              <div className="cardDate">
                {`до ${date}`}
              </div>
            </div>
            <div
              className={`cardHeader__buttonIcon ${expandCard ? 'cardHeader__buttonIcon_rotate' : ''}`}
            />
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
    currency: '',
    description: '',
    expiringDate: '',
    title: '',
    value: '',
  },
  cardNumber: '',
};

export default Card;
