/* ========================================================================== */
/* ========================================================================== */
/* ======================== ES 3 Mar 22 Black Jack ========================== */
/* ========================================================================== */
/* ========================================================================== */

/* ========================================================================== */
/* ============================== Game logic ================================ */
/* ========================================================================== */
/* ========================================================================== */

// First click. Deal two cards each.

// Anyone reached Black Jack? Show sum.
// Ace = 1 or 11
// Picture = 10

// Hit or stand.
// While player hit, add card. Display. Loop.
// Else player stand, display score.

// Switch mode to computer's turn.
// While comp < 17, add card. Display. Loop.
// Else comp >= 17, display score.

// Fourth click. Compare whose hand is higher.
// Player > comp && Player <=21, Player wins
// Comp > Player && Comp <=21, Comp wins
// else, tie (include both going bust)

/* ========================================================================== */
/* ============================== Design function =========================== */
/* ========================================================================== */
/* ========================================================================== */

// var hitButton = button.createElement("button");
// hitButton.innerText = "Hit";
// document.body.appendChild(hitButton);

// var newButton = document.createElement("button");
// newButton.innerText = "Hello";
// newButton.addEventListener("click", function () {
//   input == "hit";
// });
// document.body.appendChild(newButton);

// // make a variable out of the input and button
// var input = document.querySelector("#submit-button");
// var hitbutton = document.querySelector("#hit-button");

// // call this function
// var myButtonClicked = function () {
//   // get the current value that's been typed into the input
//   var typedValue = input.value;

//   // create a new h2
//   var newHtwo = document.createElement("h2");

//   // set the text inside this new element
//   newHtwo.innerText = typedValue;

//   // make the h2 appear on screen
//   document.body.appendChild(newHtwo);

//   // empty out the HTML input
//   input.value = "";
// };

// say which function to call *when* the user clicks the button
// button.addEventListener("click", myButtonClicked);

/* ========================================================================== */
/* ========================================================================== */
/* =========================== HELPER FUNCTIONS ============================= */
/* ========================================================================== */
/* ========================================================================== */

// Global variables, stay same throughout game. Don't worry about across game. In this case, will be reassigned new value because of functions below.
var gameMode = "drawCard";
var deck = [];
var playerHand = [];
var compHand = [];

var playerHandValue = "";
var compHandValue = "";

// Creating a deck
var create = function (localDeck) {
  var localDeck = []; // ok to declare after function. Will be hoisted to top.
  var suitArray = ["hearts", "diamonds", "clubs", "spades"];

  // Outer to create suite
  for (var outerLoop = 0; outerLoop < 4; outerLoop++) {
    var cardSuit = suitArray[outerLoop];

    // Inner to create 13 cards, change name
    for (var innerLoop = 1; innerLoop <= 13; innerLoop++) {
      var cardRank = innerLoop;
      var cardName = innerLoop;
      if (cardRank == 1) {
        cardName = "ace";
      }
      if (cardRank == 11) {
        cardName = "jack";
      }
      if (cardRank == 12) {
        cardName = "queen";
      }
      if (cardRank == 13) {
        cardName = "king";
      }
      // Put at bottom so that rank suit name is defined first, otherwise card is undefined
      var card = {
        rank: cardRank,
        suit: cardSuit,
        name: cardName,
      };
      localDeck.push(card);
    }
  }
  return localDeck; // Only returning within function. If want to return in grey box, must type this in main function
};

// Shuffle deck
var shuffle = function (createdDeck) {
  var createdDeck;
  for (var loop = 0; loop < 52; loop++) {
    var randomInteger = Math.floor(Math.random() * createdDeck.length);
    var currentCard = createdDeck[loop];
    var randomCard = createdDeck[randomInteger];
    createdDeck[loop] = randomCard;
    createdDeck[randomInteger] = currentCard;
  }
  return createdDeck;
};

deck = create(deck);
deck = shuffle(deck);
console.log(deck);

// Got Black Jack?
var isBlackJack = function (array) {
  var cardOne = array[0];
  var cardTwo = array[1];
  var check = false;
  if (
    (cardOne.name == "ace" && cardTwo.rank >= 10) ||
    (cardTwo.name == "ace" && cardOne.rank >= 10)
  ) {
    check = true;
  }
  return check;
};

// Sum the hand
var sumOfCards = function (array) {
  var sum = 0;
  var aceCounter = 0;
  var index = 0;
  // why model answer don't need declare local variable array or card?

  // loop number of counts
  while (index < array.length) {
    var currentCard = array[index];
    // All picture cards are 10. A shortcut from model answer.
    if (currentCard.rank > 10) {
      // why no need to define rank? But it works. They count picture as 10.
      sum = sum + 10;
    } else if (currentCard.rank == 1) {
      // use rank == 1 instead of ace (model answer)
      aceCounter = aceCounter + 1;
      sum = sum + 11;
    } else {
      sum = sum + currentCard.rank;
    }
    index++;
  }
  // second loop (not inner loop, but equal level) to change from ace == 11 to ace == 1, if sum over 21
  index = 0;
  while (index < aceCounter) {
    if (sum > 21) {
      sum = sum - 10;
    }
    index++;
  }
  return sum;
};

// Displaying scores (copied)
var displayPlayerAndDealerHands = function (playerHandArray, dealerHandArray) {
  var playerMessage = "Player hand:<br>";
  var index = 0;
  while (index < playerHandArray.length) {
    playerMessage =
      playerMessage +
      "- " +
      playerHandArray[index].name +
      " of " +
      playerHandArray[index].suit +
      "<br>";
    index = index + 1;
  }

  index = 0;
  var dealerMessage = "Dealer hand:<br>";
  while (index < dealerHandArray.length) {
    dealerMessage =
      dealerMessage +
      "- " +
      dealerHandArray[index].name +
      " of " +
      dealerHandArray[index].suit +
      "<br>";
    index = index + 1;
  }

  return playerMessage + "<br>" + dealerMessage;
};

// // Backup image
var convertArrayToImageLink = function (array) {
  var output = "";
  for (var index = 0; index < array.length; index++) {
    var card = array[index];
    var image =
      '<img src="https://raw.githubusercontent.com/Ardeeter/Blackjack-exercise/main/images/' +
      card.rank +
      "_of_" +
      card.suit +
      '.png"/>';
    output = output + image;
  }
  return output;
};

// Preamble to show scores
var preamble = function (playerHandValue, compHandValue) {
  var output =
    "<br><br>You: " +
    playerHandValue +
    "<br><br>Comp: " +
    compHandValue +
    "<br><br>";
  return output;
};

/* ========================================================================== */
/* ========================================================================== */
/* ============================= BUTTON FUNCTIONS =========================== */
/* ========================================================================== */
/* ========================================================================== */

// Hit button
document.getElementById("hit-button").onclick = function () {
  if (gameMode == "playerHitOrStand") {
    var newCard = deck.pop();
    playerHand.push(newCard);
    var playerHandValue = sumOfCards(playerHand);
    var compHandValue = sumOfCards(compHand);
    var imageOfPlayerCards = convertArrayToImageLink(playerHand);
    var imageOfCompCards = convertArrayToImageLink(compHand);
    console.log(playerHandValue, compHandValue);

    var result =
      "You drew " +
      newCard.name +
      " of " +
      newCard.suit +
      ". Hit or stand?" +
      "<br><br>Player: " +
      imageOfPlayerCards +
      "<br><br>Comp: " +
      imageOfCompCards +
      preamble(playerHandValue, compHandValue);
    var output = document.querySelector("#output-div");
    output.innerHTML = result;
  }
};

// Stand button
document.getElementById("stand-button").onclick = function () {
  if (gameMode == "playerHitOrStand") {
    var playerHandValue = sumOfCards(playerHand);
    var compHandValue = sumOfCards(compHand);
  }
  if (compHandValue >= 17) {
    var imageOfPlayerCards = convertArrayToImageLink(playerHand);
    var imageOfCompCards = convertArrayToImageLink(compHand);
    result =
      "You decided to stand. Comp decides to stand too. Click next to see who wins." +
      "<br><br>Player: " +
      imageOfPlayerCards +
      "<br><br>Comp: " +
      imageOfCompCards +
      preamble(playerHandValue, compHandValue);
    // displayPlayerAndDealerHands(playerHand, compHand);
    var output = document.querySelector("#output-div");
    output.innerHTML = result;
  }
  while (compHandValue < 17) {
    var newCard = deck.pop();
    compHand.push(newCard);
    console.log(playerHandValue, compHandValue);
    playerHandValue = sumOfCards(playerHand);
    compHandValue = sumOfCards(compHand);
    var imageOfPlayerCards = convertArrayToImageLink(playerHand);
    var imageOfCompCards = convertArrayToImageLink(compHand);
  }

  gameMode = "whoWins";
  result =
    "You decided to stand. Comp decides to draw. Comp drew " +
    newCard.name +
    " of " +
    newCard.suit +
    ". Click next to see who wins." +
    "<br><br>Player: " +
    imageOfPlayerCards +
    "<br><br>Comp: " +
    imageOfCompCards +
    preamble(playerHandValue, compHandValue);
  // displayPlayerAndDealerHands(playerHand, compHand);
  var output = document.querySelector("#output-div");
  output.innerHTML = result;
};

// Fade out hit button
function EnableDisable(gameMode) {
  var btnSubmit = document.getElementById("hit-button");
  if (gameMode == "playerHitOrStand") {
    //Enable the TextBox when TextBox has value.
    btnSubmit.disabled = false;
  } else {
    //Disable the TextBox when TextBox is empty.
    btnSubmit.disabled = true;
  }
}

// function EnableDisable(txtPassportNumber) {
//   //Reference the Button.
//   var btnSubmit = document.getElementById("btnSubmit");

//   //Verify the TextBox value.
//   if (txtPassportNumber.value.trim() != "") {
//     //Enable the TextBox when TextBox has value.
//     btnSubmit.disabled = false;
//   } else {
//     //Disable the TextBox when TextBox is empty.
//     btnSubmit.disabled = true;
//   }
// }

// var element = document.getElementById("first");
// var btn = document.getElementById("submit_button");

// document.getElementById("submit-button").keypress(function (event) {
//   if (event.keyCode === 13) {
//     $("submit-button").click();
//   }
// });

// var input = document.getElementById("myInput");
// input.addEventListener("keyup", function (event) {
//   if (event.key === 13) {
//     event.preventDefault();
//     document.getElementById("myBtn").click();
//   }
// });

/* ========================================================================== */
/* ========================================================================== */
/* ============================= MAIN FUNCTIONS ============================= */
/* ========================================================================== */
/* ========================================================================== */

var main = function (input) {
  var myOutputValue = "";

  // First click. Deal two cards each.
  if (gameMode == "drawCard") {
    //create new deck each new round
    deck = shuffle(create(deck));
    console.log(deck);
    // Do I need this to reset hand each new round
    playerHand = [];
    compHand = [];

    playerHandValue = 0;
    compHandValue = 0;

    var playerCard1 = deck.pop();
    var playerCard2 = deck.pop();
    var compCard1 = deck.pop();
    var compCard2 = deck.pop();

    playerHand.push(playerCard1, playerCard2);
    compHand.push(compCard1, compCard2);
    console.log(playerHand);
    console.log(compHand);
    gameMode = "gotBlackJack";
    myOutputValue =
      "You have been dealt two cards. Click to see your hand. <br><br>" +
      '<img src="https://github.com/mccleary/blackjack/blob/master/images/cardback.png?raw=true"/>' +
      '<img src="https://github.com/mccleary/blackjack/blob/master/images/cardback.png?raw=true"/>';
    return myOutputValue;
  }

  // Inform them of their draw, and if they have Black Jack
  if (gameMode == "gotBlackJack") {
    var playerHasBlackJack = isBlackJack(playerHand);
    var compHasBlackJack = isBlackJack(compHand);

    var playerHandValue = sumOfCards(playerHand);
    var compHandValue = sumOfCards(compHand);
    var imageOfPlayerCards = convertArrayToImageLink(playerHand);
    var imageOfCompCards = convertArrayToImageLink(compHand);
    console.log(imageOfPlayerCards);

    if (playerHasBlackJack == true && compHasBlackJack == false) {
      gameMode = "drawCard";

      myOutputValue =
        "You win. Click to play again." +
        "<br><br>Player: " +
        imageOfPlayerCards +
        "<br><br>Comp: " +
        imageOfCompCards +
        preamble(playerHandValue, compHandValue);
      // displayPlayerAndDealerHands(playerHand, compHand);
    } else if (playerHasBlackJack == false && compHasBlackJack == true) {
      gameMode = "drawCard";
      myOutputValue =
        "You lose. Click to play again." +
        "<br><br>Player: " +
        imageOfPlayerCards +
        "<br><br>Comp: " +
        imageOfCompCards +
        preamble(playerHandValue, compHandValue);
      // displayPlayerAndDealerHands(playerHand, compHand);
    } else if (playerHasBlackJack == true && compHasBlackJack == true) {
      gameMode = "drawCard";
      myOutputValue =
        "It's a black jack tie. Click to play again." +
        "<br><br>Player: " +
        imageOfPlayerCards +
        "<br><br>Comp: " +
        imageOfCompCards +
        preamble(playerHandValue, compHandValue);
      // displayPlayerAndDealerHands(playerHand, compHand);
    } else {
      gameMode = "playerHitOrStand";
      myOutputValue =
        "No black jack yet. Hit or stand?" +
        "<br><br>Player: " +
        imageOfPlayerCards +
        "<br><br>Comp: " +
        imageOfCompCards +
        preamble(playerHandValue, compHandValue);
      // displayPlayerAndDealerHands(playerHand, compHand);
    }
    return myOutputValue;
  }

  // Player hit or stand
  // original hit function
  // if (gameMode == "playerHitOrStand") {
  // if (input == "hit") {
  //   var newCard = deck.pop();
  //   playerHand.push(newCard);
  //   var playerHandValue = sumOfCards(playerHand);
  //   var compHandValue = sumOfCards(compHand);
  //   var imageOfPlayerCards = convertArrayToImageLink(playerHand);
  //   var imageOfCompCards = convertArrayToImageLink(compHand);
  //   console.log(playerHandValue, compHandValue);

  //   myOutputValue =
  //     "You drew " +
  //     newCard.name +
  //     " of " +
  //     newCard.suit +
  //     ". Hit or stand?" +
  //     "<br><br>Player: " +
  //     imageOfPlayerCards +
  //     "<br><br>Comp: " +
  //     imageOfCompCards +
  //     preamble(playerHandValue, compHandValue);
  //   // displayPlayerAndDealerHands(playerHand, compHand);
  //   return myOutputValue;

  // // stand button back up
  // if (gameMode == "playerHitOrStand") {
  //   // backup stand function
  //   if (input == "stand") {
  //     //  } else if (input == "stand") {
  //     var playerHandValue = sumOfCards(playerHand);
  //     var compHandValue = sumOfCards(compHand);
  //   }
  //   if (compHandValue >= 17) {
  //     myOutputValue =
  //       "You decided to stand. Comp decides to stand too." +
  //       "<br><br>Player: " +
  //       imageOfPlayerCards +
  //       "<br><br>Comp: " +
  //       imageOfCompCards +
  //       preamble(playerHandValue, compHandValue);
  //     // displayPlayerAndDealerHands(playerHand, compHand);
  //   }
  //   while (compHandValue < 17) {
  //     var newCard = deck.pop();
  //     compHand.push(newCard);
  //     console.log(playerHandValue, compHandValue);
  //     playerHandValue = sumOfCards(playerHand);
  //     compHandValue = sumOfCards(compHand);
  //   }

  //   gameMode = "whoWins";
  //   myOutputValue =
  //     "You decided to stand. Comp decides to draw. Comp drew " +
  //     newCard.name +
  //     " of " +
  //     newCard.suit +
  //     ". Click to see who wins." +
  //     "<br><br>Player: " +
  //     imageOfPlayerCards +
  //     "<br><br>Comp: " +
  //     imageOfCompCards +
  //     preamble(playerHandValue, compHandValue);
  //   // displayPlayerAndDealerHands(playerHand, compHand);
  //   return myOutputValue;
  // }

  if (gameMode == "whoWins") {
    var playerHandValue = sumOfCards(playerHand);
    var compHandValue = sumOfCards(compHand);
    var imageOfPlayerCards = convertArrayToImageLink(playerHand);
    var imageOfCompCards = convertArrayToImageLink(compHand);
    // tied game
    if (
      playerHandValue == compHandValue ||
      (playerHandValue > 21 && compHandValue > 21)
    ) {
      myOutputValue =
        "It's a tie. Click to play again." +
        "<br><br>You: " +
        imageOfPlayerCards +
        "<br><br>Comp: " +
        imageOfCompCards +
        preamble(playerHandValue, compHandValue);
      gameMode == "drawCard";
      // displayPlayerAndDealerHands(playerHand, compHand);
    }

    // comp wins
    else if (compHandValue > playerHandValue && compHandValue <= 21) {
      myOutputValue =
        "Comp wins. Click to play again." +
        "<br><br>Player: " +
        imageOfPlayerCards +
        "<br><br>Comp: " +
        imageOfCompCards +
        preamble(playerHandValue, compHandValue);
      gameMode == "drawCard";
      // displayPlayerAndDealerHands(playerHand, compHand);
    }

    // you win
    else {
      myOutputValue =
        "You win. Click to play again." +
        "<br><br>Player: " +
        imageOfPlayerCards +
        "<br><br>Comp: " +
        imageOfCompCards +
        preamble(playerHandValue, compHandValue);
      // displayPlayerAndDealerHands(playerHand, compHand);
      gameMode = "drawCard";
    }
    return myOutputValue;
  }

  // data validation
  myOutputValue = `Invalid input. Please hit or stand.`;
  return myOutputValue;
};
