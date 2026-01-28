// DSO Core Observatory - Shared Navigation Component
// Inject this into all pages for consistent navigation

const DSO_NAV = {
    currentPage: '',

    menuStructure: {
        observatory: {
            label: 'Observatory',
            icon: '&#127757;',
            items: [
                { id: 'realtime', label: 'Real-Time Dashboard', href: 'realtime_dashboard.html', icon: '&#128200;' },
                { id: 'home', label: 'Home Analyzer', href: 'dso_home_analyzer.html', icon: '&#127968;' },
                { id: 'mechanics', label: 'Core Mechanics', href: 'dso_core_mechanics.html', icon: '&#9881;' },
                { id: 'signal', label: 'Signal Detection', href: 'dso_signal_detection.html', icon: '&#128225;' },
                { id: 'simulation', label: 'Simulation Lab', href: 'dso_simulation.html', icon: '&#128300;' },
                { id: 'interior', label: 'Interior Structure', href: 'dso_interior.html', icon: '&#127755;' }
            ]
        },
        operations: {
            label: 'Operations',
            icon: '&#128202;',
            items: [
                { id: 'forecast', label: 'Forecasting Reports', href: 'dso_forecasting.html', icon: '&#9888;' },
                { id: 'testing', label: 'Prospective Testing', href: 'dso_testing.html', icon: '&#128300;' },
                { id: 'uncertainty', label: 'Uncertainty Quantification', href: 'dso_uncertainty.html', icon: '&#128202;' },
                { id: 'verification', label: 'Verification Archives', href: 'dso_verification.html', icon: '&#128203;' },
                { id: 'graphics', label: 'Communication Graphics', href: 'dso_graphics.html', icon: '&#127912;' }
            ]
        },
        theory: {
            label: 'Theory & Methods',
            icon: '&#128218;',
            items: [
                { id: 'whitepaper', label: 'Model Whitepaper', href: 'dso_whitepaper.html', icon: '&#128196;' },
                { id: 'physics', label: 'Physical Basis', href: 'dso_physics.html', icon: '&#9883;' },
                { id: 'drag-scale', label: 'Drag & Scale Framework', href: 'dso_drag_scale_framework.html', icon: '&#9889;' },
                { id: 'drag-scale-expanded', label: 'Framework (Expanded)', href: 'dso_drag_scale_expanded.html', icon: '&#128218;' },
                { id: 'ethics', label: 'Ethics & Risk Mitigation', href: 'dso_ethics.html', icon: '&#9878;' }
            ]
        }
    },

    init(currentPageId) {
        this.currentPage = currentPageId;
        this.injectStyles();
        this.injectNav();
        this.setupEventListeners();
    },

    injectStyles() {
        const styles = document.createElement('style');
        styles.textContent = `
            /* Navigation Styles */
            .dso-nav {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                height: 60px;
                background: linear-gradient(135deg, #1a1a3a 0%, #0a0a1a 100%);
                border-bottom: 1px solid #334;
                display: flex;
                align-items: center;
                padding: 0 20px;
                z-index: 1000;
                gap: 20px;
            }

            .dso-nav-logo {
                display: flex;
                align-items: center;
                gap: 12px;
                text-decoration: none;
                color: inherit;
            }

            .dso-nav-logo-icon {
                width: 40px;
                height: 40px;
                background: linear-gradient(135deg, #f4d03f, #e67e22);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 20px;
                box-shadow: 0 0 15px rgba(244, 208, 63, 0.3);
            }

            .dso-nav-title {
                font-size: 1.2em;
                font-weight: 700;
                color: #7cb3ff;
            }

            .dso-nav-menu {
                display: flex;
                gap: 5px;
                flex: 1;
            }

            .dso-nav-dropdown {
                position: relative;
            }

            .dso-nav-dropdown-btn {
                background: transparent;
                border: 1px solid transparent;
                color: #e0e0e0;
                padding: 10px 16px;
                border-radius: 6px;
                cursor: pointer;
                font-size: 0.9em;
                display: flex;
                align-items: center;
                gap: 8px;
                transition: all 0.2s;
            }

            .dso-nav-dropdown-btn:hover {
                background: rgba(124, 179, 255, 0.1);
                border-color: #334;
            }

            .dso-nav-dropdown-btn .icon {
                font-size: 1.1em;
            }

            .dso-nav-dropdown-btn .arrow {
                font-size: 0.7em;
                transition: transform 0.2s;
            }

            .dso-nav-dropdown.open .dso-nav-dropdown-btn .arrow {
                transform: rotate(180deg);
            }

            .dso-nav-dropdown-content {
                position: absolute;
                top: 100%;
                left: 0;
                min-width: 220px;
                background: #1a1a3a;
                border: 1px solid #334;
                border-radius: 8px;
                padding: 8px;
                display: none;
                box-shadow: 0 10px 40px rgba(0,0,0,0.5);
                z-index: 1001;
            }

            .dso-nav-dropdown.open .dso-nav-dropdown-content {
                display: block;
            }

            .dso-nav-item {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 10px 12px;
                color: #e0e0e0;
                text-decoration: none;
                border-radius: 6px;
                transition: all 0.2s;
                font-size: 0.9em;
            }

            .dso-nav-item:hover {
                background: rgba(124, 179, 255, 0.15);
                color: #7cb3ff;
            }

            .dso-nav-item.active {
                background: rgba(124, 179, 255, 0.2);
                color: #7cb3ff;
                font-weight: 600;
            }

            .dso-nav-item .item-icon {
                width: 24px;
                text-align: center;
            }

            .dso-nav-status {
                display: flex;
                align-items: center;
                gap: 15px;
            }

            .dso-nav-next-update {
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 6px 12px;
                background: rgba(124, 179, 255, 0.1);
                border: 1px solid rgba(124, 179, 255, 0.3);
                border-radius: 6px;
                font-size: 0.8em;
            }

            .dso-nav-next-update-label {
                color: #889;
            }

            .dso-nav-next-update-value {
                color: #7cb3ff;
                font-weight: 600;
            }

            .dso-nav-status-badge {
                background: linear-gradient(135deg, #2ecc71, #27ae60);
                color: #fff;
                padding: 5px 12px;
                border-radius: 15px;
                font-size: 0.75em;
                font-weight: 600;
                display: flex;
                align-items: center;
                gap: 5px;
            }

            .dso-nav-status-dot {
                width: 6px;
                height: 6px;
                background: #fff;
                border-radius: 50%;
                animation: dso-pulse 1.5s infinite;
            }

            @keyframes dso-pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.4; }
            }

            /* Adjust body for fixed nav */
            body.dso-has-nav {
                padding-top: 60px;
            }

            /* Mobile responsive */
            @media (max-width: 900px) {
                .dso-nav-title {
                    display: none;
                }
                .dso-nav-dropdown-btn span:not(.icon):not(.arrow) {
                    display: none;
                }
            }
        `;
        document.head.appendChild(styles);
    },

    injectNav() {
        const nav = document.createElement('nav');
        nav.className = 'dso-nav';

        let menuHTML = `
            <a href="realtime_dashboard.html" class="dso-nav-logo">
                <div class="dso-nav-logo-icon">&#127757;</div>
                <span class="dso-nav-title">DSO Core Observatory</span>
            </a>
            <div class="dso-nav-menu">
        `;

        for (const [key, section] of Object.entries(this.menuStructure)) {
            menuHTML += `
                <div class="dso-nav-dropdown" data-menu="${key}">
                    <button class="dso-nav-dropdown-btn">
                        <span class="icon">${section.icon}</span>
                        <span>${section.label}</span>
                        <span class="arrow">&#9660;</span>
                    </button>
                    <div class="dso-nav-dropdown-content">
            `;

            for (const item of section.items) {
                const isActive = item.id === this.currentPage ? 'active' : '';
                menuHTML += `
                    <a href="${item.href}" class="dso-nav-item ${isActive}">
                        <span class="item-icon">${item.icon}</span>
                        <span>${item.label}</span>
                    </a>
                `;
            }

            menuHTML += `
                    </div>
                </div>
            `;
        }

        menuHTML += `
            </div>
            <div class="dso-nav-status">
                <div class="dso-nav-next-update">
                    <span class="dso-nav-next-update-label">Next Update:</span>
                    <span class="dso-nav-next-update-value" id="dso-next-update-timer">--:--</span>
                </div>
                <div class="dso-nav-status-badge">
                    <div class="dso-nav-status-dot"></div>
                    <span>LIVE</span>
                </div>
            </div>
        `;

        nav.innerHTML = menuHTML;
        document.body.insertBefore(nav, document.body.firstChild);
        document.body.classList.add('dso-has-nav');
    },

    setupEventListeners() {
        // Dropdown toggle
        document.querySelectorAll('.dso-nav-dropdown-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const dropdown = btn.closest('.dso-nav-dropdown');
                const isOpen = dropdown.classList.contains('open');

                // Close all dropdowns
                document.querySelectorAll('.dso-nav-dropdown').forEach(d => d.classList.remove('open'));

                // Toggle current
                if (!isOpen) {
                    dropdown.classList.add('open');
                }
            });
        });

        // Close on click outside
        document.addEventListener('click', () => {
            document.querySelectorAll('.dso-nav-dropdown').forEach(d => d.classList.remove('open'));
        });

        // Prevent close when clicking inside dropdown
        document.querySelectorAll('.dso-nav-dropdown-content').forEach(content => {
            content.addEventListener('click', (e) => e.stopPropagation());
        });

        // Start update timer
        this.startUpdateTimer();
    },

    startUpdateTimer() {
        // Calculate next update time (every 5 minutes on the clock)
        const updateInterval = 5 * 60 * 1000; // 5 minutes in ms

        const updateTimer = () => {
            const now = new Date();
            const minutes = now.getMinutes();
            const seconds = now.getSeconds();

            // Calculate time until next 5-minute mark
            const nextUpdateMinute = Math.ceil(minutes / 5) * 5;
            const minutesRemaining = nextUpdateMinute - minutes - (seconds > 0 ? 1 : 0);
            const secondsRemaining = seconds > 0 ? 60 - seconds : 0;

            const timerElement = document.getElementById('dso-next-update-timer');
            if (timerElement) {
                const mins = minutesRemaining < 0 ? 4 : minutesRemaining;
                timerElement.textContent = `${mins}:${String(secondsRemaining).padStart(2, '0')}`;
            }
        };

        updateTimer();
        setInterval(updateTimer, 1000);
    }
};

// Auto-init if data attribute present
document.addEventListener('DOMContentLoaded', () => {
    const pageId = document.body.dataset.dsoPage;
    if (pageId) {
        DSO_NAV.init(pageId);
    }
});
