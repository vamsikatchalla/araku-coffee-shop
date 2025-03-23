document.addEventListener("DOMContentLoaded", () => {
  loadChatHistory();
});

// Function to send messages
function sendMessage() {
  let userInput = document.getElementById("userInput").value;
  if (userInput.trim() === "") return;

  appendMessage("You", userInput);
  document.getElementById("userInput").value = "";

  // Simulating AI response
  setTimeout(() => {
      appendMessage("ChatGPT", "This is a sample AI response.");
  }, 1000);
}

// Function to append messages to the chat
function appendMessage(sender, message) {
  let chatBox = document.getElementById("chatBox");
  let messageElement = document.createElement("p");
  messageElement.innerHTML = `<b>${sender}:</b> ${message}`;
  chatBox.appendChild(messageElement);

  chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll
  saveChatHistory();
}

// Function for Voice Input
function startVoiceInput() {
  let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";

  recognition.onresult = (event) => {
      let voiceText = event.results[0][0].transcript;
      document.getElementById("userInput").value = voiceText;
  };

  recognition.start();
}

// Function to handle file uploads
function uploadFile() {
  let fileInput = document.getElementById("fileUpload");
  let file = fileInput.files[0];
  if (!file) return;

  appendMessage("System", `Uploaded file: ${file.name}`);
}

// Function to search messages
function searchMessages() {
  let searchInput = document.getElementById("searchInput").value.toLowerCase();
  let messages = document.querySelectorAll(".chat-box p");

  messages.forEach((msg) => {
      if (msg.innerText.toLowerCase().includes(searchInput)) {
          msg.style.display = "block";
      } else {
          msg.style.display = "none";
      }
  });
}

// Function to save chat history
function saveChatHistory() {
  let chatBox = document.getElementById("chatBox").innerHTML;
  localStorage.setItem("chatHistory", chatBox);
}

// Function to load chat history
function loadChatHistory() {
  let chatHistory = localStorage.getItem("chatHistory");
  if (chatHistory) {
      document.getElementById("chatBox").innerHTML = chatHistory;
  }
}





async function sendMessage() {
  const input = document.getElementById('userInput').value;
  const responseDiv = document.getElementById('response');
  if (!input) {
    responseDiv.innerHTML = 'Please enter a message.';
    return;
  }
  responseDiv.innerHTML = 'Loading...';
  try {
    const response = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: 'Bearer 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',
          'HTTP-Referer': 'https://www.webstylepress.com',
          'X-Title': 'WebStylePress',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'deepseek/deepseek-r1:free',
          messages: [{ role: 'user', content: input }],
        }),
      },
    );
    const data = await response.json();
    console.log(data);
    const markdownText =
      data.choices?.[0]?.message?.content || 'No response received.';
    responseDiv.innerHTML = marked.parse(markdownText);
  } catch (error) {
    responseDiv.innerHTML = 'Error: ' + error.message;
  }
}