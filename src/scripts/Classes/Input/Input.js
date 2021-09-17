import {AppComponent} from "../../Core/AppComponent";
import {Pull} from "../Pull/Pull";
import {$} from "../../Core/Dom";

export class Input extends AppComponent {

    static className = 'input__block';

    constructor($root) {
        super($root, {
            name: 'inputMessage',
            listeners: ['click'],
        });
        this.room = null;
        this.register = true;
        this.observer = [Storage];
        this.actions = [];
    }

    toHTML() {
        return `
    <input data-type="inputValue">
    <button data-type="send">write</button>
    `
    }

    onClick(evt) {
        if($(evt.target).data.type ==='send'){
            this.getData()
        }
    }
    send(message, to  ) {
        this.room.send(message, this, 'storage')
    }

    receive(message, from) {
        ///no
    }

    getData() {
        const input = document.querySelector('[data-type="inputValue"]')
        this.send(input.value)
    }
}