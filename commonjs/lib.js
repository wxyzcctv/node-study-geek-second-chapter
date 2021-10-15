module.exports = function (playerAction) {

    var random = Math.random() * 3;

    var computerAction;
    if (random < 1) {
        computerAction = "剪刀"
    } else if (random > 2) {
        computerAction = "布"
    } else {
        computerAction = "石头"
    }

    if (playerAction === computerAction) {
        console.log('平局');
        return 0;
    } else {
        if (
            (playerAction === "剪刀" && computerAction === "石头") ||
            (playerAction === "石头" && computerAction === "布") ||
            (playerAction === "布" && computerAction === "剪刀")
        ) {
            console.log("你输了");
            return 1;
        } else {
            console.log("你赢了");
            return -1;
        }
    }
}