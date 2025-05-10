// Placeholder for shared JavaScript functionality across pages
// Currently, chat.html has inline scripts for voice recognition and camera

document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // Initialize theme based on saved preference or default to light
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-theme');
        themeToggleBtn.textContent = 'Dark Mode';
    } else {
        body.classList.remove('dark-theme');
        themeToggleBtn.textContent = 'Light Mode';
    }

    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        if (body.classList.contains('dark-theme')) {
            themeToggleBtn.textContent = 'Dark Mode';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggleBtn.textContent = 'Light Mode';
            localStorage.setItem('theme', 'light');
        }
    });

    // Search and filter functionality for consultancy.html
    const searchInput = document.getElementById('search-input');
    const doctorList = document.getElementById('doctor-list');

    if (searchInput && doctorList) {
        searchInput.addEventListener('input', () => {
            const filter = searchInput.value.toLowerCase();
            const doctors = doctorList.getElementsByTagName('li');
            Array.from(doctors).forEach(doctor => {
                const name = doctor.getAttribute('data-name').toLowerCase();
                const specialty = doctor.getAttribute('data-specialty').toLowerCase();
                const location = doctor.getAttribute('data-location').toLowerCase();
                if (name.includes(filter) || specialty.includes(filter) || location.includes(filter)) {
                    doctor.style.display = '';
                } else {
                    doctor.style.display = 'none';
                }
            });
        });
    }

    // Login form validation and submission for login.html
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = loginForm.email.value.trim();
            const password = loginForm.password.value.trim();
            if (!email || !password) {
                alert('Please enter both email and password.');
                return;
            }
            // Simple email format check
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            // Set login state in localStorage
            localStorage.setItem('loggedIn', 'true');
            alert('Login successful (simulated).');
            loginForm.reset();
            // Redirect to user account page after login
            window.location.href = 'account.html';
        });
    }

    // Appointment button handlers for consultancy.html
    const appointmentButtons = document.querySelectorAll('.appointment-btn');
    appointmentButtons.forEach(button => {
        button.addEventListener('click', () => {
            alert('Appointment request sent. A representative will contact you soon.');
        });
    });
});
