const querystring = require("querystring")
const http = require("http");
const url = require("url");
const fs = require("fs");
const game = require('./game');

const koa = require("koa");
const mount = require("koa-mount");

var playerWinCount = 0;
var playerLastAction = null;
var sameAction = 0;

// const app = express()
const app = new koa();

app.use(
    mount('/favicon.ico', function (ctx) {
        ctx.status = 200;
        ctx.body = null;
    })
)

const gameKoa = new koa;
gameKoa.use(
    async function (ctx, next) {
        if (playerWinCount >= 3) {
            ctx.status = 500;
            ctx.body = "我再也不和你玩了！";
            return;
        }

        await next();

        if (ctx.playerWon) {
            playerWinCount++
        }
    }
)

gameKoa.use(
    async function (ctx, next) {
        const qurey = ctx.query;
        const playerAction = qurey.action;
        if (!playerAction) {
            ctx.status = 400;
            return;
        }

        if (sameAction === 9) {
            ctx.status = 500;
            ctx.body = '我再也不和你玩了！'
        }

        if (playerAction === playerLastAction) {
            sameAction++;
            if (sameAction >= 3) {
                ctx.status = 400;
                ctx.body = '你作弊！我不玩了'
                sameAction = 9;
                return;
            }
        } else {
            sameAction = 0;
        }

        playerLastAction = playerAction;
        ctx.playerAction = playerAction;
        await next()
    }
)

gameKoa.use(
    async function (ctx, next) {
        const playerAction = ctx.playerAction;
        const gameResult = game(playerAction);
        await new Promise(resolve => {
            setTimeout(() => {
                ctx.status = 200;
                if (gameResult === 0) {
                    ctx.body = '平局！'
                } else if (gameResult === 1) {
                    ctx.playerWon = true;
                    ctx.body = "你赢了！"
                } else {
                    ctx.body = "你输了！"
                }
                resolve()
            }, 500)
        })
    }
)

app.use(
    mount('/game', gameKoa)
)

app.use(
    mount('/', function (ctx) {
        ctx.body = fs.readFileSync(__dirname + "/index.html", "utf-8")
    })
)

app.listen(3000)
