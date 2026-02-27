// Node.js script to update branding across all HTML files
// Run with: node update-branding.js

const fs = require('fs');
const path = require('path');

// Files to update
const htmlFiles = [
    'index.html',
    'about.html',
    'services.html',
    'contact.html',
    'privacy.html',
    'terms.html',
    'disclaimer.html'
];

// Replacement mappings
const replacements = [
    // Company name
    { find: /RoofingRepair/g, replace: 'Heritage Roof Works' },
    
    // Logo initials
    { find: />RR</g, replace: '>HR<' },
    
    // Phone number (display format)
    { find: /\+1-283-382-3828/g, replace: '+1-293-382-3922' },
    
    // Phone number (tel: link)
    { find: /tel:\+12833823828/g, replace: 'tel:+12933823922' },
    
    // Email (display)
    { find: /help@roofingrepair\.site/g, replace: 'help@heritageroofworks.site' },
    
    // Email (mailto: link)
    { find: /mailto:help@roofingrepair\.site/g, replace: 'mailto:help@heritageroofworks.site' },
    
    // Domain
    { find: /roofingrepair\.site/g, replace: 'heritageroofworks.site' }
];

// Cookie consent script to add before </body>
const cookieScript = '    <script src="js/cookie-consent.js"></script>\n';

// Cookie policy link for footer
const cookiePolicyLink = '                        <li><a href="cookies.html" class="hover-text-white transition-colors">Cookie Policy</a></li>\n';

function updateFile(filename) {
    const filepath = path.join(__dirname, filename);
    
    try {
        // Read file
        let content = fs.readFileSync(filepath, 'utf8');
        
        // Apply all replacements
        replacements.forEach(({ find, replace }) => {
            content = content.replace(find, replace);
        });
        
        // Add cookie consent script if not already present
        if (!content.includes('cookie-consent.js')) {
            content = content.replace('</body>', cookieScript + '</body>');
        }
        
        // Add cookie policy link to footer if not already present
        if (!content.includes('cookies.html') && content.includes('<li><a href="disclaimer.html"')) {
            content = content.replace(
                '                        <li><a href="disclaimer.html" class="hover-text-white transition-colors">Disclaimer</a></li>',
                '                        <li><a href="disclaimer.html" class="hover-text-white transition-colors">Disclaimer</a></li>\n' + cookiePolicyLink
            );
        }
        
        // Write file back
        fs.writeFileSync(filepath, content, 'utf8');
        
        console.log(`✅ Updated: ${filename}`);
    } catch (error) {
        console.error(`❌ Error updating ${filename}:`, error.message);
    }
}

// Main execution
console.log('🚀 Starting branding update...\n');

htmlFiles.forEach(updateFile);

console.log('\n✨ Branding update complete!');
console.log('\nUpdates made:');
console.log('- Company name: RoofingRepair → Heritage Roof Works');
console.log('- Logo: RR → HR');
console.log('- Phone: +1-283-382-3828 → +1-293-382-3922');
console.log('- Email: help@roofingrepair.site → help@heritageroofworks.site');
console.log('- Added cookie consent script to all pages');
console.log('- Added Cookie Policy link to footer');
console.log('\n📝 Please test all pages to verify changes!');
