import {DomListner} from "./DomListner";

export class AppComponent extends DomListner{
    constructor($root, options={}) {
        super($root, options.listeners)
        this.name = options.name || 'noName'
    }
    init(){
        this.initDOMListners()
    }


}