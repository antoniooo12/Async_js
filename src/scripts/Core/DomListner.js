export class DomListner {
    constructor($root, listeners = []) {
        if (!$root) {
            throw new Error('no root provided for DomListner')
        }

        this.$root = $root
        this.listeners = listeners
    }
    initDOMListners(){
this.listeners.forEach(listner =>{
const method = getMethodName(listner)
    console.log(method)
    if(!this[method]){
        throw new Error(`Method ${method} is not implemented in ${this.name || ''} component`)
    }
    this[method] = this[method].bind(this)
    this.$root.on(listner, this[method])

})
    }
}


function getMethodName(eventName) {
    return 'on' + capitalize(eventName)
}
function capitalize(string){
    if (typeof string!== 'string'){
        return ''
    }
    return string.charAt(0).toUpperCase()+ string.slice(1)
}