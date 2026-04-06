let quizData = [
    {
        question: "2 + 2 = ?",
        options: ["3", "4", "5"],
        answer: 1
    }
];

let qIndex = 0;

function loadQuestion() {
    document.getElementById("question").innerText =
        quizData[qIndex].question;
}

function answer(option) {
    if(option === quizData[qIndex].answer) {
        alert("Correct!");
    } else {
        alert("Wrong!");
    }
}

loadQuestion();
