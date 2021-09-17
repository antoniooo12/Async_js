export class Storage {
    constructor() {
        this.storage = [];
        this.name = 'storage';
        this.room = null;
    }

    send(message, to) {
        this.room.send(message, this, to)
    }

    receive(message, from) {
        console.log(message)
        typeof message === 'string'
            ? this.addToStorage(message)
            : this.changeStorage(message)
        // this.addToStorage(message)
        this.send(this.storage)
    }

    changeStorage(changedStorage) {

        this.storage = changedStorage;

    }

    addToStorage(message) {
        this.storage.push({
            text: message,
            delete: false,
            id: Date.now(),
        })
    }
}