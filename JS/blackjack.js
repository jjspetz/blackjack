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
var deck = buildDeck();
console.log(deck);
var shuffled_deck = [];
function shuffle() {
  var index = Math.floor(Math.random() * deck.length)
  var card = deck[index];
  console.log(card);
  deck.splice(index, 1);
  shuffled_deck.push(card);
  if (deck.length > 0) {
    shuffle();
  }
}

// set up for new game
shuffle();

// the array of cards dealt
var dealtCards = []

// deals random card
function give(player) {
      var next = shuffled_deck.pop();
      $('#'+player+'-hand').append('<img src="images/'+ next.img + '">');
}

// deal function
$('#deal-button').click(function() {
  give('dealer');
  give('player');
});

// hit function
$('#hit-button').click(function() {
  give('player');
});
