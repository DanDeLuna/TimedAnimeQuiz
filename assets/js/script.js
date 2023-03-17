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
var checkAnswer = document.getElementById("checkAnswer");

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
var correctAns = 0;
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
