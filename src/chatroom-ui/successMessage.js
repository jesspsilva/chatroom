import './styles/successMessage.css';

class successMessage {
    constructor(){
        this.successMessage = document.createElement('div');
    }
    init(){
        this.successMessage.classList.add('successMessage');
        document.querySelector('body').appendChild(this.successMessage);
    }
    show(message){
        this.successMessage.textContent = message;
        this.successMessage.classList.add('active');
        setTimeout(() => {
            this.successMessage.classList.remove('active');
        }, 4000);
    }
}

export {successMessage as default};