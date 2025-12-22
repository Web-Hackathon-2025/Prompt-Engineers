/**
 * Karigar Security Utilities
 * High-level security measures for the application
 */

const KarigarSecurity = {
    // =========================================
    // INPUT SANITIZATION
    // =========================================
    
    /**
     * Sanitize user input to prevent XSS attacks
     * @param {string} input - Raw user input
     * @returns {string} - Sanitized input
     */
    sanitizeInput: function(input) {
        if (typeof input !== 'string') return input;
        
        // Remove any script tags
        let sanitized = input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
        
        // Encode HTML entities
        const htmlEntities = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;',
            '/': '&#x2F;',
            '`': '&#x60;',
            '=': '&#x3D;'
        };
        
        sanitized = sanitized.replace(/[&<>"'`=\/]/g, char => htmlEntities[char]);
        
        return sanitized;
    },
    
    /**
     * Sanitize an object's string values
     * @param {object} obj - Object to sanitize
     * @returns {object} - Sanitized object
     */
    sanitizeObject: function(obj) {
        const sanitized = {};
        for (const key in obj) {
            if (typeof obj[key] === 'string') {
                sanitized[key] = this.sanitizeInput(obj[key]);
            } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                sanitized[key] = this.sanitizeObject(obj[key]);
            } else {
                sanitized[key] = obj[key];
            }
        }
        return sanitized;
    },
    
    // =========================================
    // INPUT VALIDATION
    // =========================================
    
    /**
     * Validate email format
     * @param {string} email - Email to validate
     * @returns {boolean}
     */
    isValidEmail: function(email) {
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        return emailRegex.test(email) && email.length <= 254;
    },
    
    /**
     * Validate password strength
     * @param {string} password - Password to validate
     * @returns {object} - { valid: boolean, message: string, strength: number }
     */
    validatePassword: function(password) {
        const result = {
            valid: true,
            message: 'Password is strong',
            strength: 0
        };
        
        if (password.length < 8) {
            result.valid = false;
            result.message = 'Password must be at least 8 characters';
            return result;
        }
        
        // Check for different character types
        if (/[a-z]/.test(password)) result.strength++;
        if (/[A-Z]/.test(password)) result.strength++;
        if (/[0-9]/.test(password)) result.strength++;
        if (/[^a-zA-Z0-9]/.test(password)) result.strength++;
        
        if (result.strength < 2) {
            result.valid = false;
            result.message = 'Password must contain uppercase, lowercase, numbers, or special characters';
        } else if (result.strength === 2) {
            result.message = 'Password strength: Medium';
        } else if (result.strength === 3) {
            result.message = 'Password strength: Good';
        } else {
            result.message = 'Password strength: Excellent';
        }
        
        return result;
    },
    
    /**
     * Validate phone number (Pakistani format)
     * @param {string} phone - Phone number
     * @returns {boolean}
     */
    isValidPhone: function(phone) {
        // Remove spaces and dashes
        const cleaned = phone.replace(/[\s-]/g, '');
        // Pakistani phone format: +92XXXXXXXXXX or 03XXXXXXXXX
        const phoneRegex = /^(\+92|0)?3[0-9]{9}$/;
        return phoneRegex.test(cleaned);
    },
    
    /**
     * Validate that input doesn't contain SQL injection patterns
     * @param {string} input - Input to check
     * @returns {boolean}
     */
    isSafeFromSQLInjection: function(input) {
        const sqlPatterns = [
            /(\%27)|(\')|(\-\-)|(\%23)|(#)/i,
            /((\%3D)|(=))[^\n]*((\%27)|(\')|(\-\-)|(\%3B)|(;))/i,
            /\w*((\%27)|(\'))((\%6F)|o|(\%4F))((\%72)|r|(\%52))/i,
            /((\%27)|(\'))union/i
        ];
        
        return !sqlPatterns.some(pattern => pattern.test(input));
    },
    
    // =========================================
    // RATE LIMITING (Client-side)
    // =========================================
    
    rateLimitStore: {},
    
    /**
     * Check if action is rate limited
     * @param {string} action - Action identifier
     * @param {number} maxAttempts - Maximum attempts allowed
     * @param {number} windowMs - Time window in milliseconds
     * @returns {boolean} - true if allowed, false if rate limited
     */
    checkRateLimit: function(action, maxAttempts = 5, windowMs = 60000) {
        const now = Date.now();
        
        if (!this.rateLimitStore[action]) {
            this.rateLimitStore[action] = { attempts: [], blocked: false };
        }
        
        const store = this.rateLimitStore[action];
        
        // Remove old attempts outside the window
        store.attempts = store.attempts.filter(time => now - time < windowMs);
        
        // Check if blocked
        if (store.attempts.length >= maxAttempts) {
            store.blocked = true;
            const timeLeft = Math.ceil((store.attempts[0] + windowMs - now) / 1000);
            console.warn(`Rate limited: ${action}. Try again in ${timeLeft}s`);
            return false;
        }
        
        // Add current attempt
        store.attempts.push(now);
        store.blocked = false;
        return true;
    },
    
    /**
     * Reset rate limit for an action
     * @param {string} action - Action identifier
     */
    resetRateLimit: function(action) {
        delete this.rateLimitStore[action];
    },
    
    // =========================================
    // SESSION SECURITY
    // =========================================
    
    /**
     * Generate a secure session token
     * @returns {string}
     */
    generateSessionToken: function() {
        const array = new Uint8Array(32);
        crypto.getRandomValues(array);
        return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    },
    
    /**
     * Securely store data (with expiry)
     * @param {string} key - Storage key
     * @param {any} value - Value to store
     * @param {number} expiryMinutes - Expiry time in minutes
     */
    secureStore: function(key, value, expiryMinutes = 60) {
        const item = {
            value: value,
            expiry: Date.now() + (expiryMinutes * 60 * 1000),
            token: this.generateSessionToken().substring(0, 8)
        };
        sessionStorage.setItem(key, JSON.stringify(item));
    },
    
    /**
     * Retrieve securely stored data
     * @param {string} key - Storage key
     * @returns {any} - Stored value or null if expired
     */
    secureRetrieve: function(key) {
        const itemStr = sessionStorage.getItem(key);
        if (!itemStr) return null;
        
        try {
            const item = JSON.parse(itemStr);
            if (Date.now() > item.expiry) {
                sessionStorage.removeItem(key);
                return null;
            }
            return item.value;
        } catch {
            return null;
        }
    },
    
    /**
     * Clear all secure storage
     */
    clearSecureStorage: function() {
        sessionStorage.clear();
    },
    
    // =========================================
    // CONTENT SECURITY
    // =========================================
    
    /**
     * Check for potentially malicious URLs
     * @param {string} url - URL to check
     * @returns {boolean} - true if safe
     */
    isSafeURL: function(url) {
        try {
            const parsed = new URL(url);
            // Only allow http and https protocols
            if (!['http:', 'https:'].includes(parsed.protocol)) {
                return false;
            }
            // Block javascript: URLs
            if (url.toLowerCase().includes('javascript:')) {
                return false;
            }
            return true;
        } catch {
            return false;
        }
    },
    
    /**
     * Validate file upload
     * @param {File} file - File to validate
     * @param {array} allowedTypes - Allowed MIME types
     * @param {number} maxSizeMB - Maximum size in MB
     * @returns {object} - { valid: boolean, message: string }
     */
    validateFileUpload: function(file, allowedTypes = ['image/jpeg', 'image/png', 'image/webp'], maxSizeMB = 5) {
        if (!file) {
            return { valid: false, message: 'No file provided' };
        }
        
        if (!allowedTypes.includes(file.type)) {
            return { valid: false, message: `Invalid file type. Allowed: ${allowedTypes.join(', ')}` };
        }
        
        if (file.size > maxSizeMB * 1024 * 1024) {
            return { valid: false, message: `File too large. Maximum size: ${maxSizeMB}MB` };
        }
        
        return { valid: true, message: 'File is valid' };
    },
    
    // =========================================
    // ADMIN VERIFICATION (Server-side recommended)
    // =========================================
    
    /**
     * Hash a string using SHA-256
     * @param {string} str - String to hash
     * @returns {Promise<string>} - Hashed string
     */
    hashString: async function(str) {
        const encoder = new TextEncoder();
        const data = encoder.encode(str);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    },
    
    /**
     * Verify admin code with timing-safe comparison
     * @param {string} inputCode - User input code
     * @param {string} correctHash - Pre-computed hash of correct code
     * @returns {Promise<boolean>}
     */
    verifyAdminCode: async function(inputCode, correctHash) {
        const inputHash = await this.hashString(inputCode);
        // Timing-safe comparison
        if (inputHash.length !== correctHash.length) return false;
        let result = 0;
        for (let i = 0; i < inputHash.length; i++) {
            result |= inputHash.charCodeAt(i) ^ correctHash.charCodeAt(i);
        }
        return result === 0;
    },
    
    // =========================================
    // LOGGING & MONITORING
    // =========================================
    
    /**
     * Log security event
     * @param {string} event - Event type
     * @param {object} details - Event details
     */
    logSecurityEvent: function(event, details = {}) {
        const logEntry = {
            timestamp: new Date().toISOString(),
            event: event,
            userAgent: navigator.userAgent,
            url: window.location.href,
            ...details
        };
        
        // In production, send to server
        console.log('[Security]', logEntry);
        
        // Store locally for debugging
        const logs = JSON.parse(localStorage.getItem('security_logs') || '[]');
        logs.push(logEntry);
        // Keep only last 100 logs
        if (logs.length > 100) logs.shift();
        localStorage.setItem('security_logs', JSON.stringify(logs));
    },
    
    // =========================================
    // INITIALIZATION
    // =========================================
    
    /**
     * Initialize security measures
     */
    init: function() {
        // Prevent clickjacking
        if (window.self !== window.top) {
            console.warn('Potential clickjacking detected');
            // Optionally: window.top.location = window.self.location;
        }
        
        // Log page load
        this.logSecurityEvent('page_load');
        
        // Clear expired secure storage on load
        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            this.secureRetrieve(key); // This will clear expired items
        }
        
        console.log('✅ Karigar Security initialized');
    }
};

// Auto-initialize
if (typeof window !== 'undefined') {
    window.KarigarSecurity = KarigarSecurity;
    document.addEventListener('DOMContentLoaded', () => KarigarSecurity.init());
}

// Export for modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = KarigarSecurity;
}
