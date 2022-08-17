const startBtn = document.querySelector('.start'),
            screens = document.querySelectorAll('.screen'),
            timeList = document.querySelector('.time-list'),
            board = document.querySelector('#board'),
            timeEl = document.querySelector('#time'),
            scoreEl = document.querySelector('#score'),
            colors = ['turquoise', 'springgreen', 'yellow', 'tomato', 'orange', 'salmon', 'darkorchid', 'darkslategray'];


let time = 0,
      score = 0;

startBtn.addEventListener('click', function(e) {
    screens[0].classList.add('up');
});

timeList.addEventListener('click', function(e) {
    if(e.target.classList.contains('time-btn')) {
        time = +e.target.getAttribute('data-time');
        screens[1].classList.add('up');
        startGame();
    }
});

board.addEventListener('click', function(e) {
    if(e.target.classList.contains('circle')) {
        score++;
        scoreEl.innerHTML = score;
        e.target.remove();
        drawCircle();
    }
});

function startGame() {
    setInterval(decreaseTime, 1000);
    drawCircle();
    setTime(time);
}

function setTime(time) {
    if(time < 10) {
        timeEl.innerHTML = `00:0${time}`;
    } else {
        timeEl.innerHTML = `00:${time}`;
    }
}

function decreaseTime() {
    if(time === 0) {
        endGame();
    } else {
        let current = time--;
        setTime(current);
    }
}

function drawCircle() {
    const circle = document.createElement('div'),
                size = getRandomNumber(5, 60),
                color = getRandomColor(colors);
    
    const {width, height} = board.getBoundingClientRect();
    const y = getRandomNumber(10, height - size),
                x = getRandomNumber(10, width - size);

    circle.classList.add('circle');

    circle.style.cssText = `
    height: ${size}px;
    width: ${size}px;
    background-color: ${color};
    left: ${x}px;
    top: ${y}px;
    box-shadow: 0 0 2px ${color}, 0 0 10px ${color};
    `;

    board.append(circle);
}

function getRandomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function endGame() {
    time = 0;
    board.innerHTML = `<h1>Game over</h1>
    <h2>Your score: ${score}</h2>`;

    timeEl.parentNode.classList.add('hide');
    scoreEl.parentNode.classList.add('hide');
}