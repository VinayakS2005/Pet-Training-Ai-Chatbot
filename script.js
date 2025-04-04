// DOM Elements
const elements = {
  chatContainer: document.getElementById('chatContainer'),
  userInput: document.getElementById('userInput'),
  sendBtn: document.getElementById('sendBtn'),
  photoUpload: document.getElementById('photoUpload'),
  petAvatar: document.getElementById('petAvatar'),
  petStatus: document.getElementById('petStatus'),
  themeToggle: document.getElementById('themeToggle')
};

// Pet Config
const petConfig = {
  reactions: {
    neutral: { img: 'assets/dog-neutral.png', text: 'Ready to help!' },
    happy: { img: 'assets/dog-happy.png', text: 'Good job! 🎉' },
    thinking: { img: 'assets/dog-thinking.gif', text: 'Let me think...' },
    confused: { img: 'assets/dog-confused.png', text: 'I didn\'t understand that' }
  },
  sounds: {
    bark: new Audio('assets/bark.mp3')
  }
};

// Knowledge Base
const knowledgeBase = {
  sit: "To teach <strong>sit</strong>: 1) Hold a treat near their nose. 2) Slowly move it up and back over their head. 3) As their bottom touches the ground, say \"Sit!\" and reward.",
  stay: "For <strong>stay</strong>: 1) Have your dog sit. 2) Show your palm and say \"Stay\". 3) Take 1 step back, then return and reward. Gradually increase distance.",
  potty: "Potty training: 1) Establish a routine. 2) Take them out after meals/waking. 3) Praise immediately when they go outside. 4) Clean accidents with enzyme cleaner.",
  photo: "What a cute pet! For personalized tips: 1) Use high-value treats. 2) Keep sessions short (5-10 mins). 3) End on a positive note."
};

// Initialize
function init() {
  // Event Listeners
  elements.sendBtn.addEventListener('click', sendMessage);
  elements.userInput.addEventListener('keypress', (e) => e.key === 'Enter' && sendMessage());
  elements.photoUpload.addEventListener('change', handlePhotoUpload);
  elements.themeToggle.addEventListener('click', toggleTheme);
  
  // Quick Actions
  document.querySelectorAll('.quick-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      elements.userInput.value = `How to teach ${btn.dataset.cmd}?`;
      sendMessage();
    });
  });

  // Set initial pet state
  setPetReaction('neutral');
}

// Core Functions
function sendMessage() {
  const message = elements.userInput.value.trim();
  if (!message) return;

  addMessage(message, 'user');
  elements.userInput.value = '';
  setPetReaction('thinking');

  // Simulate AI processing
  setTimeout(() => {
    const response = generateResponse(message);
    addMessage(response, 'bot');
    setPetReaction('happy');
    petConfig.sounds.bark.play().catch(e => console.log("Audio blocked:", e));
  }, 1000 + Math.random() * 2000); // Random delay for realism
}

function generateResponse(message) {
  const lowerMsg = message.toLowerCase();
  if (lowerMsg.includes('sit')) return knowledgeBase.sit;
  if (lowerMsg.includes('stay')) return knowledgeBase.stay;
  if (lowerMsg.includes('potty') || lowerMsg.includes('toilet')) return knowledgeBase.potty;
  return "I can help with: <strong>sit</strong>, <strong>stay</strong>, and <strong>potty training</strong>. Be specific with your question!";
}

function handlePhotoUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    addMessage("[Uploaded Photo]", 'user');
    setTimeout(() => {
      addMessage(knowledgeBase.photo, 'bot');
      setPetReaction('happy');
    }, 1500);
  };
  reader.readAsDataURL(file);
  e.target.value = ''; // Reset input
}

// UI Helpers
function addMessage(text, sender) {
  const msgDiv = document.createElement('div');
  msgDiv.className = `message ${sender}-message`;
  msgDiv.innerHTML = text;
  elements.chatContainer.appendChild(msgDiv);
  elements.chatContainer.scrollTop = elements.chatContainer.scrollHeight;
}

function setPetReaction(mood) {
  const reaction = petConfig.reactions[mood] || petConfig.reactions.neutral;
  elements.petAvatar.src = reaction.img;
  elements.petStatus.textContent = reaction.text;
  
  // Special animations
  if (mood === 'happy') {
    elements.petAvatar.classList.add('bounce');
    setTimeout(() => elements.petAvatar.classList.remove('bounce'), 2000);
  }
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', newTheme);
  elements.themeToggle.innerHTML = newTheme === 'light' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
}

// Initialize the app
init();
