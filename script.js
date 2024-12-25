const questions = [
    {
        question: "What technology is used to make telephone calls over the Internet possible?",
        answers: [
            { text: "Bluetooth", correct: false},
            { text: "Ethernet", correct: false},
            { text: "VoIP", correct: true},
            { text: "NFC", correct: false},
        ]
    },

    {
        question: "Which is Fastest Train in the India?",
        answers:[
            { text: "Shatabdi Express", correct: false},
            { text: "Rajdhani Express", correct: false},
            { text: "Tejas Express", correct: false},
            { text: "Vande Bharat Express", correct: true},
        ]

    },

    {
        question: "Which is the largest desert in the world?",
        answers:[
            { text: "Kalahari", correct: false},
            { text: "Thar", correct: false},
            { text: "Sahara", correct: false},
            { text: "Antarctica", correct: true},
        ]
    },

    {
        question: "Which is Smallest Continent in the world?",
        answers:[
            { text: "Asia", correct: false},
            { text: "Africa", correct: false},
            { text: "Australia", correct: true},
            { text: "South America", correct: false},
        ]
    },

    {
        question: "Who is the father of Computer?",
        answers:[
            { text: "James Gosling", correct: false},
            { text: "Dennis Ritchie", correct: false},
            { text: "Charles Babbage", correct: true},
            { text: "Bajarne Stroustrup", correct: false},
        ]
    }
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." +currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }

});
startQuiz();

