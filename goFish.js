function goFish() {
  // create a deck of cards
  const deck = [];
  for (let i = 1; i <= 13; i++) {
    for (let j = 0; j < 4; j++) {
      deck.push(i);
    }
  }

  // shuffle the deck
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  // deal the cards to the players
  const player1 = [];
  const player2 = [];
  while (deck.length > 0) {
    player1.push(deck.pop());
    player2.push(deck.pop());
  }

  // define helper functions
  function askForCard(player, otherPlayer, card) {
    let hasCard = false;
    for (let i = 0; i < otherPlayer.length; i++) {
      if (otherPlayer[i] === card) {
        player.push(otherPlayer.splice(i, 1)[0]);
        hasCard = true;
        break;
      }
    }
    return hasCard;
  }

  function checkForBook(player) {
    const books = [];
    for (let i = 1; i <= 13; i++) {
      let hasCard = false;
      let book = [];
      for (let j = 0; j < player.length; j++) {
        if (player[j] === i) {
          book.push(player.splice(j, 1)[0]);
          j--;
          hasCard = true;
        }
      }
      if (hasCard && book.length === 4) {
        books.push(book);
      } else {
        player.push(...book);
      }
    }
    return books;
  }

  function drawCard(player, deck) {
    if (deck.length === 0) return false;
    player.push(deck.pop());
    return true;
  }

  // game loop
  let currentPlayer = 1;
  let books1 = 0;
  let books2 = 0;
  while (books1 + books2 < 26) {
    if (currentPlayer === 1) {
      console.log("Player 1's turn");
      // player's turn
      if (player1.length === 0) {
        if (!drawCard(player1, deck)) break;
      }
      console.log("Your hand: " + player1);
      // ask for a card
      const card = parseInt(prompt("Choose a card to ask for"));
      if (!askForCard(player1, player2, card)) {
        alert("Go fish!");
        if (!drawCard(player1, deck)) break;
      }

      // check for books
      const books = checkForBook(player1);
      if (books.length > 0) {
        console.log("You made a book of " + books);
        books1 += books.length;
      }

      console.log("Books: Player 1 - " + books1 + ", Player 2 - " + books2);
      console.log("-----------------------");

      currentPlayer = 2;
    } else {
      console.log("Player 2's turn");
      // player's turn
      if (player2.length === 0) {
        if (!drawCard(player2, deck)) break;
      }
      console.log("Your hand: " + player2);
      // ask for a card
      const card = parseInt(prompt("Choose a card to ask for"));
      if (!askForCard(player2, player1, card)) {
        alert("Go fish!");
        if (!drawCard(player2, deck)) break;
      }

      // check for books
      const books = checkForBook(player2);
      if (books.length > 0) {
        console.log("You made a book of " + books);
        books2 += books.length;
      }

      console.log("Books: Player 1 - " + books1 + ", Player 2 - " + books2);
      console.log("-----------------------");

      currentPlayer = 1;
    }
  }

  // determine the winner
  if (books1 > books2) {
    console.log("Player 1 wins!");
  } else if (books1 < books2) {
    console.log("Player 2 wins!");
  } else {
    console.log("It's a tie!");
  }
}

goFish();
