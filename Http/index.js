const querystring = require("querystring")
const http = require("http");
const url = require("url");
const fs = require("fs");
const game = require('../Express/game');

var playerWon = 0;
var playerLastAction = null;
var sameAction = 0;

http.createServer(function (request, response) {
    const parseUrl = url.parse(request.url);

    if (parseUrl.pathname === "/favicon.ico") {
        response.writeHead(200);
        response.end();
        return;
    }

    if (parseUrl.pathname === '/game') {
        const qurey = querystring.parse(parseUrl.query);
        const playerAction = qurey.action;

        if (playerWon >= 3 || sameAction === 9) {
            response.writeHead(500);
            response.end("我再也不和你玩了！");
            return;
        }

        if (playerAction === playerLastAction) {
            sameAction++;
        } else {
            sameAction = 0;
        }

        if (sameAction === 3) {
            response.writeHead(400);
            response.end("你作弊！");
            sameAction = 9;
            return;
        }

        playerLastAction = playerAction;

        const gameResult = game(playerAction);
        response.writeHead(200);
        if (gameResult === 0) {
            response.end('平局！')
        } else if (gameResult === 1) {
            playerWon++;
            response.end("你赢了！")
        } else {
            response.end("你输了！")

        }
    }

    if (parseUrl.pathname === '/') {
        fs.createReadStream(__dirname + "/index.html").pipe(response)
    }
}).listen(3000)