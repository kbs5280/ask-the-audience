var socket = io();

var connectionCount = document.getElementById('connection-count');
var statusMessage = document.getElementById('status-message');
var countVotes = document.getElementById('count-votes');
var buttons = document.querySelectorAll('#choices button');

socket.on('usersConnected', function (count) {
  connectionCount.innerText = 'Connected Users: ' + count;
});

socket.on('statusMessage', function (message) {
  statusMessage.innerText = message;
});

socket.on('voteCount', function(votes) {
  var votes = Object.keys(votes).map(function(vote) {
   return ' ' + vote + ': ' + votes[vote];
 });
 countVotes.innerText = votes;
});

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', (e) => {
    socket.send('voteCast', e.target.innerText);
  });
}
