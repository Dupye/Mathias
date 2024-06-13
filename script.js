document.addEventListener("DOMContentLoaded", () => {
    const authForm = document.getElementById('authForm');
    const messageForm = document.getElementById('messageForm');
    const sendMessageButton = document.getElementById('sendMessage');
    const notification = document.getElementById('notification');

    let users = [];

    authForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const user = users.find(u => u.username === username);
        if (user) {
            if (user.password === password) {
                showNotification('Login successful!');
                authForm.style.display = 'none';
                messageForm.style.display = 'block';
            } else {
                showNotification('Invalid password', 'error');
            }
        } else {
            users.push({ username, password });
            showNotification('User registered successfully!');
            authForm.style.display = 'none';
            messageForm.style.display = 'block';
        }
        authForm.reset();
    });

    sendMessageButton.addEventListener('click', async () => {
        const message = document.getElementById('message').value;
        if (message) {
            await sendToDiscord(message);
            showNotification('Message sent to Discord!');
            messageForm.reset();
        } else {
            showNotification('Message cannot be empty', 'error');
        }
    });

    function showNotification(message, type = 'success') {
        notification.textContent = message;
        notification.style.backgroundColor = type === 'success' ? '#28a745' : '#dc3545';
        notification.style.display = 'block';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }

    async function sendToDiscord(message) {
        const webhookUrl = 'https://discord.com/api/webhooks/1250587186781491261/hd6TPmVM1wQyfnogsEWgKCcizqDI61Oqn9wzMOp4zSwHibwISEMYaVUuEoobLnkZwqN8'; // Replace with your Discord webhook URL
        await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content: message + '\n- Mensagem enviada através do site!' })
        });
    }
});
