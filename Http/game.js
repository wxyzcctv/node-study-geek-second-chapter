module.exports = function (playerAction) {

    var random = Math.random() * 3;

    var computerAction;
    if (random < 1) {
        computerAction = "scissor"
    } else if (random > 2) {
        computerAction = "paper"
    } else {
        computerAction = "rock"
    }

    if (playerAction === computerAction) {
        return 0;
    } else {
        if (
            (playerAction === "scissor" && computerAction === "rock") ||
            (playerAction === "rock" && computerAction === "paper") ||
            (playerAction === "paper" && computerAction === "scissor")
        ) {
            return -1;
        } else {
            return 1;
        }
    }
}