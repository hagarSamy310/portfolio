let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let navLinks = document.querySelectorAll('.navbar a');
let body = document.body;
let contactForm = document.getElementById('contactForm');
let downloadCvBtn = document.getElementById('download-cv-btn');
let scrollToTopBtn = document.getElementById('scrollToTopBtn');



/**
 * Mobile Menu Toggle and Link Close Functionality
 */
menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
}

navLinks.forEach(link => {
    link.onclick = () => {
        if (navbar.classList.contains('active')) {
            menuIcon.classList.remove('bx-x');
            navbar.classList.remove('active');
        }
    }
});


/**
 * Contact Form Validation
 */
contactForm.addEventListener('submit', function(event) {
    event.preventDefault();

    let isValid = true;
    
    const requiredInputs = [
        document.getElementById('fullName'),
        document.getElementById('email'),
        document.getElementById('subject'),
        document.getElementById('message')
    ];

    function validateInput(inputElement) {
        inputElement.classList.remove('input-error');

        if (inputElement.value.trim() === '') {
            inputElement.classList.add('input-error');
            isValid = false;
        } else if (inputElement.id === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(inputElement.value.trim())) {
                inputElement.classList.add('input-error');
                isValid = false;
            }
        }
    }

    requiredInputs.forEach(validateInput);
    
    if (isValid) {
        alert('Message sent successfully! (Form submission simulated)');
        contactForm.reset();
    } else {
        alert('Please fill out all required fields correctly (Full Name, Email, Subject, Message).');
    }
});


/**
 * Scroll to Top Button
 */
window.onscroll = () => {
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        scrollToTopBtn.style.display = "flex";
    } else {
        scrollToTopBtn.style.display = "none";
    }
}


/**
 * Download CV 
 */
// Trigger CV download
downloadCvBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    // Simple comment: File path for the CV
    link.href = 'Hagar_Samy_CV.pdf'; 
    link.download = 'Hagar_Samy_CV.pdf';
    
    document.body.appendChild(link);
    link.click();
    
    document.body.removeChild(link);
});