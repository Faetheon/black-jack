export function getSuitColor(suit) {
  // Fun changing of color for different suits
  if (suit === "S" || suit === "C") {
    return "black";
  } else {
    return "red";
  }
}

export function getRandomIndex(arrayLength) {
  // Get random number within the arrays range
  return Math.floor(Math.random() * arrayLength);
}

export function getHandTotal(hand) {
  let total = 0;
  const aces = [];

  // Calculate each cards value
  hand.forEach((card) => {
    const value = card[0];
    // If card.length is > 2 it must be a ten
    // E.g. "10H" or "3H"
    if (value === "J" || value === "Q" || value === "K" || card.length > 2) {
      total += 10;
    } else if (value === "A") {
      aces.push(value);
    } else {
      total += parseInt(value, 10);
    }
  });

  // Calculate each aces value
  // Two aces equals 12
  aces.forEach(() => {
    if (total + 10 > 21 || total + 11 > 21) {
      total += 1;
    } else {
      total += 11;
    }
  });

  return total;
}

export function updateScore(
  playerHandTotal,
  dealerHandTotal,
  playerScore,
  dealerScore
) {
  // See if the dealer wins normally
  const dealerWins = dealerHandTotal > playerHandTotal && dealerHandTotal <= 21;

  // Player busts
  if (playerHandTotal > 21) {
    dealerScore += 1;
    // A tie
  } else if (playerHandTotal === dealerHandTotal) {
    dealerScore += 1;
    // Dealer wins
  } else if (dealerWins) {
    dealerScore += 1;
    // Player wins
  } else if (!dealerWins) {
    playerScore += 1;
  }

  return [playerScore, dealerScore];
}

export function start(
  cards,
  setPlayerHand,
  setDealerHand,
  setCards,
  setScore,
  playerScore,
  dealerScore
) {
  const startingCards = [];

  // Get four random cards
  for (let index = 0; index < 4; index += 1) {
    const cardToAdd = cards.splice(getRandomIndex(cards.length), 1)[0];
    startingCards.push(cardToAdd);
  }

  // Calculate if a Black Jack occurs
  const playerTotal = getHandTotal([startingCards[0], startingCards[1]]);
  const dealerTotal = getHandTotal([startingCards[2], startingCards[3]]);

  // If a black jack occurs restart the game automatically
  // Having a variable track this will make it easier to reconfigure later
  const restart = (function blackJack() {
    if (dealerTotal === 21 && playerTotal === 21) {
      setScore([playerScore + 1, dealerScore + 1]);
      return true;
    } else if (dealerTotal === 21) {
      setScore([playerScore, dealerScore + 2]);
      return true;
    } else if (playerTotal === 21) {
      setScore([playerScore + 2, dealerScore]);
      return true;
    }
    return false;
  })();

  if (restart) {
    setCards(cards);
    start(...arguments);
  } else {
    // Give the player the first two cards and the dealer the other two
    setPlayerHand([startingCards[0], startingCards[1]]);
    setDealerHand([startingCards[2], startingCards[3]]);
    setCards(cards);
  }
}

export function getRandomCard(cards) {
  const index = getRandomIndex(cards.length);
  return cards.splice(index, 1)[0];
}

export const Deck = {
  S: {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    J: 10,
    Q: 10,
    K: 10,
    A: "A",
  },
  H: {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    J: 10,
    Q: 10,
    K: 10,
    A: "A",
  },
  C: {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    J: 10,
    Q: 10,
    K: 10,
    A: "A",
  },
  D: {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    J: 10,
    Q: 10,
    K: 10,
    A: "A",
  },
};
