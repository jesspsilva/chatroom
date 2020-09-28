import './styles/errorMessage.css';

class errorMessage {
    constructor(){
        this.errorMessage = document.createElement('div');
    }
    init(){
        this.errorMessage.classList.add('errorMessage');
        document.querySelector('body').appendChild(this.errorMessage);
    }
    show(message){
        this.errorMessage.textContent = message;
        this.errorMessage.classList.add('active');
        setTimeout(() => {
            this.errorMessage.classList.remove('active');
        }, 4000);
    }
}

export {errorMessage as default};