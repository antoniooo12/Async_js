import {AppComponent} from "../../Core/AppComponent";
import {$} from "../../Core/Dom";

export class Dashboard extends AppComponent {
    static className = 'dashboard__block';

    constructor($root) {
        super($root, {
            name: 'dashBoard',
            listeners: ['click'],
        })
        this.room = null;
        this.messageArr = []
    }

    toHTML() {
        return `
  <div class="dashboard">
  
</div>
    `
    }

    changeHTML() {
        // debugger
        const dashboard = $(document.querySelector('.dashboard'));
        dashboard.innerHTML('')
        this.messageArr.forEach((line, index) => {
            console.log(line)
            let messageRow = $.create('div', 'message')
            const deleteSign = this.messageArr[index].delete === true ? 'x ' : '';
            messageRow.innerHTML(`<span data-id="${index}">${deleteSign}</span><span class="text">${this.messageArr[index].text}</span>`)
            dashboard.append(messageRow)
        })
    }

    onClick() {

    }

    send(message, to) {
        this.room.send(message, this, to)
    }

    receive(message, from) {
        this.messageArr = message;
        this.changeHTML();
    }

}