const apiKey = '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'; // Replace with your API key

async function summarizeText(text) {
    const response = await fetch('https://api.example.com/summarize', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({ text })
    });
    const data = await response.json();
    return data.summary;
}

async function extractTextFromImage(imageFile) {
    const formData = new FormData();
    formData.append('file', imageFile);

    const response = await fetch('https://api.example.com/ocr', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${apiKey}` },
        body: formData
    });
    const data = await response.json();
    return data.text;
}

document.getElementById('summarizeBtn').addEventListener('click', async () => {
    const inputText = document.getElementById('textInput').value;
    const imageFile = document.getElementById('imageInput').files[0];
    let extractedText = inputText;

    if (imageFile) {
        extractedText = await extractTextFromImage(imageFile);
    }

    if (extractedText) {
        const summary = await summarizeText(extractedText);
        document.getElementById('summaryOutput').innerText = summary;
    } else {
        document.getElementById('summaryOutput').innerText = 'No text found to summarize.';
    }
});
