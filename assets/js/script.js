//define questions
const questions = [
    {
        question: "Who is the main character in Cowboy Bebop ?",
        choices: ["a. Goku", "b. Monkey D. Luffy ", "c. Levi Ackerman", "d. Spike Spiegel"],
        answer: "d. Spike Spiegel"
    },
    { 
        question: "Who is the main character in Naruto ?",
        choices: ["a. Tanjiro", "b. Gon Freecss", "c. Naruto", "d. Edward Elric"],
        answer: "c. Naruto"
    },
    {
        question: "Who is the main character in Dragon Ball Z ?",
        choices: ["a. Levi Ackerman", "b. Goku", "c. Astro Boy", "d. Tanjiro"],
        answer: "b. Goku"
    },
    {
        question: "Who is the main character in Hunter x Hunter ?",
        choices: ["a. Astro Boy ", "b. Levi Ackerman", "c. Gon Freecss", "d. Jotaro Kujo"],
        answer: "c. Gon Freecss"
    },
    {
        question: "Who is the main character in Berserk ?",
        choices: ["a. Levi Ackerman", "b. Guts", "c. Jotaro Kujo", "d. Roronoa Zoro"],
        answer: "b. Guts"
    },
    {
        question: "Who is the main character in Demon Slayer?",
        choices: ["a. Edward Elric", "b. Levi Ackerman", "c. Tanjiro", "d. Astro Boy"],
        answer: "c. Tanjiro"
    },
    {
        question: "Who is the main character in Death Note ?",
        choices: ["a. Gon Freecss", "b. L", "c. Edward Elric", "d. Astro Boy"],
        answer: "b. L"
    },
    {
        question: "Who is the main character in Fullmetal Alchemist ?",
        choices: ["a. Edward Elric", "b. Tanjiro", "c. Astro Boy", "d. Jotaro Kujo"],
        answer: "a. Edward Elric"
    }
];

//Getting elements by ID
//Time elements and linking btns
var timer = document.getElementById("timer");
var timeLeft = document.getElementById("timeLeft");
var timesUp = document.getElementById("timesUp");

var startInfo = document.getElementById("startInfo");
var startQuizButton = document.getElementById("startQuizButton");

var quizDiv = document.getElementById("quizDiv");
var questionToAnswer = document.getElementById("questionToAnswer");
var btnA = document.getElementById("btnA");
var btnB = document.getElementById("btnB");
var btnC = document.getElementById("btnC");
var btnD = document.getElementById("btnD");
var checkAnswerr = document.getElementById("checkAnswer");

var summary = document.getElementById("summary");
var submitBtn = document.getElementById("submitBtn");
var initialInput = document.getElementById("initialInput");

var highScoreTrack = document.getElementById("highScoreTrack");
var scoreFinal = document.getElementById("scoreFinal");

var backBtn = document.getElementById("backBtn");
var clearBtn = document.getElementById("clearBtn"); 
var viewScore = document.getElementById("viewScore");
var listOfScore = document.getElementById("listOfScore");

// default variable
var correctAn = 0;
var questionNum = 0;
var scoreResult;
var questionIndex = 0;


//Timer
var totalTime = 161;
function newQuiz() {
    questionIndex = 0;
    totalTime = 160;
    timeLeft.textContent = totalTime;
    initialInput.textContent = "";

    startInfo.style.display = "none";
    quizDiv.style.display = "block";
    timer.style.display = "block";
    timesUp.style.display = "none";

    var startTimer = setInterval(function() {
        totalTime--;
        timeLeft.textContent = totalTime;
        if(totalTime <= 0) {
            clearInterval(startTimer);
            if (questionIndex < questions.length - 1) {
                gameOver();
            }
        }
    },1000);

    showQuiz();
};
// present  questions and answers
function showQuiz() {
    nextQuestion();
}

function nextQuestion() {
    questionTitle.textContent = questions[questionIndex].question;
    btnA.textContent = questions[questionIndex].choices[0];
    btnB.textContent = questions[questionIndex].choices[1];
    btnC.textContent = questions[questionIndex].choices[2];
    btnD.textContent = questions[questionIndex].choices[3];
}
function checkAnswerr(answer) {

    var lineBreak = document.getElementById("lineBreak");
    lineBreak.style.display = "block";
    checkAnswerr.style.display = "block";

    if (questions[questionIndex].answer === questions[questionIndex].choices[answer]) {
        // correct answer,plus 1
        correctAn++;

        checkAnswerr.textContent = "Correct!";
    } else {
        // wrong - 10 seconds
        totalTime -= 10;
        timeLeft.textContent = totalTime;
        checkAnswerr.textContent = "Wrong! The correct answer is: " + questions[questionIndex].answer;
    }

    questionIndex++;
    // go through the rest of the questions  
    if (questionIndex < questions.length) {
        nextQuestion();
    } else {
        // End game if no more questions 
        gameOver();
    }
}
function chooseA() { checkAnswerr(0); }

function chooseB() { checkAnswerr(1); }

function chooseC() { checkAnswerr(2); }

function chooseD() { checkAnswerr(3); }
function gameOver() {
    summary.style.display = "block";
    quizDiv.style.display = "none";
    startInfo.style.display = "none";
    timer.style.display = "none";
    timesUp.style.display = "block";

    // final score
    scoreFinal.textContent = correctAn;
}
function storeHighScores(event) {
    event.preventDefault();

    // No blank
    if (initialInput.value === "") {
        alert("Please enter your Name!");
        return;
    } 

    startInfo.style.display = "none";
    timer.style.display = "none";
    timesUp.style.display = "none";
    summary.style.display = "none";
    highScoreTrack.style.display = "block";   

    // save to local storage
    var saveHighScores = localStorage.getItem("high scores");
    var scoresArray;

    if (saveHighScores === null) {
        scoresArray = [];
    } else {
        scoresArray = JSON.parse(saveHighScores)
    }

    var userrScore = {
        initials: initialInput.value,
        score: scoreFinal.textContent
    };

    console.log(userrScore);
    scoresArray.push(userrScore);

    // store in local
    var scoresArrayString = JSON.stringify(scoresArray);
    window.localStorage.setItem("high scores", scoresArrayString);
    
    // highscores
    showHighScores();
}
// function to show high scores
var i = 0;
function showHighScores() {

    startInfo.style.display = "none";
    timer.style.display = "none";
    quizDiv.style.display = "none";
    timesUp.style.display = "none";
    summary.style.display = "none";
    highScoreTrack.style.display = "block";

    var savedHighScores = localStorage.getItem("high scores");

    // check if there is any in local storage
    if (savedHighScores === null) {
        return;
    }
    console.log(savedHighScores);

    var storeHighScores = JSON.parse(saveHighScores);

    for (; i < storeHighScores.length; i++) {
        var eachNewScore = document.createElement("p");
        eachNewScore.innerHTML = storeHighScores[i].initials + ": " + storeHighScores[i].score;
        listOfHighScores.appendChild(eachNewScore);
    }
}


startQuizButton.addEventListener("click", newQuiz);
btnA.addEventListener("click", chooseA);
btnB.addEventListener("click", chooseB);
btnC.addEventListener("click", chooseC);
btnD.addEventListener("click", chooseD);

submitBtn.addEventListener("click", function(event){ 
    storeHighScores(event);
});

viewScore.addEventListener("click", function(event) { 
    showHighScores(event);
});

backBtn.addEventListener("click", function() {
    startInfo.style.display = "block";
    highScoreTrack.style.display = "none";
});

clearBtn.addEventListener("click", function(){
    window.localStorage.removeItem("high scores");
    listOfScore.innerHTML = "High Scores Cleared!";
    listOfScore.setAttribute("style", "font-family: 'Archivo', sans-serif; font-style: italic;")
});