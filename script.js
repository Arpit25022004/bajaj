document.getElementById('jsonForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const jsonInput = document.getElementById('jsonInput').value;
    const errorElement = document.getElementById('error');
    
    // Validate JSON
    let jsonData;
    try {
        jsonData = JSON.parse(jsonInput);
        errorElement.textContent = '';
        // Call the REST API with the JSON data
        callApi(jsonData);
    } catch (e) {
        errorElement.textContent = 'Invalid JSON format';
    }
});

function callApi(data) {
    fetch('http://localhost:3000/api/process', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        // Show the dropdown and handle the response
        document.getElementById('dropdownContainer').classList.remove('hidden');
        handleDropdownSelection(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function handleDropdownSelection(apiResponse) {
    document.getElementById('renderButton').addEventListener('click', function() {
        const selectedOptions = Array.from(document.getElementById('responseOptions').selectedOptions).map(option => option.value);
        const responseOutput = document.getElementById('responseOutput');
        let responseContent = {};

        // Extract data based on selected options
        if (selectedOptions.includes('alphabets')) {
            responseContent.alphabets = apiResponse.alphabets;
        }
        if (selectedOptions.includes('numbers')) {
            responseContent.numbers = apiResponse.numbers;
        }
        if (selectedOptions.includes('highestAlphabet')) {
            responseContent.highestAlphabet = apiResponse.highest_alphabet;
        }

        // Display the filtered response
        responseOutput.textContent = JSON.stringify(responseContent, null, 2);
        document.getElementById('responseContainer').classList.remove('hidden');
    });
}
