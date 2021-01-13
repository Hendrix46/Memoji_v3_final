let cardsFront = document.querySelectorAll(".memoji__card-front");
let cardsBack = document.querySelectorAll(".memoji__card-back");
let cardsCollection = shuffle([
    "🐰",
    "🐰",
    " 🐙",
    " 🐙",
    " 🐮 ",
    " 🐮 ",
    " 🐷",
    " 🐷",
    " 🦀",
    " 🦀",
    " 🐯",
    " 🐯"
]);
let match = [];
let pairs = 0;
let isTimer = true;

cardsFront.forEach(card => card.addEventListener("click", openCard));

function openCard(card) {
    if (isTimer) {
        isTimer = false;
        countdown();
    }

    if (match.length === 2) {
        match.forEach(elem => {
            if (elem.classList[1] === "mismatch") {
                elem.parentElement.classList.remove("open");
                elem.classList.remove("mismatch");
            }
        });
        match = [];
    }

    if (
        card.target.parentNode.classList.contains("open") === false &&
        card.target.previousElementSibling.classList[1] !== "match"
    ) {
        match.push(card.target.previousElementSibling);
    }

    card.target.parentNode.classList.add("open");

    if (match.length === 2) {
        if (match[0].innerHTML === match[1].innerHTML) {
            match.forEach(elem => elem.classList.add("match"));
            pairs += 2;
            match = [];
        } else {
            match.forEach(elem => elem.classList.add("mismatch"));
        }
    }

    if (pairs == 12) {
        stopTimer();
        document.querySelector(".memoji__popup").style.display = "block";
        addText("Win!");
        document.querySelector(".popup__btn").innerHTML = "Play again!";
    }
}

function shuffle(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * 12);
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }

    cardsBack.forEach((emoji, i) => {
        emoji.innerText = cards[i];
    });
    return cards;
}

let minutes = 1;
let seconds = "00";
let time;

function timerDisplay() {
    document.querySelector(".memoji__timer-inner").innerHTML =
        minutes + ":" + seconds;
}

function countdown() {
    timerDisplay();
    if (seconds == 0 && minutes == "00") {
        document.querySelector(".memoji__popup").style.display = "block";
        addText("Loose!");

        stopTimer();
    } else if (seconds == "00") {
        minutes = "00";
        seconds = 60;
        seconds--;
        time = setTimeout("countdown()", 1000);
    } else {
        +seconds--;
        if (seconds >= 0 && seconds < 10) {
            seconds = "0" + seconds;
        }
        time = setTimeout("countdown()", 1000);
    }
}

function stopTimer() {
    clearTimeout(time);
}

function resetTimer() {
    stopTimer();
    minutes = 1;
    seconds = "00";
    timerDisplay();
}

function restart() {
    cardsFront.forEach(card => card.addEventListener("click", openCard));
    document.querySelector(".memoji__popup").style.display = "none";
    pairs = 0;

    cardsBack.forEach(card => {
        if (card.parentNode.classList.contains("open")) {
            card.parentNode.classList.remove("open");
        }
        if (card.classList.contains("match")) {
            card.classList.remove("match");
        }
        if (card.classList.contains("mismatch")) {
            card.classList.remove("mismatch");
        }
    });
    shuffle(cardsCollection);
    resetTimer();
    isTimer = true;
}

function addText(word) {
    removeSpan();
    [...word].forEach(letter => {
        let span = document.createElement("span");

        span.innerHTML = letter;

        document.querySelector(".popup__result-inner").append(span);
    });
}

function removeSpan() {
    let findElements = document.querySelector(".popup__result-inner");
    findElements.innerHTML = "";
}
