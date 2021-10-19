const net = require('net');
const { send } = require('process');

const server = net.createServer((socket) => {
    // 读取数据
    socket.on('data', (buffer) => {
        // 全双工通信时需要将数据的序号取出
        const seqBuffer = buffer.slice(0, 2);
        const lessonid = buffer.readInt32BE(2);

        // 为了提现全双工通信，选择随机1s内随机时间发送数据回客户端
        setTimeout(() => {
            // 全双工通信服务端发送数据时也将数据序号加入传递的数据中
            const sendBuffer = Buffer.concat([
                seqBuffer,
                Buffer.from(data[lessonid])
            ])
            socket.write(
                sendBuffer
            )
        }, 10 + Math.random() * 1000);
    })
})

server.listen(4000);

const data = {
    136797: "01 | 课程介绍",
    136798: "02 | 内容综述",
    136799: "03 | Node.js是什么？",
    136800: "04 | Node.js可以用来做什么？",
    136801: "05 | 课程实战项目介绍",
    136803: "06 | 什么是技术预研？",
    136804: "07 | Node.js开发环境安装",
    136806: "08 | 第一个Node.js程序：石头剪刀布游戏",
    136807: "09 | 模块：CommonJS规范",
    136808: "10 | 模块：使用模块规范改造石头剪刀布游戏",
    136809: "11 | 模块：npm",
    141994: "12 | 模块：Node.js内置模块",
    143517: "13 | 异步：非阻塞I/O",
    143557: "14 | 异步：异步编程之callback",
    143564: "15 | 异步：事件循环",
    143644: "16 | 异步：异步编程之Promise",
    146470: "17 | 异步：异步编程之async/await",
    146569: "18 | HTTP：什么是HTTP服务器？",
    146582: "19 | HTTP：简单实现一个HTTP服务器"
}
