export class Pull {
    constructor() {
        this.users = {};
    }

    register(user) {
        this.users[user.name] = user;

        user.room = this;
        console.log(user)
    }

    send(message, from, to) {
        if (to) {
            this.users[to].receive(message, from)
        } else {
            Object.keys(this.users).forEach(key => {

                if (this.users[key] !== from) {
                    this.users[key].receive(message, from)
                }
            })
        }
    }
}

