// Render chat templates to the DOM
// Clear the list of chats (when the room changes)
const chatWindow = document.querySelector('.chat-window');

class ChatUI{
    constructor(list){
        this.list = list;
    }
    // clear all the messages
    clear(){
        this.list.innerHTML = "";
    }
    // get all the new entries on the database
    render(data){
        const when = dateFns.distanceInWordsToNow(
            data.created_at.toDate(), {addSuffix: true}
        )

        if(data.author == localStorage.author){
            const html = `
                <li class="list-group-item user-messages">
                    <span class="username">${data.username}</span>
                    <span class="message">${data.message}</span>
                    <div class="time">${when}</div>    
                </li>
            `;
            this.list.innerHTML += html;
        } else {
            const html = `
                <li class="list-group-item">
                    <span class="username">${data.username}</span>
                    <span class="message">${data.message}</span>
                    <div class="time">${when}</div>    
                </li>
            `;
            this.list.innerHTML += html;
        }

        // get scroll to the bottom of chat room
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }
}

export {ChatUI as default};