// adding new chat documents
// setting up a real-time listener to get new-chats
// updating the username
// updating the room

const chatList = document.querySelector('.chat-list');
const NoMessages = document.querySelector('.no-messages');

import errorMessage from './errorMessage';
import successMessage from './successMessage';

// Show errors
const error = new errorMessage;
error.init();

// Show success message
const success = new successMessage;
success.init();

class Chatroom {
    constructor(room, username){
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
        this.unsub;
    }
    addChat(message){
        // format a chat object (to inject on the database)
        const now = new Date();
        // see if author exists in local storage
        const author = localStorage.author ? localStorage.author : 'anonymous' ;
        const chat = {
            message: message,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now),
            author: author
        };
        // save the chat document
        const response = this.chats.add(chat);
        return response;
    }
    getChats(callback){
        this.unsub = this.chats
        .where('room', '==', this.room)
        .orderBy('created_at')
        .onSnapshot(snapshot => {
            if(snapshot.size == 0){
                NoMessages.classList.remove('invisible');
            } else {
                if(typeof(NoMessages) != 'undefined' || NoMessages != null){
                    NoMessages.style.display = 'none';
                }
                snapshot.docChanges().forEach(change => {
                    if(change.type === "added"){
                        // update the UI with the new messages
                        callback(change.doc.data());
                    }
                });
            }
        });
    }
    updateName(values, username){
        console.log('aqui');
        if(values.includes(username)) {
            error.show('This username has already been taken');
        } else if (localStorage.username == username) {
            error.show('Send a message and the new username will be saved');
        } else {
            console.log(username);
            success.show(`Your name was updated to ${username}`);
            this.username = username;
            localStorage.setItem('username', username);
        }

    }
    async checkName(username){
        let usernames = new Array;
        await this.chats.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                usernames.push(doc.data().username);
                return usernames;
            });
        });
        console.log(usernames);
        this.updateName(usernames, username)
    }
    updateRoom(room){
        this.room = room;
        console.log('room updated');
        // unsubscribe changes from the older room
        if(this.unsub) {
            this.unsub();
        }
    }
}

export {Chatroom as default};