document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // CUSTOM CURSOR TRACKING
    // ==========================================
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.custom-cursor-follower');
    
    if (cursor && follower) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            // Follower lag animation
            setTimeout(() => {
                follower.style.left = e.clientX + 'px';
                follower.style.top = e.clientY + 'px';
            }, 50);
        });

        // Hover scale effects
        const interactiveElements = document.querySelectorAll('a, button, .india-state, .program-card, .donation-amt-btn');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(2)';
                cursor.style.backgroundColor = 'var(--secondary-color)';
                follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
                follower.style.borderColor = 'var(--secondary-color)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.backgroundColor = 'var(--primary-color)';
                follower.style.transform = 'translate(-50%, -50%) scale(1)';
                follower.style.borderColor = 'var(--primary-color)';
            });
        });
    }

    // ==========================================
    // SCROLL PROGRESS & HEADER COLOR SHIFT
    // ==========================================
    const progressBar = document.querySelector('.scroll-progress');
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        if (progressBar) progressBar.style.width = scrolled + '%';
        
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

    // ==========================================
    // THEME SWITCHER (LIGHT/DARK)
    // ==========================================
    const themeSwitch = document.querySelector('.theme-switch');
    if (themeSwitch) {
        // Init
        const currentTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);
        
        themeSwitch.addEventListener('click', () => {
            const nowTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', nowTheme);
            localStorage.setItem('theme', nowTheme);
        });
    }

    // ==========================================
    // ANIMATED IMPACT COUNTERS
    // ==========================================
    const counters = document.querySelectorAll('.counter-number');
    
    const startCounter = (el) => {
        const target = parseFloat(el.getAttribute('data-target'));
        const isDecimal = target % 1 !== 0;
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 2000; // ms
        const stepTime = 15;
        const steps = duration / stepTime;
        const increment = target / steps;
        
        let current = 0;
        let count = 0;
        
        const timer = setInterval(() => {
            current += increment;
            count++;
            
            if (count >= steps) {
                clearInterval(timer);
                el.innerText = target.toLocaleString('en-US', { minimumFractionDigits: isDecimal ? 1 : 0 }) + suffix;
            } else {
                el.innerText = current.toLocaleString('en-US', { maximumFractionDigits: isDecimal ? 1 : 0 }) + suffix;
            }
        }, stepTime);
    };

    // ==========================================
    // ELEMENT INTERSECTION ANIMATION (Linear GSAP-like)
    // ==========================================
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Trigger transition
                entry.target.classList.add('animate-in');
                
                // If it's a counter, count up
                if (entry.target.classList.contains('counter-number')) {
                    startCounter(entry.target);
                    animationObserver.unobserve(entry.target); // Count once
                }
            }
        });
    }, { threshold: 0.15 });

    // CSS styling injector for linear scroll reveals
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
        .reveal-up {
            opacity: 0;
            transform: translateY(40px);
            transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-up.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        .reveal-scale {
            opacity: 0;
            transform: scale(0.95);
            transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-scale.animate-in {
            opacity: 1;
            transform: scale(1);
        }
        .delay-1 { transition-delay: 0.1s; }
        .delay-2 { transition-delay: 0.2s; }
        .delay-3 { transition-delay: 0.3s; }
    `;
    document.head.appendChild(styleTag);

    // Apply scroll reveals
    document.querySelectorAll('.reveal-up, .reveal-scale, .counter-number').forEach(el => {
        animationObserver.observe(el);
    });

    // ==========================================
    // INTERACTIVE INDIA MAP DATA
    // ==========================================
    const stateData = {
        'KA': { name: 'Karnataka', schools: '2,450+', teachers: '14,200+', students: '1.1M+', labs: '2,100+' },
        'MH': { name: 'Maharashtra', schools: '950+', teachers: '5,600+', students: '380K+', labs: '820+' },
        'TN': { name: 'Tamil Nadu', schools: '740+', teachers: '4,100+', students: '290K+', labs: '650+' },
        'AP': { name: 'Andhra Pradesh', schools: '480+', teachers: '2,900+', students: '180K+', labs: '420+' },
        'TG': { name: 'Telangana', schools: '360+', teachers: '2,100+', students: '140K+', labs: '310+' },
        'MP': { name: 'Madhya Pradesh', schools: '220+', teachers: '1,300+', students: '90K+', labs: '180+' },
        'RJ': { name: 'Rajasthan', schools: '180+', teachers: '950+', students: '75K+', labs: '120+' },
        'UP': { name: 'Uttar Pradesh', schools: '150+', teachers: '820+', students: '60K+', labs: '95+' },
        'JK': { name: 'Jammu & Kashmir', schools: '180+', teachers: '920+', students: '45K+', labs: '120+' },
        'BR': { name: 'Bihar', schools: '270+', teachers: '1,400+', students: '98K+', labs: '190+' },
        'WB': { name: 'West Bengal', schools: '160+', teachers: '820+', students: '55K+', labs: '110+' },
        'OR': { name: 'Odisha', schools: '390+', teachers: '2,300+', students: '140K+', labs: '310+' },
        'NL': { name: 'Nagaland', schools: '85+', teachers: '420+', students: '15K+', labs: '35+' }
    };

    const mapStates = document.querySelectorAll('.india-state');
    const stateNameEl = document.getElementById('selected-state-name');
    const schoolValEl = document.getElementById('state-schools');
    const teacherValEl = document.getElementById('state-teachers');
    const studentValEl = document.getElementById('state-students');
    const labValEl = document.getElementById('state-labs');

    const updateStateDetails = (stateCode) => {
        const data = stateData[stateCode] || { name: 'Select a State', schools: '-', teachers: '-', students: '-', labs: '-' };
        
        if (stateNameEl) stateNameEl.innerText = data.name;
        if (schoolValEl) schoolValEl.innerText = data.schools;
        if (teacherValEl) teacherValEl.innerText = data.teachers;
        if (studentValEl) studentValEl.innerText = data.students;
        if (labValEl) labValEl.innerText = data.labs;
    };

    mapStates.forEach(state => {
        state.addEventListener('mouseenter', function() {
            const code = this.getAttribute('data-state-code');
            if (!stateData[code]) return; // Skip inactive/white states
            mapStates.forEach(s => s.classList.remove('active-state'));
            this.classList.add('active-state');
            updateStateDetails(code);
        });
        
        state.addEventListener('click', function() {
            const code = this.getAttribute('data-state-code');
            if (!stateData[code]) return; // Skip inactive/white states
            updateStateDetails(code);
        });
    });

    // ==========================================
    // STATISTICS CHARTS RENDERING (SVG/HTML based)
    // ==========================================
    // Bar heights loading triggers dynamically
    const barFills = document.querySelectorAll('.bar-fill');
    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetHeight = entry.target.getAttribute('data-height');
                entry.target.style.height = targetHeight + '%';
                barObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    barFills.forEach(bar => {
        barObserver.observe(bar);
    });

    // Custom SVG Pie Chart Draw
    const pieSvg = document.getElementById('budget-pie-svg');
    if (pieSvg) {
        const segments = [85, 10, 5]; // Program, Fund, Admin
        const colors = ['#0B5FFF', '#00C389', '#FFD54F'];
        let accumulatedPercent = 0;
        
        segments.forEach((percent, idx) => {
            const startAngle = (accumulatedPercent / 100) * 360;
            const endAngle = ((accumulatedPercent + percent) / 100) * 360;
            accumulatedPercent += percent;
            
            // Convert to radians
            const radStart = (startAngle - 90) * Math.PI / 180;
            const radEnd = (endAngle - 90) * Math.PI / 180;
            
            // Circle center and radius
            const cx = 100, cy = 100, r = 70;
            
            const x1 = cx + r * Math.cos(radStart);
            const y1 = cy + r * Math.sin(radStart);
            const x2 = cx + r * Math.cos(radEnd);
            const y2 = cy + r * Math.sin(radEnd);
            
            const largeArcFlag = percent > 50 ? 1 : 0;
            
            const pathData = `
                M ${cx} ${cy}
                L ${x1} ${y1}
                A ${r} ${r} 0 ${largeArcFlag} 1 ${x2} ${y2}
                Z
            `;
            
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', pathData);
            path.setAttribute('fill', colors[idx]);
            path.setAttribute('stroke', '#FFFFFF');
            path.setAttribute('stroke-width', '2');
            path.style.transition = 'all 0.3s ease';
            
            path.addEventListener('mouseenter', () => {
                path.setAttribute('transform', 'scale(1.03)');
                path.style.transformOrigin = 'center';
            });
            path.addEventListener('mouseleave', () => {
                path.setAttribute('transform', 'scale(1)');
            });
            
            pieSvg.appendChild(path);
        });
    }

    // ==========================================
    // STORIES SLIDER NAVIGATION
    // ==========================================
    const storyTrack = document.querySelector('.story-track');
    const storySlides = document.querySelectorAll('.story-slide');
    const prevBtn = document.getElementById('story-prev');
    const nextBtn = document.getElementById('story-next');
    
    if (storyTrack && storySlides.length > 0) {
        let activeIdx = 0;
        const totalSlides = storySlides.length;
        
        const updateSlider = () => {
            storyTrack.style.transform = `translateX(-${activeIdx * (100 / totalSlides)}%)`;
        };
        
        nextBtn.addEventListener('click', () => {
            activeIdx = (activeIdx + 1) % totalSlides;
            updateSlider();
        });
        
        prevBtn.addEventListener('click', () => {
            activeIdx = (activeIdx - 1 + totalSlides) % totalSlides;
            updateSlider();
        });
    }

    // ==========================================
    // MASONRY GALLERY & LIGHTBOX
    // ==========================================
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.querySelector('.lightbox-modal');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    
    if (galleryItems.length > 0 && lightbox && lightboxImg) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const src = item.querySelector('img').getAttribute('src');
                lightboxImg.setAttribute('src', src);
                lightbox.style.display = 'flex';
            });
        });
        
        lightboxClose.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
            }
        });
    }

    // ==========================================
    // DONATE SELECTION FORM INTERACTIONS
    // ==========================================
    const amountBtns = document.querySelectorAll('.donation-amt-btn');
    const customAmtInput = document.querySelector('.donation-custom-input');
    const paymentMethods = document.querySelectorAll('.payment-method-card');
    
    if (amountBtns.length > 0 && customAmtInput) {
        amountBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                amountBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const amt = btn.getAttribute('data-value');
                customAmtInput.value = amt;
            });
        });
        
        customAmtInput.addEventListener('input', () => {
            amountBtns.forEach(b => b.classList.remove('active'));
        });
    }
    
    if (paymentMethods.length > 0) {
        paymentMethods.forEach(method => {
            method.addEventListener('click', () => {
                paymentMethods.forEach(m => m.classList.remove('active'));
                method.classList.add('active');
            });
        });
    }

    // ==========================================
    // MOBILE DRAWER TOGGLE
    // ==========================================
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
            // Setup full drawer toggle styling
            if (navMenu.style.display === 'flex') {
                navMenu.style.position = 'fixed';
                navMenu.style.top = '80px';
                navMenu.style.left = '0';
                navMenu.style.width = '100%';
                navMenu.style.height = 'calc(100vh - 80px)';
                navMenu.style.backgroundColor = 'var(--bg-color)';
                navMenu.style.flexDirection = 'column';
                navMenu.style.padding = '3rem 2rem';
                navMenu.style.gap = '2rem';
                navMenu.style.zIndex = '999';
            } else {
                navMenu.style.position = 'static';
                navMenu.style.width = 'auto';
                navMenu.style.height = 'auto';
                navMenu.style.padding = '0';
            }
        });
    }
});
