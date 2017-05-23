// global variables
var deck;
var shuffled_deck;

// deck building function
var deckArray = []
function buildDeck() {
  var label = ['2','3','4','5','6','7','8','9','10','jack','queen','king','ace'];
  var suit = ['clubs','spades','diamonds','hearts'];
  label.forEach(function(label) {
    suit.forEach(function(suit) {
      deckArray.push({'label': label, 'suit':suit, 'img':label + '_of_' + suit + '.png'})
    });
  });
  return deckArray;
}

// shuffle the deck
function shuffle() {
  var index = Math.floor(Math.random() * deck.length)
  var card = deck[index];
  deck.splice(index, 1);
  shuffled_deck.push(card);
  if (deck.length > 0) {
    shuffle();
  }
}

// set up for new game
function game() {
  deck = buildDeck();
  shuffled_deck = [];
  // shuffle the new deck
  shuffle();

  // reset windows
  $('.hand').html('');
  $('#messages').html('');
  // reset points
  $('#dealer-points').html('0');
  $('#player-points').html('0');
  // reset buttons
  toggleBtns(false)
  $('#restart-button').prop('disabled', true);

  // initial deals
  $('#dealer-hand').append('<img src="images/back.png">');
  give('dealer');
  give('player');
  give('player');
}
// runs game on load
game();

// deals random card
function give(player) {
  // pops top card from the deck and assigns to variable for function use
  var next = shuffled_deck.pop();
  // calls calc function on top card to add to the player's total
  $('#'+player+'-points').html( parseInt($('#'+player+'-points').html()) + calc(next));
  check(player);
  $('#'+player+'-hand').append('<img src="images/'+ next.img + '">');
}

// calculates the value of the card
function calc(card) {
  var val = parseInt(card.label);
  if (isNaN(val)) {
    if (card.label == 'ace') {
      val = 11;
    } else {
      val = 10;
    }
  }
  return val;
}
// used to disable or reenable buttons
function toggleBtns(bool=true) {
  $('#hit-button').prop('disabled', bool);
  $('#stand-button').prop('disabled', bool);
}

// checks for bust and displays msg if bust as well as disables buttons
function check(player) {
  if ($('#'+player+'-points').html() > 21) {

    $('#messages').html("<h2>" + player + " busts!</h2>")

    // resets button disabled properties
    toggleBtns() // disables hit and stand buttons
    $('#restart-button').prop('disabled', false);
  }
}
// win function: determines the winner and prints a message
function winner() {
  if ($('#player-points').html() > $('#dealer-points').html()) {
    console.log('player > dealer: ' + this);
    $('#messages').html("<h2>Player wins!</h2>")
  }
  else if ($('#player-points').html() < $('#dealer-points').html()) {
    $('#messages').html("<h2>Dealer wins!</h2>")
  } else {
    $('#messages').html("<h2>Push</h2>")
  }

  // enables reset buttons
  $('#restart-button').prop('disabled', false);
}

// stand function
$('#stand-button').click(function() {
  // disables hit and stand buttons
  toggleBtns()
  // gets rid of back of card image
  $('#dealer-hand img:first-of-type').hide();
  // draws top card of the deck
  var next = shuffled_deck.pop();
  // calls calc function on top card to add to the player's total
  $('#dealer-points').html( parseInt($('#dealer-points').html()) + calc(next));
  check('dealer');
  $('#dealer-hand').prepend('<img src="images/'+ next.img + '">');
  // dealer hits if under 17
  while ( $('#dealer-points').html() < 17) {
    give('dealer');
  }
  winner();
});

// hit function
$('#hit-button').click(function() {
  give('player');
});

// restart game function
$('#restart-button').click(function() {
  game();
});
