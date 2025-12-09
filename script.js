// Example JS to load questions and handle form submission
const questions = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "Berlin", "Rome", "Madrid"],
        correctAnswer: "Paris"
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correctAnswer: "4"
    }
];

// Load questions dynamically into the page
function loadQuestions() {
    const container = document.getElementById('question-container');
    questions.forEach((q, index) => {
        let questionHTML = `<div class="question">
            <p>${q.question}</p>
            ${q.options.map((option, i) => `
                <label>
                    <input type="radio" name="q${index}" value="${option}">
                    ${option}
                </label><br>
            `).join('')}
        </div>`;
        container.innerHTML += questionHTML;
    });
}

// Handle form submission
document.getElementById("submit-btn").addEventListener("click", function() {
    const answers = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        answer1: getSelectedAnswer("question1"),
        answer2: getSelectedAnswer("question2"),
    };

    fetch("YOUR_GOOGLE_APPS_SCRIPT_URL", {  // Replace with the URL you copied from Apps Script
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams(answers)
    })
    .then(response => response.text())
    .then(result => alert("Exam Submitted Successfully!"))
    .catch(error => console.error("Error:", error));
});

// Function to get the selected answer for each question
function getSelectedAnswer(questionId) {
    const selected = document.querySelector(`input[name="${questionId}"]:checked`);
    return selected ? selected.value : null;
}

// Load questions when the page is ready
window.onload = loadQuestions;
