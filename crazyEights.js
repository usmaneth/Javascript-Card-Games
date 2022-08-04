function CrazyEights(deck) {
  this.deck = deck;
  this.discardPile = [];
  this.players = [];
}

CrazyEights.prototype.addPlayer = function(player) {
  this.players.push(player)
};

CrazyEights.prototype.startGame = function() {
  // shuffle the deck
  this.deck.shuffle();

  // deal 5 cards to each player
  for (var i = 0; i < this.players.length; i++) {
    for (var j = 0; j < 5; j++) {
      this.players[i].hand.push(this.deck.drawCard());
    }
  }

  // put the top card of the deck into the discard pile
  this.discardPile.push(this.deck.drawCard());

  // start the game with the player to the left of the dealer
  this.currentPlayer = this.players[0];
};

CrazyEights.prototype.playTurn = function() {
  // if the current player has any cards in their hand, they must play one
  if (this.currentPlayer.hand.length === 0) {
    return;
  }

  var card = this.currentPlayer.playCard();

  // if the card is an eight, they must specify a suit
  if (card.rank === '8') {
    var suit = this.currentPlayer.chooseSuit();
    card.suit = suit;
  }

  // check if the card played is valid
  if (this.isValidCard(card)) {
    this.discardPile.push(card);

    // check if the player has won
    if (this.currentPlayer.hand.length === 0) {
      this.endGame();
    }
  } else {
    // invalid card, put it back in their hand
    this.currentPlayer.hand.push(card);
  }

  // move to the next player
  this.nextPlayer();
};

CrazyEights.prototype.isValidCard = function(card) {
  // if the card is an eight, any suit can be played
  if (card.rank === '8') {
    return true;
  }

  // otherwise, the card must match the rank or suit of the top card on the discard pile
  var topCard = this.discardPile[this.discardPile.length - 1];
  return card.rank === topCard.rank || card.suit === topCard.suit;
};

CrazyEights.prototype.nextPlayer = function() {
  // move to the next player in the array, or back to the first player if we've reached the end
  var nextPlayerIndex = this.players.indexOf(this.currentPlayer) + 1;
  if (nextPlayerIndex === this.players.length) {
    nextPlayerIndex = 0;
  }

  this.currentPlayer = this.players[nextPlayerIndex];
};

CrazyEights.prototype.endGame = function() {
  // the current player is the winner!
  alert('Player ' + (this.players.indexOf(this.currentPlayer) + 1) + ' wins!');
};

// Deck of cards class

function Deck() {
  this.cards = [];

  // populate the deck with all 52 cards
  for (var rank of ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']) {
    for (var suit of ['hearts', 'diamonds', 'clubs', 'spades']) {
      this.cards.push(new Card(rank, suit));
    }
  }
}

Deck.prototype.shuffle = function() {
  // Fisher-Yates shuffle

  var currentIndex = this.cards.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    // pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // and swap it with the current element
    temporaryValue = this.cards[currentIndex];
    this.cards[currentIndex] = this.cards[randomIndex];
    this.cards[randomIndex] = temporaryValue;
  }
};

Deck.prototype.drawCard = function() {
  return this.cards.pop();
};

// Card class

function Card(rank, suit) {
  this.rank = rank;
  this.suit = suit;
}
