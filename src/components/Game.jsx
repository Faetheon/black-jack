import React, { useState } from "react";
import {
  Deck,
  getHandTotal,
  updateScore,
  start,
  getRandomCard,
} from "../constants";
import Card from "./Card";
import PlayerActions from "./PlayerActions";
import { useEffect } from "react";

// Once we allow for more decks it should be easy
// to adapt this
const suits = Object.keys(Deck);
const playingCards = suits.reduce((accumulator, suit) => {
  const cards = Object.keys(Deck[suit]);
  accumulator.push(...cards.map((card) => `${card}${suit[0]}`));
  return accumulator;
}, []);

const Game = () => {
  const [cards, setCards] = useState([...playingCards]);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  // The players score will be the first element in the array while
  // the dealers or second players will be the second element
  const [score, setScore] = useState([0, 0]);

  // Anything in this useEffect will only be run
  // on the first render of this component
  useEffect(() => {
    // Initial game start
    start(
      cards,
      setPlayerHand,
      setDealerHand,
      setCards,
      setScore,
      score[0],
      score[1]
    );
  }, []);

  useEffect(() => {
    // If we run out of cards reshuffle the deck
    if (cards.length < 10) {
      setCards(
        playingCards.filter((card) => {
          if (!playerHand.indexOf(card) || !dealerHand.includes(card)) {
            return true;
          }
          return false;
        })
      );
    }

    // Once the game is released players will want to know when the deck has
    // been shuffled.
    // alert("The deck has been reshuffled");
  }, [cards.length]);

  return (
    <div className="game">
      <div className="score">{`Player: ${score[0]} : Dealer ${score[1]}`}</div>
      <div className="play-area">
        <div className="player-hand">
          {playerHand.map((card) => {
            return <Card key={card} card={card} />;
          })}
          <div className="player-total">
            {`Total: ${getHandTotal(playerHand)}`}
          </div>
        </div>
        <PlayerActions
          onHitClick={() => {
            // Add an animation to show cards flipping
            const playerTotal = getHandTotal(playerHand);

            // Stop player from continuing after getting
            if (playerTotal < 21) {
              const cardToAdd = getRandomCard(cards);
              setPlayerHand([...playerHand, cardToAdd]);
              setCards(cards);
            } else if (playerTotal === 21) {
              alert(
                "Sorry, you are at the perfect total. Please click stand to (probably) beat the computer."
              );
            } else {
              alert("Sorry, you busted. Click stand to continue.");
            }
          }}
          onStandClick={() => {
            // Dealer takes his turn
            const playerTotal = getHandTotal(playerHand);

            // Add an animation to show the dealers turn
            (function dealerHit(hand = dealerHand) {
              const dealerTotal = getHandTotal(hand);
              if (dealerTotal > 21) {
                setCards(cards);
                return setDealerHand(hand);
              }
              const dealerHasAce = hand.reduce((hasAce, card) => {
                if (card.includes("A")) {
                  return true;
                }
                return hasAce;
              }, false);
              // If the dealer has less than 18 or less than the player he will hit
              if (
                (dealerHasAce && dealerTotal < 18) ||
                dealerTotal < playerTotal
              ) {
                const cardToAdd = getRandomCard(cards);
                dealerHit([...dealerHand, cardToAdd]);
              } else if (dealerTotal < 17 || dealerTotal < playerTotal) {
                const cardToAdd = getRandomCard(cards);
                dealerHit([...dealerHand, cardToAdd]);
              } else {
                setCards(cards);
                return setDealerHand(hand);
              }
            })();

            // Set score after dealer finishes his turn
            setScore(
              updateScore(
                getHandTotal(playerHand),
                getHandTotal(dealerHand),
                score[0],
                score[1]
              )
            );

            start(
              cards,
              setPlayerHand,
              setDealerHand,
              setCards,
              setScore,
              score[0],
              score[1]
            );
          }}
        />
        <div className="dealer-hand">
          {dealerHand.map((card, index) => {
            // Show all cards after the first
            if (index > 0) {
              return <Card key={card} card={card} />;
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Game;
