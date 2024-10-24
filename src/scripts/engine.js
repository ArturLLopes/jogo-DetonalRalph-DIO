//alert("helow world");
//variaveis
const state = {
    //visiveis
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelectorAll(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives"),
        button: document.querySelector("#button"),
    },
    //valores nao visiveis
    values: {
        lives: 3,
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 20,
    },
    //açoes 
    actions: {
        timerId: null, //setInterval(randomSquare, state.values.gameVelocity=1000) podendo remover a function moveEnemy() e tirando do initialize
        countDownTimerId: setInterval(countDown, 1000),
    }
};
//contagem regressiva
function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;


    if (state.values.currentTime <= 0) {
        // clearInterval(state.actions.countDownTimerId);//limpar o timer
        // clearInterval(state.actions.timerId);
        state.values.lives--;
        state.view.lives.textContent = state.values.lives;
        state.values.currentTime = 20;
        if (state.values.lives <= 0) {
            playSoundOver();
            clearInterval(state.values.score);
            clearInterval(state.values.result);
            clearInterval(state.actions.countDownTimerId);//limpar o timer
            clearInterval(state.actions.timerId);
            alert("game over! O seus resultado foi: " + state.values.result);
        }
    }

}

//tocar som
function playSound() { //playSound(audioName) let audio = new Audio("./src/audios/${audioName}.m4a"); facilitaria na hora de procura a funcão
    let audio = new Audio("./src/audios/hit.m4a");
    audio.volume = 0.2;
    audio.play();
}
function playSoundOver() {
    let audio = new Audio("./src/audios/gameover.m4a");
    audio.play();
}


//limpar o tabuleiro
function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });
    //gerar um numero aleatorio
    let randamNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randamNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

//move o inimigo
function moveEnemy() {
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

//marcar ponto
function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound();//playSound("hit")                        
            }
        });
    });
}


//funcao para aumentar a velocidade
function increaseEnemySpeed(newVelocity) {
    if (newVelocity > 0) {
        state.values.gameVelocity = newVelocity;
        
        moveEnemy();
    }
}
setInterval(() => {
    increaseEnemySpeed(state.values.gameVelocity - 5);//aumenta a velocidade
}, 15000);

function initialize() {
    moveEnemy();
    addListenerHitBox();
}

initialize();
