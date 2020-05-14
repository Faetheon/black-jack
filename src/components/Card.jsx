import React from "react";
// Good icon for hearts
// import FavoriteIcon from "@material-ui/icons/Favorite";
import { getSuitColor } from "../constants";

const Card = ({ card }) => {
  const cardNumber = card.substr(0, card.length - 1);
  const cardSuit = card.substr(card.length - 1);
  return (
    <div className="card-body" style={{ color: getSuitColor(cardSuit) }}>
      {`${cardNumber} of ${cardSuit}`}
      {/* Add suit icon later if possible
        <FavoriteIcon />
      */}
    </div>
  );
};

export default Card;
