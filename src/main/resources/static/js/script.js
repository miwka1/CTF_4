/**
 * CTF Platform - Main JavaScript functionality
 * Enhanced and optimized version
 */

// Main functionality for CTF platform
document.addEventListener('DOMContentLoaded', function() {
    initializePlatform();
});

function initializePlatform() {
    console.log('Initializing platform...');
    
    try {
        createParticles();
        initCategoryCards();
        initButtons();
        initTerminal();
        initParallax();
        initSmoothScroll();
        initActiveNavigation();
        initPageBackground();
        initLogoClick();
        initVisualEffects();
        initLeaderboardWidget();
        initLeaderboardToggle();
        initLeaderboardScroll();
        
        console.log('Platform initialized successfully');
    } catch (error) {
        console.error('Error initializing platform:', error);
    }
}

/**
 * Initialize all platform functionality
 */
function initializePlatform() {
    createParticles();
    initCategoryCards();
    initButtons();
    initTerminal();
    initParallax();
    initSmoothScroll();
    initActiveNavigation();
    initPageBackground();
    initLogoClick();
    initVisualEffects();
    initLeaderboardWidget(); 
    initLeaderboardToggle();
    initLeaderboardScroll();
}

/**
 * Initialize scroll lock functionality for leaderboard lists
 */
function initScrollLock(element, widget) {
    if (!element) return;
    
    let isScrolling = false;
    let scrollTimeout;
    
    // Wheel event for scrolling - блокируем распространение события
    element.addEventListener('wheel', function(e) {
        if (!isScrolling) {
            isScrolling = true;
        }
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
        }, 150);
        
        // Полностью блокируем прокрутку страницы
        e.stopPropagation();
        e.preventDefault();
        
        // Прокручиваем только содержимое лидерборда
        const scrollAmount = e.deltaY * 0.8;
        element.scrollTop += scrollAmount;
        
    }, { passive: false });
    
    // Touch events for mobile
    let touchStartY = 0;
    
    element.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
        // Блокируем начало касания
        e.stopPropagation();
    }, { passive: true });
    
    element.addEventListener('touchmove', function(e) {
        if (!isScrolling) {
            isScrolling = true;
        }
        
        const touchY = e.touches[0].clientY;
        const deltaY = touchStartY - touchY;
        
        // Блокируем перемещение
        e.stopPropagation();
        e.preventDefault();
        
        // Прокручиваем только содержимое лидерборда
        element.scrollTop += deltaY * 1.5;
        touchStartY = touchY;
        
    }, { passive: false });
    
    element.addEventListener('touchend', function(e) {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
        }, 150);
        e.stopPropagation();
    });
    
    // Блокировка прокрутки страницы при наведении на виджет
    if (widget) {
        widget.addEventListener('mouseenter', function() {
            document.body.style.overflow = 'hidden';
        });
        
        widget.addEventListener('mouseleave', function() {
            document.body.style.overflow = '';
        });
        
        // Для тач-устройств
        widget.addEventListener('touchstart', function(e) {
            document.body.style.overflow = 'hidden';
            e.stopPropagation();
        });
        
        widget.addEventListener('touchend', function(e) {
            setTimeout(() => {
                document.body.style.overflow = '';
            }, 100);
            e.stopPropagation();
        });
    }
}

function initLeaderboardScroll() {
    const top3List = document.getElementById('leaderboardTop3');
    const fullList = document.getElementById('leaderboardFull');
    const widget = document.querySelector('.leaderboard-widget');
    
    if (top3List) initScrollLock(top3List, widget);
    if (fullList) initScrollLock(fullList, widget);
}

function initLeaderboardToggle() {
    const toggleBtn = document.getElementById('toggleLeaderboard');
    const widget = document.querySelector('.leaderboard-widget');
    
    if (!toggleBtn || !widget) {
        console.error('Leaderboard elements not found');
        return;
    }
    let showingFullList = false;
    
    toggleBtn.addEventListener('click', function() {
        showingFullList = !showingFullList;
        
        if (showingFullList) {
            // Switch to full list
            document.getElementById('leaderboardTop3').style.display = 'none';
            document.getElementById('leaderboardFull').style.display = 'flex';
            document.querySelector('.leaderboard-header h3').textContent = '🏆 Полный список';
            this.textContent = 'Показать ТОП 3';
            this.classList.add('showing-all');
            widget.classList.add('expanded');
            
            // Generate full list only when needed
            const fullList = document.getElementById('leaderboardFull');
            if (fullList.children.length === 0) {
                generateFullLeaderboard();
            }
        } else {
            // Switch to top 3
            document.getElementById('leaderboardTop3').style.display = 'flex';
            document.getElementById('leaderboardFull').style.display = 'none';
            document.querySelector('.leaderboard-header h3').textContent = '🏆 ТОП 3';
            this.textContent = 'Показать всех участников';
            this.classList.remove('showing-all');
            widget.classList.remove('expanded');
        }
        
        console.log('Leaderboard toggled, showing full:', showingFullList);
    });
    
    console.log('Leaderboard toggle initialized');
}

function generateFullLeaderboard() {
    const fullList = document.getElementById('leaderboardFull');
    if (!fullList) return;
    
    const teams = [
        { name: 'YastiCreator', points: 9999 },
        { name: 'Binary Storm', points: 1670 },
        { name: 'Code Breakers', points: 1520 },
        { name: 'Zero Day', points: 1380 },
        { name: 'Cyber Samurai', points: 1240 },
        { name: 'Ghost Protocol', points: 1150 },
        { name: 'Neural Network', points: 1080 },
        { name: 'Dark Matter', points: 970 },
        { name: 'Phantom Squad', points: 890 },
        { name: 'Silent Hackers', points: 820 },
        { name: 'Red Team Alpha', points: 760 },
        { name: 'Blue Team Bravo', points: 710 },
        { name: 'Crypto Kings', points: 650 },
        { name: 'Web Warriors', points: 590 },
        { name: 'PWN Masters', points: 540 },
        { name: 'Shell Shock', points: 490 },
        { name: 'Buffer Overflow', points: 430 },
        { name: 'SQL Injection', points: 380 },
        { name: 'XSS Avengers', points: 320 },
        { name: 'CTF Newbies', points: 270 },
        { name: 'Python Pirates', points: 220 },
        { name: 'Java Jedi', points: 180 },
        { name: 'C++ Crusaders', points: 150 },
        { name: 'Rust Rangers', points: 120 },
        { name: 'Go Guardians', points: 90 }
    ];
    
    fullList.innerHTML = '';
    
    teams.forEach((team, index) => {
        const leaderItem = document.createElement('div');
        leaderItem.className = `leader-item ${index >= 3 ? 'regular' : ''}`;
        leaderItem.style.animationDelay = `${(index % 10) * 0.1}s`;
        
        leaderItem.innerHTML = `
            <div class="leader-rank">${index + 1}</div>
            <div class="leader-info">
                <div class="leader-name">${team.name}</div>
                <div class="leader-stats">${team.points} pts</div>
            </div>
        `;
        
        // Add click event
        leaderItem.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            console.log(`Clicked on: ${team.name}`);
        });
        
        fullList.appendChild(leaderItem);
    });
}

/**
 * Create animated background particles
 */
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;

    const particleCount = 12;
    const hackerSymbols = ['💻', '🔐', '⚡', '🔍', '💥', '🌐', '🚀', '🎯', '📡', '🔒', '👻', '🛡️'];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle hacker-particle';
        
        // Random properties
        const size = Math.random() * 30 + 20; // Larger for emojis
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 15 + 10; // Longer duration
        const symbol = hackerSymbols[Math.floor(Math.random() * hackerSymbols.length)];
        
        // Apply styles
        Object.assign(particle.style, {
            width: `${size}px`,
            height: `${size}px`,
            top: `${posY}%`,
            left: `${posX}%`,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`,
            fontSize: `${size * 0.6}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        });
        
        particle.textContent = symbol;
        particle.title = 'Hacker particle'; // Accessibility
        
        // Add click effect
        particle.addEventListener('click', function() {
            createParticleExplosion(this);
        });
        
        particlesContainer.appendChild(particle);
    }
}

function createParticleExplosion(element) {
    const rect = element.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    // Remove clicked particle
    element.remove();
    
    // Create explosion particles
    for (let i = 0; i < 8; i++) {
        const explosionParticle = document.createElement('div');
        explosionParticle.className = 'explosion-particle';
        explosionParticle.textContent = element.textContent;
        explosionParticle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            font-size: 16px;
            pointer-events: none;
            z-index: 10000;
            animation: explode 1s ease-out forwards;
            opacity: 0;
        `;
        
        document.body.appendChild(explosionParticle);
        
        // Remove after animation
        setTimeout(() => {
            explosionParticle.remove();
        }, 1000);
    }
    
    // Create new particle after delay
    setTimeout(createParticles, 2000);
}

/**
 * Initialize category cards animations
 */
function initCategoryCards() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.05)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

/**
 * Initialize button interactions
 */
function initButtons() {
    const buttons = document.querySelectorAll('.cta-btn');
    
    buttons.forEach(button => {
        // Hover effects
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
        
        // Click effects
        button.addEventListener('click', function(e) {
            // Click animation
            this.style.transform = 'translateY(1px)';
            
            setTimeout(() => {
                this.style.transform = 'translateY(-3px)';
                
                // Navigate after animation only if href exists and is not #
                const href = this.getAttribute('href');
                if (href && href !== '#' && href !== 'javascript:void(0)') {
                    setTimeout(() => {
                        window.location.href = href;
                    }, 200);
                }
            }, 150);
        });
    });
}

/**
 * Initialize terminal animation
 */
function initTerminal() {
    const terminalBody = document.querySelector('.terminal-body');
    if (!terminalBody) return;

    const messages = [
        "> Scanning network infrastructure...",
        "> Firewall detected: BYPASSING...",
        "> Access granted to mainframe...",
        "> Loading exploit database...",
        "> System fully operational...",
        "> Welcome, hacker. Ready for challenges?"
    ];
    
    // Clear initial content
    terminalBody.innerHTML = '';
    
    let currentMessage = 0;
    
    function typeMessage() {
        if (currentMessage < messages.length) {
            const messageElement = document.createElement('p');
            messageElement.textContent = messages[currentMessage];
            messageElement.style.opacity = '0';
            messageElement.style.animation = 'fadeIn 0.5s ease forwards';
            
            terminalBody.appendChild(messageElement);
            currentMessage++;
            
            // Auto-scroll to bottom
            terminalBody.scrollTop = terminalBody.scrollHeight;
            
            // Type next message
            setTimeout(typeMessage, 1200);
        }
    }
    
    // Start animation
    setTimeout(typeMessage, 1000);
}

/**
 * Initialize parallax background effect
 */
function initParallax() {
    const background = document.querySelector('.background');
    if (!background) return;

    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        background.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
    });
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Initialize active navigation highlighting
 */
function initActiveNavigation() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Убираем активный класс у всех ссылок
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Выделяем активную вкладку
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        const isLoginBtn = link.classList.contains('login-btn');
        
        // Для кнопки Login - выделяем только на странице /auth
        if (isLoginBtn) {
            if (currentPath === '/auth') {
                link.classList.add('active');
            }
        } 
        // Для обычных ссылок - стандартная логика
        else {
            if (currentPath === linkPath) {
                link.classList.add('active');
            }
            
            if (currentPath === '/' && linkPath === '/') {
                link.classList.add('active');
            }
            
            if (currentPath.startsWith('/category/') && linkPath === currentPath) {
                link.classList.add('active');
            }
        }
    });
}

/**
 * Utility function for debouncing
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Add CSS for fade-in animation
 */
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

function initVisualEffects() {
    // Create scan line
    const scanLine = document.createElement('div');
    scanLine.className = 'scan-line';
    document.body.appendChild(scanLine);
    
    // Random particle bursts
    setInterval(() => {
        if (Math.random() > 0.7) {
            createRandomParticleBurst();
        }
    }, 5000);
}

/**
 * Create random particle burst effect
 */
function createRandomParticleBurst() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;
    
    const burstCount = 3;
    for (let i = 0; i < burstCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle hacker-particle burst-particle';
        particle.textContent = ['💥', '⚡', '🌟'][Math.floor(Math.random() * 3)];
        
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        
        Object.assign(particle.style, {
            position: 'fixed',
            left: `${startX}%`,
            top: `${startY}%`,
            fontSize: '20px',
            animation: `burstFloat 2s ease-out forwards`
        });
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 2000);
    }
}

/**
 * Initialize leaderboard widget interactions
 */
function initLeaderboardWidget() {
    const leaderItems = document.querySelectorAll('.leader-item');
    
    leaderItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            // Add click effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Show team details
            const teamName = this.querySelector('.leader-name').textContent;
            console.log(`Clicked on: ${teamName}`);
        });
        
        // Add continuous animation for top 3
        if (index < 3) {
            item.style.animationDelay = `${index * 0.2}s`;
        }
    });
}

// Вспомогательные функции
function initPageBackground() {
    // Добавляем класс к body в зависимости от страницы
    const path = window.location.pathname;
    if (path.includes('/category/pwn')) {
        document.body.classList.add('body-pwn');
    } else if (path.includes('/category/web')) {
        document.body.classList.add('body-web');
    } else if (path.includes('/category/crypto')) {
        document.body.classList.add('body-crypto');
    } else if (path.includes('/auth')) {
        document.body.classList.add('body-auth');
    }
}

function initLogoClick() {
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    }
}

// Initialize additional leaderboard functionality
function initAdditionalLeaderboardFeatures() {
    const leaderboardWidget = document.querySelector('.leaderboard-widget');
    const leaderboardContent = document.querySelector('.leaderboard-content');
    
    if (leaderboardWidget && leaderboardContent) {
        // Блокировка прокрутки страницы при наведении на лидерборд
        leaderboardWidget.addEventListener('mouseenter', function() {
            document.body.style.overflow = 'hidden';
        });
        
        leaderboardWidget.addEventListener('mouseleave', function() {
            document.body.style.overflow = '';
        });
        
        // Для мобильных устройств
        leaderboardWidget.addEventListener('touchstart', function(e) {
            document.body.style.overflow = 'hidden';
        });
        
        leaderboardWidget.addEventListener('touchend', function() {
            setTimeout(() => {
                document.body.style.overflow = '';
            }, 100);
        });
        
        // Индикатор прокрутки
        function updateScrollIndicator() {
            if (leaderboardContent.scrollHeight > leaderboardContent.clientHeight) {
                leaderboardContent.classList.add('scrollable');
            } else {
                leaderboardContent.classList.remove('scrollable');
            }
        }
        
        leaderboardContent.addEventListener('scroll', updateScrollIndicator);
        updateScrollIndicator();
    }
    
    // Дополнительная блокировка через JavaScript
    
    const leaderboardContentElement = document.querySelector('.leaderboard-content');
    
    if (leaderboardContentElement) {
        // Предотвращаем прокрутку страницы когда скроллим лидерборд
        leaderboardContentElement.addEventListener('wheel', function(e) {
            e.stopPropagation();
        });
        
        // Для тач-устройств
        leaderboardContentElement.addEventListener('touchmove', function(e) {
            e.stopPropagation();
        });
    }

    // Дополнительная блокировка прокрутки страницы
    const leaderboardWidget = document.querySelector('.leaderboard-widget');
    
    if (leaderboardWidget) {
        // Глобальная блокировка wheel событий на виджете
        leaderboardWidget.addEventListener('wheel', function(e) {
            e.stopPropagation();
        }, { passive: false });
        
        // Глобальная блокировка touch событий на виджете
        leaderboardWidget.addEventListener('touchmove', function(e) {
            e.stopPropagation();
        }, { passive: false });
        
        // Предотвращаем скролл страницы при использовании клавиш PageUp/PageDown/Space внутри виджета
        leaderboardWidget.addEventListener('keydown', function(e) {
            if ([32, 33, 34, 35, 36, 38, 40].includes(e.keyCode)) {
                e.stopPropagation();
            }
        });
    }
}

// Initialize additional features after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initAdditionalLeaderboardFeatures();
});

// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializePlatform,
        createParticles,
        initCategoryCards,
        initButtons,
        initTerminal,
        initParallax,
        initSmoothScroll,
        initActiveNavigation,
        initLeaderboardToggle,
        generateFullLeaderboard,
        initScrollLock
    };
}