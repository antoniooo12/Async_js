import {AppComponent} from "../../Core/AppComponent";
import {$} from "../../Core/Dom";

export class Line extends AppComponent {
    static className = 'showMessage__block';

    constructor($root) {
        super($root, {
            name: 'lineMessage',
            listeners: ['click'],
        });
        this.messageArr = [];
    }

    toHTML() {
        return `
        <div class="lineMessage__elements"><button data-type="delete">X</button><span class="lineMessage"></span> </div>
        `
    }

    changeHTML() {
        const placeForText = $(document.querySelector('.lineMessage'));
        let filteredArr =[];
            function input(message, i) {
            placeForText.innerHTML(`
            <span data-type="massegeInLine" data-index="${i}" data-id="${message.id}">${message.text}</span>
            `)
        }
        let i = 0;
        this.messageArr.forEach(message => {
            if (!message.delete) {
                filteredArr.push(message)
            }
        })
        const length = filteredArr.length
        if(length ===0){
            placeForText.innerHTML('')
        }else if(length ===1){
            input(filteredArr[0], 0)
        }else {
            this.refreshIntervalId = setInterval(function () {
                input(filteredArr[i], i);
                i++;
                if (i >= length) i = 0;
            }, 2000);
        }

    }

    onClick(evt) {
        const target = $(evt.target);
        if (target.data.type === 'delete') {
            const currentMessage = $(document.querySelector('[data-type="massegeInLine"]'))
            const currentMessageID = Number(currentMessage.data.id)
            const currentMessageIndex = Number(currentMessage.data.index)
            // this.messageArr[currentMessageIndex].delete = true;
            this.messageArr.forEach(message=>{
                if(message.id === currentMessageID){
                    message.delete = true;
                }
            })

        }

        clearInterval(this.refreshIntervalId)
        this.changeHTML()
        this.send(this.messageArr)
    }


    send(message, to) {
        this.room.send(message, this, 'storage')
    }

    receive(message, from) {
        console.log(message)
        this.messageArr = message;
        console.log(this.messageArr)
        clearInterval(this.refreshIntervalId)
        this.changeHTML();

    }
}