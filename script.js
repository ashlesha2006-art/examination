// Example JavaScript to load questions and handle form submission
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
        answer1: getSelectedAnswer(0),  // for question 1
        answer2: getSelectedAnswer(1),  // for question 2
    };

    console.log(answers);  // Debugging: log the answers

    fetch("https://script.google.com/macros/s/AKfycbw-60s7QDfWo-IXTUAtg-yB-JwPmXHKK1g_yGm4xlTqg3PnvXdYuoaxtMCHzVZl-qc/exec", {
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams(answers)
})
.then(response => response.text())
.then(result => {
    console.log(result);  // Log the server's response
    alert("Exam Submitted Successfully!");
})
.catch(error => console.error("Error:", error));

});

// Function to get the selected answer for each question
function getSelectedAnswer(questionId) {
    const selected = document.querySelector(`input[name="q${questionId}"]:checked`);
    return selected ? selected.value : null;
}

// Load questions when the page is ready
window.onload = loadQuestions;
