const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

function addMessage(message, isUser = true, messageId = null) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    if (messageId) messageDiv.id = messageId;
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function generateId() {
    return 'msg-' + Math.random().toString(36).substr(2, 9);
}

async function getAIResponse(prompt) {
    try {
        const response = await fetch('https://chatapi-blush.vercel.app/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: prompt })
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error('Error:', error);
        return `Error: ${error.message}`;
    }
}

sendBtn.addEventListener('click', async () => {
    const message = userInput.value.trim();
    if (!message) return;

    addMessage(message, true);
    userInput.value = '';

    const loadingId = generateId();
    addMessage('Waiting for response...', false, loadingId);

    const aiResponse = await getAIResponse(message);

    const loadingMsg = document.getElementById(loadingId);
    if (loadingMsg) {
        loadingMsg.textContent = aiResponse;
    }
});

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendBtn.click();
    }
});
