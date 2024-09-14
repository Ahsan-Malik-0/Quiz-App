const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Paris", correct: true }, // correct answer
            { text: "London", correct: false },
            { text: "Berlin", correct: false },
            { text: "Rome", correct: false }
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Mars", correct: true }, // correct answer
            { text: "Jupiter", correct: false },
            { text: "Saturn", correct: false }
        ]
    },
    {
        question: "Who wrote 'Hamlet'?",
        answers: [
            { text: "Charles Dickens", correct: false },
            { text: "J.K. Rowling", correct: false },
            { text: "William Shakespeare", correct: true }, // correct answer
            { text: "Mark Twain", correct: false }
        ]
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: [
            { text: "Atlantic Ocean", correct: false },
            { text: "Indian Ocean", correct: false },
            { text: "Southern Ocean", correct: false },
            { text: "Pacific Ocean", correct: true } // correct answer
        ]
    }
];

const questionElement = document.querySelector("#question");
const answerBox = document.querySelector("#answer-buttons");
const nextBtn = document.querySelector("#next-btn");

currentQuestionIndex = 0;
score = 0;

const startQuiz = () => {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

const showQuestion = () => {
    restartState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;
    
    currentQuestion.answers.forEach((answer) => {
        const answerBtn = document.createElement("button");
        answerBtn.innerHTML = answer.text;
        answerBtn.classList.add("btn");
        answerBox.append(answerBtn);
        
        if (answer.correct) {
            answerBtn.dataset.correct = answer.correct;
        }

        answerBtn.addEventListener("click", selectAnswer);
        
    })
}

const restartState = () => {
    nextBtn.style.display = "none";

    while (answerBox.firstChild) {
        answerBox.removeChild(answerBox.firstChild);
    }
}

const selectAnswer = (e) => {
    const selectedBn = e.target;
    const isTrue = selectedBn.dataset.correct === 'true';

    if (isTrue) {
        selectedBn.classList.add("correct");
        score++;
    }
    else {
        selectedBn.classList.add("incorrect");
    }
    
    Array.from(answerBox.children).forEach((button) => {
        if (button.dataset.correct) {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";

    nextBtn.addEventListener("click", () => {
        i += 1;
        startQuiz(i)
    })
}

const showScore = () => {
    restartState();
    questionElement.innerHTML = `Your Score is ${score} out of ${questions.length}`;
    nextBtn.innerHTML = "Try Again";
    nextBtn.style.display = "block";
}

const handleNextBtn = () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }
    else {
        showScore();
    }
}

nextBtn.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextBtn();
    }
    else {
        startQuiz();
    }
})

startQuiz();