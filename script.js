// Function to generate CSV from an array of data
function generateCSV(data) {
    const header = ['Name', 'Email', 'Answer 1', 'Answer 2'];
    const rows = data.map(row => [row.name, row.email, row.answer1, row.answer2]);

    const csvContent = [
        header.join(','), // header
        ...rows.map(row => row.join(',')) // data rows
    ].join('\n');
    return csvContent;
}

// Example form submission to generate CSV
document.getElementById("submit-btn").addEventListener("click", function() {
    const answers = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        answer1: getSelectedAnswer(0),
        answer2: getSelectedAnswer(1)
    };

    // Create the CSV content
    const csvContent = generateCSV([answers]);

    // Push this CSV to GitHub (next step)
    pushToGitHub(csvContent);
});

// Function to get the selected answer for each question
function getSelectedAnswer(questionId) {
    const selected = document.querySelector(`input[name="q${questionId}"]:checked`);
    return selected ? selected.value : null;
}

// Push the generated CSV to GitHub repository using GitHub API
function pushToGitHub(csvContent) {
    const token = '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'; // GitHub Personal Access Token
    const repoOwner = 'aslesha2006-art'; // Replace with your GitHub username
    const repoName = 'examination'; // Replace with your repository name
    const filePath = 'exam_results.csv'; // Path to the file in the repository

    const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;

    // Fetch the file's current content from GitHub to check if it exists
    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json'
        }
    })
    .then(response => response.json())
    .then(data => {
        let sha = data.sha || ''; // The sha of the existing file (if it exists)
        // Create or update the file
        return fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json'
            },
            body: JSON.stringify({
                message: 'Update exam results',
                content: btoa(csvContent), // Base64-encoded CSV content
                sha: sha // If file exists, send its sha to update it
            })
        });
    })
    .then(response => response.json())
    .then(data => {
        if (data.content) {
            alert("Exam results saved successfully to GitHub!");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("There was an error saving the data.");
    });
}
