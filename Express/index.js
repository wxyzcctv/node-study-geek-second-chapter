const querystring = require("querystring")
const http = require("http");
const url = require("url");
const fs = require("fs");
const game = require('../Express/game');

const express = require("express")

var playerWinCount = 0;
var playerLastAction = null;
var sameAction = 0;

const app = express()

app.get("/favicon.ico", function (request, response) {
    response.status(200);
    response.send();
    return;
})
app.get("/game",

    function (request, response, next) {
        if (playerWinCount >= 3 || sameAction === 9) {
            response.status(500);
            response.send("我再也不和你玩了！");
            return;
        }

        next();

        if (response.playerWon) {
            playerWinCount++
        }
    },

    function (request, response, next) {
        const qurey = request.query;
        const playerAction = qurey.action;

        if (playerAction === playerLastAction) {
            sameAction++;
        } else {
            sameAction = 0;
        }

        if (sameAction === 3) {
            response.status(400);
            response.send("你作弊！");
            sameAction = 9;
            return;
        }

        playerLastAction = playerAction;
        response.playerAction = playerAction;
        next()
    },
    function (request, response) {
        const playerAction = response.playerAction;
        const gameResult = game(playerAction);
        response.status(200);
        if (gameResult === 0) {
            response.send('平局！')
        } else if (gameResult === 1) {
            response.playerWon = true;
            response.send("你赢了！")
        } else {
            response.send("你输了！")

        }
    }
)

app.get("/", function (request, response) {
    response.send(fs.readFileSync(__dirname + "/index.html", "utf-8"));
})

app.listen(3000)
