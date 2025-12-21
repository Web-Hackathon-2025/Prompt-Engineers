/* ============================================
   KARIGAR - PAGE TRANSITIONS SYSTEM
   Smooth 3D-style page animations
   ============================================ */

// Initialize page transitions when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Create page transition overlay
    createTransitionOverlay();
    
    // Fade in the page on load
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.4s ease';
    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });
    
    // Attach transition handlers to links
    attachLinkHandlers();
    
    // Initialize 3D tilt effect on cards
    init3DTilt();
    
    // Initialize ripple effects on buttons
    initRippleEffect();
    
    // Initialize scroll animations
    initScrollAnimations();
});

// Create the transition overlay element
function createTransitionOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'page-transition-overlay';
    overlay.innerHTML = `
        <div class="brand-icon">🔧</div>
        <div class="loader"></div>
    `;
    document.body.appendChild(overlay);
}

// Trigger exit animation before navigating
function navigateWithTransition(url) {
    const overlay = document.querySelector('.page-transition-overlay');
    if (overlay) {
        overlay.classList.add('active');
        
        // Animate main content out
        const mainContent = document.querySelector('main, .main-content, .dashboard-content, .auth-container, .hero-section');
        if (mainContent) {
            mainContent.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            mainContent.style.opacity = '0';
            mainContent.style.transform = 'scale(0.97) translateY(-20px)';
        }
        
        // Navigate after animation
        setTimeout(() => {
            window.location.href = url;
        }, 400);
    } else {
        window.location.href = url;
    }
}

// Initialize simple scroll animations
function initScrollAnimations() {
    // Intersection Observer for fade-in animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Apply to sections that should animate on scroll
    const animateElements = document.querySelectorAll(
        '.testimonial-card, .step-card, .footer-3d'
    );
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        scrollObserver.observe(el);
    });
}

// Attach click handlers to navigation links
function attachLinkHandlers() {
    const links = document.querySelectorAll('a[href]');
    
    links.forEach(link => {
        const href = link.getAttribute('href');
        
        // Only attach to internal .html links (not # anchors, external links, or javascript:)
        if (href && 
            !href.startsWith('#') && 
            !href.startsWith('javascript:') && 
            !href.startsWith('http://') && 
            !href.startsWith('https://') &&
            !href.startsWith('mailto:') &&
            href.endsWith('.html')) {
            
            link.addEventListener('click', function(e) {
                e.preventDefault();
                navigateWithTransition(href);
            });
        }
    });
}

// 3D Tilt effect on mouse move
function init3DTilt() {
    const tiltCards = document.querySelectorAll('.card-3d, .stat-card, .service-card, .provider-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(5px)`;
            card.style.transition = 'transform 0.1s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
            card.style.transition = 'transform 0.3s ease';
        });
    });
}

// Ripple effect on button click
function initRippleEffect() {
    const buttons = document.querySelectorAll('.btn-primary-3d, .btn-secondary-3d, .btn, button:not(.nav-toggle)');
    
    buttons.forEach(button => {
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        
        button.addEventListener('click', function(e) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            ripple.style.cssText = `
                position: absolute;
                width: 20px;
                height: 20px;
                background: rgba(255, 255, 255, 0.4);
                border-radius: 50%;
                transform: translate(-50%, -50%) scale(0);
                animation: rippleAnimation 0.6s ease-out forwards;
                pointer-events: none;
                left: ${x}px;
                top: ${y}px;
            `;
            
            button.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add ripple animation keyframes if not exists
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes rippleAnimation {
                to {
                    transform: translate(-50%, -50%) scale(15);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Animate number counters
function animateCounters() {
    const counters = document.querySelectorAll('.stat-value, .stat-number, [data-counter]');
    
    counters.forEach(counter => {
        const text = counter.textContent;
        const numMatch = text.match(/[\d,]+/);
        
        if (numMatch) {
            const target = parseInt(numMatch[0].replace(/,/g, ''));
            const prefix = text.substring(0, text.indexOf(numMatch[0]));
            const suffix = text.substring(text.indexOf(numMatch[0]) + numMatch[0].length);
            
            if (target > 0 && target < 100000) {
                let current = 0;
                const increment = target / 50;
                const duration = 1500;
                const stepTime = duration / 50;
                
                counter.textContent = prefix + '0' + suffix;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    counter.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
                }, stepTime);
            }
        }
    });
}

// Show toast notification with animation
function showAnimatedToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type} bounce-in`;
    toast.innerHTML = `
        <span class="toast-icon">${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span>
        <span class="toast-message">${message}</span>
    `;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        font-weight: 500;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.transition = 'opacity 0.3s, transform 0.3s';
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100px)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Modal open/close animations
function openModalWithAnimation(modalSelector) {
    const modal = document.querySelector(modalSelector);
    if (modal) {
        modal.style.display = 'flex';
        modal.style.opacity = '0';
        
        const content = modal.querySelector('.modal-content, .modal-card');
        if (content) {
            content.style.transform = 'scale(0.8) translateY(50px)';
            content.style.opacity = '0';
        }
        
        requestAnimationFrame(() => {
            modal.style.transition = 'opacity 0.3s ease';
            modal.style.opacity = '1';
            
            if (content) {
                content.style.transition = 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease';
                content.style.transform = 'scale(1) translateY(0)';
                content.style.opacity = '1';
            }
        });
    }
}

function closeModalWithAnimation(modalSelector) {
    const modal = document.querySelector(modalSelector);
    if (modal) {
        const content = modal.querySelector('.modal-content, .modal-card');
        
        if (content) {
            content.style.transition = 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.2s ease';
            content.style.transform = 'scale(0.9) translateY(30px)';
            content.style.opacity = '0';
        }
        
        modal.style.transition = 'opacity 0.3s ease';
        modal.style.opacity = '0';
        
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

// Page visibility handler for re-triggering animations
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        // Remove transition overlay if visible after navigation back
        const overlay = document.querySelector('.page-transition-overlay');
        if (overlay) {
            overlay.classList.remove('active');
        }
    }
});

// Handle browser back/forward
window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        // Page was restored from cache
        const overlay = document.querySelector('.page-transition-overlay');
        if (overlay) {
            overlay.classList.remove('active');
        }
        // Fade in the page
        document.body.style.opacity = '1';
    }
});

// Expose functions globally for use in other scripts
window.KarigarTransitions = {
    navigateWithTransition,
    showAnimatedToast,
    openModalWithAnimation,
    closeModalWithAnimation
};
