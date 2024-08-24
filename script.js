const form = document.querySelector('form');
const resultDiv = document.querySelector('.result');
form.addEventListener('submit', (e) => {
    /* example of how to prevent the default form 
    submission behavior using JavaScript. */
    e.preventDefault();
    resultDiv.innerHTML = "Fetching Data. . . . ";
    getWordInfo(form.elements[0].value);

});

const getWordInfo = async (word) => {
    try {
     
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if (!response.ok) {
            throw new Error('Word not found');
        }
        const data = await response.json();

        // Check if antonyms exists and convert array to a string
        const antonyms = data[0].meanings[0].antonyms.length > 0
            ? data[0].meanings[0].antonyms.join(', ')
            : 'No antonyms available';

        resultDiv.innerHTML = `
            <h2><strong>Word:</strong> ${data[0].word}</h2>
            <p><strong>Part of Speech:</strong> ${data[0].meanings[0].partOfSpeech}</p>
            <p><strong>Meaning:</strong> ${data[0].meanings[0].definitions[0].definition}</p>
            <p><strong>Example:</strong> ${data[0].meanings[0].definitions[0].example || 'No example available'}</p>
               <p><strong>Antonyms:</strong> ${antonyms}</p>
             
             <div><a href="${data[0].sourceUrls}" target="_blank">Read More</a> </div>
         
        `;

        console.log(data);
    }
        
        
    catch (error) {
        resultDiv.innerHTML = `<p>Sorry the word could not be found</p>`;
        console.error(error);
    }

   
}
