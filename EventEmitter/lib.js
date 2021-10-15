const EventEmitter = require('events').EventEmitter;

class Geek extends EventEmitter {
    constructor() {
        super();
        setInterval(() => {
            this.emit('newProject', { price: Math.random() * 100 })
        }, 2000)
    }
}
const geek = new Geek();
module.exports = geek