import ChatUI from './ui';
import Chatroom from './chat';

// DOM queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');
const buttons = document.querySelectorAll('.chat-rooms .btn');


// add a new chat
newChatForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
    .then( () => newChatForm.reset())
    .catch(err => console.log(err));
    console.log('click 1');
});

// update username
newNameForm.addEventListener('submit', e => {
    console.log('click');
    e.preventDefault();
    const newUsername = newNameForm.name.value.trim();
    chatroom.checkName(newUsername);
    newNameForm.reset();
});


// update chatroom
rooms.addEventListener('click', e => {
    if(e.target.tagName === "BUTTON"){
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats(chat => chatUI.render(chat));
        buttons.forEach((btn) => {
            btn.classList.remove('active');
        })
        e.target.classList.add('active');
    }
});


// check if username exists in local storage
const username = localStorage.username ? localStorage.username : 'anonymous' ;

const chatUI = new ChatUI(chatList);

const chatroom = new Chatroom('general', username);

// get the chats and render
chatroom.getChats(data => chatUI.render(data));