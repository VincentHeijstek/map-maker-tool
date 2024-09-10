document.addEventListener('DOMContentLoaded', () => {
    const recordButton = document.getElementById('record');
    const submitTextButton = document.getElementById('submitText');
    const textInput = document.getElementById('textInput');
    const foodList = document.getElementById('food-list');
    const additionalQuestion = document.getElementById('additional-question');

    recordButton.addEventListener('click', () => {
        const text = textInput.value.trim(); // Haal de tekst op uit de tekstbox en trim eventuele witruimte
        if (text) {
            processInput(text);
        } else {
            console.log('Geen tekst ingevoerd om te verwerken.');
            // Hier kun je verdere acties toevoegen als er geen tekst is ingevoerd
        }
    });

    submitTextButton.addEventListener('click', () => {
        const text = textInput.value;
        processInput(text);
    });

    function processInput(input) {
        fetch('/api/process', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({input})
        })
        .then(response => response.json())
        .then(data => {
            console.log('Received data:', data); // Check what data you're receiving
            const listItem = document.createElement('li');
            listItem.textContent = `${data.amount} ${data.product}`;
            foodList.appendChild(listItem);

            if (data.additionalQuestion) {
                additionalQuestion.textContent = data.additionalQuestion;
            } else {
                additionalQuestion.textContent = '';
            }
        })
        .catch(error => console.error('Error:', error));
    }
});
