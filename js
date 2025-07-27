// Main JavaScript for FedEx Shipping Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeTrackingForm();
    initializeLocationForm();
    initializeContactForm();
    addAnimations();
});

// Tracking Form Functionality
function initializeTrackingForm() {
    const trackingForm = document.getElementById('tracking-form');
    if (trackingForm) {
        trackingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const trackingNumber = document.getElementById('tracking-number').value;
            
            if (!trackingNumber) {
                showAlert('Please enter a tracking number', 'danger');
                return;
            }
            
            // In a real application, this would make an API call to the tracking service
            // For demo purposes, we'll just show a success message
            showAlert(`Tracking information for ${trackingNumber} is being processed`, 'success');
            
            // Clear the form
            trackingForm.reset();
        });
    }
}
// Location Form Functionality
function initializeLocationForm() {
    const locationForm = document.getElementById('location-form');
    if (locationForm) {
        locationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const zipCode = document.getElementById('zip-code').value;
            const locationType = document.getElementById('location-type').value;
            
            if (!zipCode) {
                showAlert('Please enter a zip code or city', 'danger');
                return;
            }
            
            // In a real application, this would make an API call to get location data
            // For demo purposes, we'll just show a success message
            showAlert(`Searching for ${locationType} in ${zipCode}`, 'info');
            
            // In a real application, this would update the map with locations
            // For demo purposes, we'll just update the placeholder text
            const mapPlaceholder = document.querySelector('.location-map .ratio div');
            if (mapPlaceholder) {
                mapPlaceholder.innerHTML = `<p class="text-white">Showing ${locationType} in ${zipCode}</p>`;
            }
        });
    }
}

// Contact Form Functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !subject || !message) {
                showAlert('Please fill in all fields', 'danger');
                return;
            }
            
            // Validate email format
            if (!validateEmail(email)) {
                showAlert('Please enter a valid email address', 'danger');
                return;
            }
            
            // In a real application, this would send the form data to a server
            // For demo purposes, we'll just show a success message
            showAlert('Your message has been sent successfully!', 'success');
            
            // Clear the form
            contactForm.reset();
        });
    }
}

// Email validation helper function
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Alert helper function
function showAlert(message, type = 'info') {
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.setAttribute('role', 'alert');
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    // Find a suitable container for the alert
    const container = document.querySelector('.container');
    if (container) {
        // Insert at the top of the first container
        container.insertBefore(alertDiv, container.firstChild);
        
        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            alertDiv.classList.remove('show');
            setTimeout(() => alertDiv.remove(), 300);
        }, 5000);
    }
}

// Add animations to elements as they come into view
function addAnimations() {
    // Add the fadeIn class to sections as they scroll into view
    const sections = document.querySelectorAll('section');
    
    // Create an intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fadeIn');
                // Once the animation is applied, we don't need to observe this element anymore
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 }); // Trigger when at least 10% of the element is visible
    
    // Observe each section
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only apply to links that point to an ID on the page
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#') && targetId.length > 1) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70, // Adjust for navbar height
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}
