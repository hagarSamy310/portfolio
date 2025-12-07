const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");
const navLinks = document.querySelectorAll(".navbar a");

const contactForm = document.getElementById("contactForm");

const body = document.body;
const downloadCvBtn = document.getElementById("download-cv-btn");
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

// Mobile Menu Toggle
menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

navLinks.forEach((link) => {
  link.onclick = () => {
    if (navbar.classList.contains("active")) {
      menuIcon.classList.remove("bx-x");
      navbar.classList.remove("active");
    }
  };
});

// Contact Form Validation
const name = document.getElementById("fullName");
const email = document.getElementById("email");
const message = document.getElementById("message");
const feedbackMessage = document.querySelector(".feedback");
const requiredInputs = [name, email, message];

function setError(input, msg) {
  input.classList.add("input-error");
  feedbackMessage.style.opacity = "1";
  feedbackMessage.textContent = msg;
}

function removeError(input) {
  input.classList.remove("input-error");
  feedbackMessage.style.opacity = "0"; 
}

function clearFormInputs() {
    requiredInputs.forEach(input => {
        input.value = '';
    });
		document.getElementById('phoneNumber').value = '';
}

function validatName() {
  return name.value.trim().length >= 3;
}

function validateEmail() {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.value.trim());
}

function validateMessage() {
  return message.value.trim().length >= 10;
}

// Removing error style when user is typing
requiredInputs.forEach((input) => { 
  input.addEventListener("input", () => removeError(input));
});

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Reset
  requiredInputs.forEach(input => removeError(input)); 

  if (!validatName()) {
    setError(name, "Please enter a valid name");
    name.focus();
    return;
  } else if (!validateEmail()) {
    setError(email, "Please enter a valid email");
    email.focus();
    return;
  } else if (!validateMessage()) {
    setError(message, "Please write your message (min 10 characters)");
    message.focus();
    return;
  }
  
  // Sending to my gmail via Email.js
  const serviceID = "service_6evxnbr";
  const templateID = "template_a858wlm";

  emailjs.sendForm(serviceID, templateID, contactForm).then(
    () => {
      console.log("SUCCESS!");
      
      feedbackMessage.style.opacity = '1';
      feedbackMessage.textContent = 'Message sent successfully ✔';
      feedbackMessage.style.color = 'rgb(20, 104, 66)';
      
      clearFormInputs(); 

      setTimeout(() => {
        feedbackMessage.style.opacity = '0';
      }, 3000); 

    },
    (error) => {
      console.log("FAILED...", error);
      setError(name, 'Something went wrong, please check your network or try again!');
      
      setTimeout(() => {
        feedbackMessage.style.opacity = '0';
      }, 5000); 
    }
  );
  });

// Scroll to Top Button
window.onscroll = () => {
  if (
    document.body.scrollTop > 500 ||
    document.documentElement.scrollTop > 500
  ) {
    scrollToTopBtn.style.display = "flex";
  } else {
    scrollToTopBtn.style.display = "none";
  }
};

// Download CV
downloadCvBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.href = "./Hagar Samy-Frontend-CV.pdf";
  link.download = "HagarSamy-FrontendDev-CV.pdf";

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
});