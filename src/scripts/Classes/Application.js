import {$} from "../Core/Dom";
import {Pull, User} from "./Pull/Pull";
import {Storage} from "./Storage/Storage";

export class Application {
    constructor(selector, options) {
        this.$el = $(selector);
        this.components = options.components || [];
        this.mediator = options.mediator || [];
        this.storageRoom = new Pull();
        this.storage= new Storage();
    }

    getRoot() {
        const $root = $.create('div', 'app');
        this.components = this.components.map(Component => {


            const $el = $.create('div', Component.className);
            const component = new Component($el);

            this.storageRoom.register(component)


            $el.html(component.toHTML());
            $root.append($el);
            return component;
        })
        return $root;
    }




    render() {

        this.storageRoom.register(this.storage)
        this.$el.append(this.getRoot())
        this.components.forEach(component => {
            component.init()
        });
    }
}