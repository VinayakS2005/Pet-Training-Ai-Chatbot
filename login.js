const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () =>
  container.classList.add('right-panel-active')
);

signInButton.addEventListener('click', () =>
  container.classList.remove('right-panel-active')
);

// Signup Form Submission
document.getElementById("signup-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    fetch("register.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `name=${name}&email=${email}&password=${password}`
    })
    .then(res => res.text())
    .then(data => {
        const msg = document.getElementById("signup-message");
        msg.innerText = data;
        msg.style.color = data.includes("successful") ? "green" : "red";
    });
});

// Login Form Submission
document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    fetch("login.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `email=${email}&password=${password}`
    })
    .then(res => res.text())
    .then(data => {
        const msg = document.getElementById("login-message");
        msg.innerText = data;
        msg.style.color = data.includes("successful") ? "green" : "red";
        if (data.includes("successful")) {
            setTimeout(() => window.location.href = "index.html", 1500);
        }
    });
});
