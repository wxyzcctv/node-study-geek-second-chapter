const net = require('net')

const socket = new net.Socket({});
// 负责网络通信通路的写入读出

socket.connect({
    host: '127.0.0.1',
    port: '4000'
})

const lessonids = [
    "136797",
    "136798",
    "136799",
    "136800",
    "136801",
    "136803",
    "136804",
    "136806",
    "136807",
    "136808",
    "136809",
    "141994",
    "143517",
    "143557",
    "143564",
    "143644",
    "146470",
    "146569",
    "146582"
]


socket.on("data", (buffer) => {
    // 全双工通信中客户端接收到服务端传递回来的数据后需要将数据的序号分离出来
    const seqBuffer = buffer.slice(0, 2);
    const titleBuffer = buffer.slice(2)

    console.log(seqBuffer.readInt16BE(), titleBuffer.toString());
})

// 为了实现全双工通信需要在传递的每一个数据中加入序号
let seq = 0;
function ecode() {
    let id = Math.floor(Math.random() * lessonids.length)
    let buffer = Buffer.alloc(6);
    buffer.writeInt16BE(seq)
    buffer.writeInt32BE(
        lessonids[id], 2
    )
    console.log(seq, lessonids[id]);
    seq++;
    return buffer
}
// 为了提现全双工通信，设置客户端随机50ms发送数据到服务端
setInterval(() => {
    socket.write(ecode());
}, 50);