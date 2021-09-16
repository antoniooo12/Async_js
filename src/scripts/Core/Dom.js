class Dom {
    constructor(selector) {
        this.$el = typeof selector === "string"
            ? document.querySelector(selector)
            : selector
    }

    get data() {
        return this.$el.dataset
    }

    get value() {
        return this.$el.value;
    }
    get getText(){
        return  this.$el.textContent;
    }

    html(html) {
        if (typeof html === 'string') {
            this.$el.innerHTML = html
            return this

        }
        return this.$el.outerHTML.trim()
    }

    innerHTML(html) {
        this.$el.innerHTML = html
        return this
    }

    textContent(text) {
        this.$el.textContent = text
        return this
    }

    insertAdjacentHTML(position = '', html) {
        this.$el.insertAdjacentHTML(position, html)
    }

    on(eventType, callback) {
        this.$el.addEventListener(eventType, callback)
    }

    append(node) {
        if (node instanceof Dom) {
            node = node.$el
        }
        if (Element.prototype.append) {
            this.$el.append(node)
        } else {
            this.$el.appendChild(node)
        }
        return this
    }


    css(styles = {}) {
        Object.keys(styles).forEach(key => {
            this.$el.styles[key] = styles[key]
        })
    }

    find(selector) {
        return $(this.$el.querySelector(selector))

    }

    closest(selector) {
        return $(this.$el.closest(selector))
    }
}


export function $(selector) {
    return new Dom(selector)
}


$.create = (tagname, classes = '', id = '') => {
    const el = document.createElement(tagname)
    if (classes) {
        if (typeof classes !== 'string') {
            el.classList.add(...classes)
        } else {
            el.classList.add(classes)
        }
    }
    if (id) {
        el.id = id
    }
    return $(el)
}