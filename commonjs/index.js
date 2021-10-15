const game = require('./lib');
var count = 0;

// 开启一个进程
process.stdin.on("data", e => {
    // 监听开启进程之后的输入内容
    const playerAction = e.toString().trim();
    // 将输入内容通过game函数逻辑中并记下返回结果
    const result = game(playerAction);
    if (result === -1) {
        count += 1;
    }
    if (count === 3) {
        console.log("你赢了我三次了，太厉害了，不和你玩了");
        // 脱出进程
        process.exit();
    }
})