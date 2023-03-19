
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
// references to elements
var timer = document.getElementById("timer");
var timeLeft = document.getElementById("timeLeft");
var timesUp = document.getElementById("timesUp");

var startDiv = document.getElementById("start");
var startQuizBtn = document.getElementById("start-quiz-button");

var questionDiv = document.getElementById("questionDiv");
var questionTitle = document.getElementById("questionTitle");
var choiceA = document.getElementById("btn0");
var choiceB = document.getElementById("btn1");
var choiceC = document.getElementById("btn2");
var choiceD = document.getElementById("btn3");
var answerCheck = document.getElementById("answerCheck");

var summary = document.getElementById("summary");
var submitInitialBtn = document.getElementById("submitInitialBtn");
var initialInput = document.getElementById("initialInput");

var highScoreSection = document.getElementById("highScoreSection");
var finalScore = document.getElementById("finalScore");

var goBackBtn = document.getElementById("goBackBtn");
var clearHighScoreBtn = document.getElementById("clearHighScoreBtn"); 
var viewHighScore = document.getElementById("viewHighScore");
var listOfHighScores = document.getElementById("listOfHighScores");

//  vars for quiz logic
var correctAns = 0;
var questionNum = 0;
var scoreResult;
var questionIndex = 0;

// start button to start timer 
var totalTime = 151;
function newQuiz() {
    questionIndex = 0;
    totalTime = 150;
    timeLeft.textContent = totalTime;
    initialInput.textContent = "";

    startDiv.style.display = "none";
    questionDiv.style.display = "block";
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

// questions with choices
function showQuiz() {
    nextQuestion();
}

function nextQuestion() {
    questionTitle.textContent = questions[questionIndex].question;
    choiceA.textContent = questions[questionIndex].choices[0];
    choiceB.textContent = questions[questionIndex].choices[1];
    choiceC.textContent = questions[questionIndex].choices[2];
    choiceD.textContent = questions[questionIndex].choices[3];
}

// show correct or wrong
function checkAnswer(answer) {

    var lineBreak = document.getElementById("lineBreak");
    lineBreak.style.display = "block";
    answerCheck.style.display = "block";

    if (questions[questionIndex].answer === questions[questionIndex].choices[answer]) {
        // correct add 1 score to final score
        correctAns++;
        answerCheck.textContent = "Correct!";
    } else {
        // wrong take 10 second off
        totalTime -= 10;
        timeLeft.textContent = totalTime;
        answerCheck.textContent = "Wrong! The correct answer is: " + questions[questionIndex].answer;
    }

    questionIndex++;
    // repeat until quiz is over
    if (questionIndex < questions.length) {
        nextQuestion();
    } else {
        // if done end game 
        gameOver();
    }
}

function chooseA() { checkAnswer(0); }

function chooseB() { checkAnswer(1); }

function chooseC() { checkAnswer(2); }

function chooseD() { checkAnswer(3); }

//game over function
function gameOver() {
    summary.style.display = "block";
    questionDiv.style.display = "none";
    startDiv.style.display = "none";
    timer.style.display = "none";
    timesUp.style.display = "block";
    finalScore.textContent = correctAns;
}
// enter  name and to save highscore 
function storeHighScores(event) {
    event.preventDefault();

    // Name can not be blank
    if (initialInput.value === "") {
        alert("Please enter your initials!");
        return;
    } 

    startDiv.style.display = "none";
    timer.style.display = "none";
    timesUp.style.display = "none";
    summary.style.display = "none";
    highScoreSection.style.display = "block";   
    // save scores
    var savedHighScores = localStorage.getItem("high scores");
    var scoresArray;
    if (savedHighScores === null) {
        scoresArray = [];
    } else {
        scoresArray = JSON.parse(savedHighScores)
    }
    var userScore = {
        initials: initialInput.value,
        score: finalScore.textContent
    };
    console.log(userScore);
    scoresArray.push(userScore);
    var scoresArrayString = JSON.stringify(scoresArray);
    window.localStorage.setItem("high scores", scoresArrayString);
    
    // show scores
    showHighScores();
}

// function to show scores
var i = 0;
function showHighScores() {

    startDiv.style.display = "none";
    timer.style.display = "none";
    questionDiv.style.display = "none";
    timesUp.style.display = "none";
    summary.style.display = "none";
    highScoreSection.style.display = "block";

    var savedHighScores = localStorage.getItem("high scores");

    if (savedHighScores === null) {
        return;
    }
    console.log(savedHighScores);

    var storedHighScores = JSON.parse(savedHighScores);

    for (; i < storedHighScores.length; i++) {
        var eachNewHighScore = document.createElement("p");
        eachNewHighScore.innerHTML = storedHighScores[i].initials + ": " + storedHighScores[i].score;
        listOfHighScores.appendChild(eachNewHighScore);
    }
}

// ADD EVENT LISTENERS for buttons
startQuizBtn.addEventListener("click",newQuiz);
choiceA.addEventListener("click", chooseA);
choiceB.addEventListener("click", chooseB);
choiceC.addEventListener("click", chooseC);
choiceD.addEventListener("click", chooseD);

submitInitialBtn.addEventListener("click", function(event){ 
    storeHighScores(event);
});

viewHighScore.addEventListener("click", function(event) { 
    showHighScores(event);
});

goBackBtn.addEventListener("click", function() {
    startDiv.style.display = "block";
    highScoreSection.style.display = "none";
});

clearHighScoreBtn.addEventListener("click", function(){
    window.localStorage.removeItem("high scores");
    listOfHighScores.innerHTML = "High Scores Cleared!";
    listOfHighScores.setAttribute("style", "font-family: 'Archivo', sans-serif; font-style: italic;")
});