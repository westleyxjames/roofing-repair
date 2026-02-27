// Cookie Consent Banner JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Check if user has already accepted cookies
    if (!getCookie('cookieConsent')) {
        showCookieBanner();
    }
});

function showCookieBanner() {
    // Create cookie banner HTML
    const banner = document.createElement('div');
    banner.id = 'cookie-consent-banner';
    banner.className = 'cookie-consent-banner';
    banner.innerHTML = `
        <div class="cookie-consent-content">
            <div class="cookie-consent-text">
                <p>
                    <strong>We use cookies</strong> to improve your experience on our website. 
                    By continuing to browse, you agree to our use of cookies. 
                    <a href="cookies.html" class="cookie-policy-link">Learn more</a>
                </p>
            </div>
            <div class="cookie-consent-buttons">
                <button id="cookie-accept" class="cookie-btn cookie-accept">Accept All</button>
                <button id="cookie-decline" class="cookie-btn cookie-decline">Decline</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(banner);
    
    // Add event listeners
    document.getElementById('cookie-accept').addEventListener('click', acceptCookies);
    document.getElementById('cookie-decline').addEventListener('click', declineCookies);
}

function acceptCookies() {
    setCookie('cookieConsent', 'accepted', 365);
    hideCookieBanner();
    // Enable analytics or other tracking here if needed
    console.log('Cookies accepted');
}

function declineCookies() {
    setCookie('cookieConsent', 'declined', 365);
    hideCookieBanner();
    console.log('Cookies declined');
}

function hideCookieBanner() {
    const banner = document.getElementById('cookie-consent-banner');
    if (banner) {
        banner.style.opacity = '0';
        setTimeout(function() {
            banner.remove();
        }, 300);
    }
}

function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
