// socket connection
let socket = io.connect(window.location.pathname);

// DOM queries
let send = document.getElementById('send');
let message = document.getElementById('message');
let nickname = document.getElementById('nickname');
let messages = document.getElementById('messages');

// Events
send.addEventListener('click', sendMessage);
message.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
        sendMessage();
    }
});

// Socket events
socket.on('chat-receive', receiveMessage);

// helpers
function processNickname(nick) {
    if (nick === '' || nick.match(/^ *$/)) {
        let nick = `Anonymous ${Date.now()}`;
        return nick;
    } else {
        return nick;
    }
}

function formatMessage(data) {
    let msg = `<strong>${data.nickname}:</strong> ${data.message}`;
    return msg;
}

// event functions
function sendMessage() {
    nickname.value = processNickname(nickname.value);

    let data = {
        namespace: window.location.pathname,
        nickname: nickname.value,
        message: message.value,
        time: Date.now()
    }
    socket.emit('chat-send', data);
    message.value = '';
}

function receiveMessage(data) {
    console.log(data);
    let formattedMessage = formatMessage(data);
    let msg = document.createElement('li');
    msg.innerHTML += formattedMessage;
    msg.setAttribute('class', 'list-group-item');
    messages.appendChild(msg);
}