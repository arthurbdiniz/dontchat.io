// socket connection
let socket = io.connect();

// DOM queries
let send = document.getElementById('send');
let message = document.getElementById('message');
let nickname = document.getElementById('nickname');

// Events
send.addEventListener('click', sendMessage);
message.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
        sendMessage();
    }
});

// functions
function processNickname(nick) {
    if (nick === '' || nick.match(/^ *$/)) {
        let nick = `Anonymous ${Date.now()}`;
        return nick;
    } else {
        return nick;
    }
}

function sendMessage() {
    nickname.value = processNickname(nickname.value);

    let data = {
        nickname: nickname.value,
        message: message.value,
        time: Date.now()
    }
    socket.emit('chat-send', data);
    message.value = '';
}