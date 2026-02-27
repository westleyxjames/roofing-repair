// Lead Form JavaScript

function initializeLeadForm() {
    const formContainer = document.getElementById('lead-form-container');
    if (!formContainer) return;

    // Create form HTML
    formContainer.innerHTML = `
        <div class="bg-white rounded-lg shadow-lg p-6 md-p-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Request a Free Inspection</h2>
            
            <div id="success-message" class="success-message hidden">
                <div class="text-green-600 mb-2">
                    <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width: 4rem; height: 4rem; margin: 0 auto;">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">Thank You!</h3>
                <p class="text-gray-700">Our team will contact you soon.</p>
            </div>

            <form id="lead-form" class="space-y-4">
                <!-- Full Name -->
                <div>
                    <label for="fullName" class="block text-sm font-semibold text-gray-700 mb-1">
                        Full Name *
                    </label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        required
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                    <p class="error hidden" id="fullName-error"></p>
                </div>

                <!-- Phone -->
                <div>
                    <label for="phone" class="block text-sm font-semibold text-gray-700 mb-1">
                        Phone *
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                    <p class="error hidden" id="phone-error"></p>
                </div>

                <!-- Email -->
                <div>
                    <label for="email" class="block text-sm font-semibold text-gray-700 mb-1">
                        Email *
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                    <p class="error hidden" id="email-error"></p>
                </div>

                <!-- Property Address -->
                <div>
                    <label for="address" class="block text-sm font-semibold text-gray-700 mb-1">
                        Property Address *
                    </label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        required
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                    <p class="error hidden" id="address-error"></p>
                </div>

                <!-- Type of Issue -->
                <div>
                    <label for="issueType" class="block text-sm font-semibold text-gray-700 mb-1">
                        Type of Issue *
                    </label>
                    <select
                        id="issueType"
                        name="issueType"
                        required
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    >
                        <option value="">Select an issue</option>
                        <option value="leak">Leak Detection</option>
                        <option value="storm">Storm Damage</option>
                        <option value="shingle">Shingle Replacement</option>
                        <option value="flashing">Flashing Repair</option>
                        <option value="maintenance">General Maintenance</option>
                        <option value="other">Other</option>
                    </select>
                    <p class="error hidden" id="issueType-error"></p>
                </div>

                <!-- Optional Message -->
                <div>
                    <label for="message" class="block text-sm font-semibold text-gray-700 mb-1">
                        Additional Details (Optional)
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        rows="3"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    ></textarea>
                </div>

                <!-- Agreement Checkbox -->
                <div>
                    <label class="flex items-start space-x-2">
                        <input
                            type="checkbox"
                            id="agreeToPolicy"
                            name="agreeToPolicy"
                            required
                            class="mt-1"
                        />
                        <span class="text-sm text-gray-700">
                            I agree to the 
                            <a href="privacy.html" class="text-blue-600 hover-underline" target="_blank">Privacy Policy</a>
                            & 
                            <a href="terms.html" class="text-blue-600 hover-underline" target="_blank">Terms</a>
                        </span>
                    </label>
                    <p class="error hidden" id="agreeToPolicy-error"></p>
                </div>

                <!-- Disclaimer -->
                <p class="text-xs text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-200">
                    By submitting this form, you agree to be contacted by Homestead Aura via phone, SMS, or email regarding your design inquiry. Message and data rates may apply.
                </p>

                <!-- Submit Button -->
                <button
                    type="submit"
                    class="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover-bg-blue-700 transition-colors font-semibold"
                >
                    Request Free Inspection
                </button>
            </form>
        </div>
    `;

    // Form validation and submission
    const form = document.getElementById('lead-form');
    const successMessage = document.getElementById('success-message');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous errors
            const errorElements = form.querySelectorAll('.error');
            errorElements.forEach(el => {
                el.classList.add('hidden');
                el.textContent = '';
            });

            // Get form values
            const fullName = document.getElementById('fullName').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const email = document.getElementById('email').value.trim();
            const address = document.getElementById('address').value.trim();
            const issueType = document.getElementById('issueType').value;
            const message = document.getElementById('message').value.trim();
            const agreeToPolicy = document.getElementById('agreeToPolicy').checked;

            let isValid = true;

            // Validate Full Name
            if (!fullName) {
                showError('fullName', 'Full name is required');
                isValid = false;
            }

            // Validate Phone
            if (!phone) {
                showError('phone', 'Phone number is required');
                isValid = false;
            } else if (!isValidPhone(phone)) {
                showError('phone', 'Please enter a valid phone number');
                isValid = false;
            }

            // Validate Email
            if (!email) {
                showError('email', 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError('email', 'Please enter a valid email address');
                isValid = false;
            }

            // Validate Address
            if (!address) {
                showError('address', 'Property address is required');
                isValid = false;
            }

            // Validate Issue Type
            if (!issueType) {
                showError('issueType', 'Please select an issue type');
                isValid = false;
            }

            // Validate Agreement
            if (!agreeToPolicy) {
                showError('agreeToPolicy', 'You must agree to continue');
                isValid = false;
            }

            if (isValid) {
                // Create form data object
                const formData = {
                    fullName,
                    phone,
                    email,
                    address,
                    issueType,
                    message,
                    timestamp: new Date().toISOString()
                };

                // Log form data (In production, this would send to a backend)
                console.log('Form submitted:', formData);

                // Show success message
                form.classList.add('hidden');
                successMessage.classList.remove('hidden');

                // Reset form after 5 seconds and hide success message
                setTimeout(function() {
                    form.reset();
                    form.classList.remove('hidden');
                    successMessage.classList.add('hidden');
                }, 5000);
            }
        });
    }
}

function showError(fieldId, message) {
    const errorElement = document.getElementById(fieldId + '-error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
    }
}

// Initialize form when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        const formContainer = document.getElementById('lead-form-container');
        if (formContainer) {
            initializeLeadForm();
        }
    });
} else {
    const formContainer = document.getElementById('lead-form-container');
    if (formContainer) {
        initializeLeadForm();
    }
}