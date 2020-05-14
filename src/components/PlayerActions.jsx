import React from "react";

const PlayerActions = ({ onHitClick, onStandClick }) => {
  return (
    <div className="player-actions">
      <button className="player-action" onClick={onHitClick}>
        Hit
      </button>
      <button className="player-action" onClick={onStandClick}>
        Stand
      </button>
    </div>
  );
};

export default PlayerActions;
