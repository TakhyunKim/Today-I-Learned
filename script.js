// 컴퓨터 오브젝트
var computer = {
    score: 0,
    percent2: 0.5,
    percent3: 0.33
};
// 유저 오브젝트
var user = {
    score: 0,
    percent2: 0.5,
    percent3: 0.33
};
// 게임 오브젝트
var game = {
    isComputerTurn: true,
    shotsLeft: 15
};


function showText(s) {
    var textElem = document.getElementById("text");
    textElem.innerHTML = s;
}

function updateComputerScore (score) {
    computer.score += score;
    var comScoreElem = document.getElementById("computer_score");
    comScoreElem.innerHTML = computer.score;
}

function updateUserScore (score) {
    user.score += score;
    var userScoreElem = document.getElementById("user_score");
    userScoreElem.innerHTML = user.score;
}

function disableComputerButtons (flag) {
    var computerButtons = document.getElementsByClassName("btn_computer");
    var i;
    for (i = 0; i < computerButtons.length; i++) {
        computerButtons[i].disabled = flag;
    }
}

function disableUserButtons (flag) {
    var UserButtons = document.getElementsByClassName("btn_user");
    var i;
    for (i = 0; i < UserButtons.length; i++) {
        UserButtons[i].disabled = flag;
    }
}

function updateAI () { // 확률 조정 함수
    var diff = user.score - computer.score;

    if (diff >= 10) {
        computer.percent2 = 0.7;
        computer.percent3 = 0.43;
    } else if (diff >= 6) {
        computer.percent2 = 0.6;
        computer.percent3 = 0.38;
    } else if (diff <= -10) {
        computer.percent2 = 0.3;
        computer.percent3 = 0.23;
    } else if (diff <= -6) {
        computer.percent2 = 0.4;
        computer.percent3 = 0.28;
    }
}

function onComputerShoot () {
    if (!game.isComputerTurn) return;

    updateAI();

    var shootType = Math.random() < 0.5 ? 2 : 3;

    if (Math.random() < computer["percent" + shootType]) {
        showText("컴퓨터가" + shootType + "점 슛을 성공하였습니다!");
        updateComputerScore(shootType);
    } else {
        showText("컴퓨터가" + shootType + "점 슛을 실패하였습니다");
    }

    game.isComputerTurn = false;

    disableComputerButtons(true);
    disableUserButtons(false);
}

function onUserShoot (shootType) {
    if (game.isComputerTurn) return;


    if (Math.random() < user["percent" + shootType]) {
        showText(shootType + "점 슛을 성공하였습니다!");
        updateUserScore(shootType);
    } else {
        showText(shootType + "점 슛을 실패하였습니다");
    }

    game.isComputerTurn = true;

    disableComputerButtons(false);
    disableUserButtons(true);

    game.shotsLeft--;

    var shotsLeftElem = document.getElementById("shots_left");
    shotsLeftElem.innerHTML = game.shotsLeft;

        if (game.shotsLeft === 0) {
        if (user.score > computer.score) showText("승리하였습니다!");
        else if (user.score < computer.score) showText("패배하였습니다");
        else showText("비기셨습니다");
        disableComputerButtons(true);
        disableUserButtons(true);
    }
}