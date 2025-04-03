// DOM Elements
const chatbox = document.getElementById('chatbox');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');
const photoUpload = document.getElementById('photoUpload');
const avatarImage = document.getElementById('avatarImage');
const lightModeBtn = document.getElementById('lightMode');
const darkModeBtn = document.getElementById('darkMode');

// Pet Avatar Reactions
const petReactions = {
  happy: 'dog-happy.png',
  confused: 'dog-confused.png',
  thinking: 'dog-thinking.gif'
};

// Themes
const themes = {
  light: {
    bg: '#f0f8ff',
    container: 'white'
  },
  dark: {
    bg: '#2c3e50',
    container: '#34495e'
  }
};

// Set initial theme
let currentTheme = 'light';

// Theme Toggle
lightModeBtn.addEventListener('click', () => setTheme('light'));
darkModeBtn.addEventListener('click', () => setTheme('dark'));

function setTheme(theme) {
  currentTheme = theme;
  document.body.style.backgroundColor = themes[theme].bg;
  document.querySelector('.chat-container').style.backgroundColor = themes[theme].container;
}

// Photo Upload
photoUpload.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      addMessage("You uploaded a photo!", 'user');
      setTimeout(() => {
        setPetReaction('happy');
        addMessage("What a cute pet! Here's a tip: Use treats for positive reinforcement.", 'bot');
      }, 1000);
    };
    reader.readAsDataURL(file);
  }
});

// Send Message
sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
  const message = userInput.value.trim();
  if (message === '') return;

  addMessage(message, 'user');
  userInput.value = '';

  // Simulate bot thinking
  setPetReaction('thinking');
  setTimeout(() => {
    const response = getBotResponse(message);
    addMessage(response, 'bot');
    setPetReaction('happy');
  }, 1500);
}

// Bot Responses
function getBotResponse(message) {
  const lowerMsg = message.toLowerCase();
  if (lowerMsg.includes('sit')) return "To teach 'sit', hold a treat above their nose and move it back over their head...";
  if (lowerMsg.includes('stay')) return "For 'stay', start with short durations and gradually increase distance...";
  return "I can help with commands like 'sit', 'stay', and 'potty training'!";
}

// Helper Functions
function addMessage(text, sender) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', `${sender}-message`);
  messageDiv.textContent = text;
  chatbox.appendChild(messageDiv);
  chatbox.scrollTop = chatbox.scrollHeight;
}

function setPetReaction(reaction) {
  avatarImage.src = petReactions[reaction];
}