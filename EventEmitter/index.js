
const geek = require('./lib')

geek.addListener('newProject', (e) => {
    if (e.price > 20) {
        console.log('doit', e.price);
    }
})