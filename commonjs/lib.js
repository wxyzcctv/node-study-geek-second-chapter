console.log("hello geek");

exports.hello = "world";

exports.add = function (a, b) {
    return a + b;
}
exports.geek = { hello: 'world' };

module.exports = function sub(a, b) {
    return a - b;
}

setTimeout(() => {
    console.log(exports);
}, 2000)