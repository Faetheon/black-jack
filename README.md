# Black Jack
-- Rules
1. There is a permanent dealer which will deal all cards.
2. There will be one standard deck of 52 cards used, however the number of decks should be configurable for a future release. The deck is shuffled before each game.
3. The dealer will be dealt 2 cards, one face up, one face down to begin the game.
4. Each player will be dealt 2 cards, face up, to begin the game.
5. For this release we’re only supporting one human player vs. the dealer/computer, but code in such a way that adding a second player is a future requirement.
6. The objective is to get as close to the number 21 as possible, without going over. The card values are the value of the card for 2 thru 10. Jack, Queen, and King are each worth 10. Aces can be valued at either 1 or 11. A player's hand may have multiple aces, and each may be worth either 1 or 11.
7. If the player has 21 resulting from a combination of the original two cards dealt, and the dealer does not have 21 from his original two cards dealt the player wins automatically. If the dealer also has a total of 21 from two cards, then each are given a point.
8. If the player and dealer end up with the same value, the player loses the hand.
9. The player may request additional cards by asking for a “hit”. At which point the dealer will provide a card, face up. The player may “hit” as many times as he likes until he “busts” with a total over 21.
10. The player signals they are done taking cards by calling “hold”
11. The dealer / computer takes their turn after all of the players have finished with their turns. When the dealer holds, their hidden card is then shown.
12. Scoring should happen as follows:
  - A player win over the dealer is worth 1 point
  - A dealer win over a player is worth 1 point
  - A player or dealer win with two cards that total 21 is worth 2 points
  - A player and dealer each with two cards that total 21 are both awarded 1 point
13. The dealer will be controlled by the following rules:
  - The dealer must hit if his total is below 17
  - If the dealer has any high aces (counted as 11) as part of his total, he must hit while his count is below 18.
  - If any player has a value greater than their current value, the dealer must continue to hit. E.g. if a player has 20, the dealer must hit until they have 20 or greater.
