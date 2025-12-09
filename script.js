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
    let answers = {};
    questions.forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name="q${index}"]:checked`);
        if (selectedOption) {
            answers[`question${index + 1}`] = selectedOption.value;
        }
    });

    console.log('User Answers:', answers);
    alert('Your exam has been submitted!');
});

// Load questions when the page is ready
window.onload = loadQuestions;
