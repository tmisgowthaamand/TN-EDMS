import React, { useState, useEffect } from 'react';

export default function App() {
  // Theme state: light or dark
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('tnedms_theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('tnedms_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Navigation View State: 'home', 'privacy', 'terms'
  const [currentView, setCurrentView] = useState('home');
  const [activeScrollSection, setActiveScrollSection] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Router switch with MANDATORY scroll-to-top handler
  const navigateTo = (view, sectionId = null) => {
    setCurrentView(view);
    setActiveScrollSection(sectionId);
    setMobileMenuOpen(false);

    // Automatic Scroll-to-Top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    if (view === 'home' && sectionId) {
      setTimeout(() => {
        const targetElement = document.getElementById(sectionId);
        if (targetElement) {
          const headerHeight = document.getElementById('siteHeader')?.offsetHeight || 72;
          const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: elementPosition - headerHeight,
            behavior: 'smooth'
          });
        }
      }, 150);
    }
  };

  // Live Countdown Timer logic
  const [timeLeft, setTimeLeft] = useState({ days: '00', hours: '00', mins: '00', secs: '00' });

  useEffect(() => {
    const targetDate = new Date('October 15, 2026 07:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({
          days: days < 10 ? '0' + days : String(days),
          hours: hours < 10 ? '0' + hours : String(hours),
          mins: minutes < 10 ? '0' + minutes : String(minutes),
          secs: seconds < 10 ? '0' + seconds : String(seconds)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // About section tab state
  const [activeTab, setActiveTab] = useState('tab-urban');

  // Ward Finder state
  const [district, setDistrict] = useState('');
  const [bodyType, setBodyType] = useState('Corporation');
  const [wardNo, setWardNo] = useState('');
  const [wardResult, setWardResult] = useState(null);

  const handleWardSearch = (e) => {
    e.preventDefault();
    if (!district || !wardNo) return;

    setWardResult({
      district,
      bodyType,
      wardNo,
      officer: `District Election Officer & Returning Officer, ${district}`,
      zone: `Administrative Zone (Ward ${wardNo})`,
      boothPrimary: `${district} Government Higher Secondary School, Ward ${wardNo}`,
      boothAux: `${district} Town Community Centre, Booth 2`,
      votersTotal: (15000 + parseInt(wardNo || '1') * 120).toLocaleString(),
      maleVoters: (7400 + parseInt(wardNo || '1') * 60).toLocaleString(),
      femaleVoters: (7590 + parseInt(wardNo || '1') * 60).toLocaleString(),
      helpline: '1950 (Toll Free)'
    });
  };

  // Accordion FAQ state
  const [activeFaq, setActiveFaq] = useState(0);

  // Modals state
  const [voterModalOpen, setVoterModalOpen] = useState(false);
  const [nomineeModalOpen, setNomineeModalOpen] = useState(false);
  const [complaintModalOpen, setComplaintModalOpen] = useState(false);

  const [epicInput, setEpicInput] = useState('');
  const [voterSearchSuccess, setVoterSearchSuccess] = useState(false);

  const [compDistrict, setCompDistrict] = useState('Chennai');
  const [compDetails, setCompDetails] = useState('');
  const [complaintTicket, setComplaintTicket] = useState(null);

  const handleVoterSearch = (e) => {
    e.preventDefault();
    setVoterSearchSuccess(true);
  };

  const handleComplaintSubmit = (e) => {
    e.preventDefault();
    setComplaintTicket(`TNSEC-2026-${Math.floor(100000 + Math.random() * 900000)}`);
  };

  return (
    <div className="app-root">
      {/* Top Announcement Bar */}
      <div className="top-bar" id="topBar">
        <div className="container top-bar-content">
          <div className="top-bar-left">
            <span className="badge-pulse"></span>
            <span className="top-text">
              <strong>NOTICE:</strong> Preparatory Delimitation & Voter Roll Revision active for <strong>Local Body Elections</strong>
            </span>
          </div>
          <div className="top-bar-right">
            <span className="helpline-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Helpline: <strong>1950</strong> (Toll Free)
            </span>
            <div className="lang-switch">
              <button className="lang-btn active">EN</button>
              <span className="divider">|</span>
              <button className="lang-btn">தமிழ்</button>
            </div>
          </div>
        </div>
      </div>

      {/* Header Navigation Bar */}
      <header className="site-header" id="siteHeader">
        <div className="container header-container">
          {/* Brand Logo */}
          <div className="brand-logo" onClick={() => navigateTo('home')}>
            <div className="logo-emblem">
              <svg width="34" height="34" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="18" fill="url(#logo-grad)" stroke="#FFD700" strokeWidth="1.5"/>
                <path d="M12 21L17 26L28 14" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
                <defs>
                  <linearGradient id="logo-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#0F2C59"/>
                    <stop offset="1" stopColor="#1E56A0"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="logo-text">
              <span className="brand-title">TN EDMS</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className={`main-nav ${mobileMenuOpen ? 'active' : ''}`} id="mainNav">
            <span className={`nav-link ${currentView === 'home' && !activeScrollSection ? 'active' : ''}`} onClick={() => navigateTo('home')}>Home</span>
            <span className={`nav-link ${activeScrollSection === 'about' ? 'active' : ''}`} onClick={() => navigateTo('home', 'about')}>About Elections</span>
            <span className={`nav-link ${activeScrollSection === 'services' ? 'active' : ''}`} onClick={() => navigateTo('home', 'services')}>Services</span>
            <span className={`nav-link ${activeScrollSection === 'ward-finder' ? 'active' : ''}`} onClick={() => navigateTo('home', 'ward-finder')}>Ward Finder</span>
            <span className={`nav-link ${activeScrollSection === 'schedule' ? 'active' : ''}`} onClick={() => navigateTo('home', 'schedule')}>Schedule</span>
            <span className={`nav-link ${activeScrollSection === 'faq' ? 'active' : ''}`} onClick={() => navigateTo('home', 'faq')}>Voter FAQ</span>
          </nav>

          {/* Actions */}
          <div className="header-actions">
            <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle Theme">
              {theme === 'light' ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
              )}
            </button>

            <button className="btn btn-primary nav-cta-btn" onClick={() => setVoterModalOpen(true)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              <span>Search Voter Status</span>
            </button>

            <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* VIEW: HOME PAGE */}
      {currentView === 'home' && (
        <main id="home-view">
          {/* Hero Section */}
          <section className="hero-section" id="home">
            <div className="hero-bg-overlay"></div>
            <div className="container hero-container">
              <div className="hero-grid">
                <div className="hero-content">
                  <div className="hero-badge">
                    <span className="badge-icon">🏛️</span>
                    <span>OFFICIAL ELECTION PORTAL</span>
                  </div>

                  <h1 className="hero-title">
                    Empowering Civic Democracy Across <span className="text-highlight">Tamil Nadu</span> Local Bodies
                  </h1>

                  <p className="hero-subtitle">
                    The official <strong>TN EDMS</strong> platform provides real-time voter verification, ward boundary maps, candidate filings, and polling station tracking for the upcoming <strong>Rural & Urban Local Body Elections</strong>.
                  </p>

                  {/* Countdown Card */}
                  <div className="countdown-card">
                    <div className="countdown-header">
                      <span className="countdown-title">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> 
                        COUNTDOWN TO LOCAL BODY ELECTION DAY 2026
                      </span>
                      <span className="countdown-target">Est. October 15, 2026</span>
                    </div>
                    <div className="countdown-grid">
                      <div className="countdown-box">
                        <span className="count-number">{timeLeft.days}</span>
                        <span className="count-label">Days</span>
                      </div>
                      <div className="countdown-colon">:</div>
                      <div className="countdown-box">
                        <span className="count-number">{timeLeft.hours}</span>
                        <span className="count-label">Hours</span>
                      </div>
                      <div className="countdown-colon">:</div>
                      <div className="countdown-box">
                        <span className="count-number">{timeLeft.mins}</span>
                        <span className="count-label">Minutes</span>
                      </div>
                      <div className="countdown-colon">:</div>
                      <div className="countdown-box">
                        <span className="count-number">{timeLeft.secs}</span>
                        <span className="count-label">Seconds</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="hero-actions">
                    <button className="btn btn-gold" onClick={() => navigateTo('home', 'ward-finder')}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                      <span>Find Your Ward & Booth</span>
                    </button>
                    <button className="btn btn-outline-light" onClick={() => setNomineeModalOpen(true)}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
                      <span>Candidate Portal</span>
                    </button>
                  </div>
                </div>

                {/* Hero Visual Card */}
                <div className="hero-visual">
                  <div className="glass-card hero-metrics-card">
                    <div className="card-badge">STATEWIDE ELECTION SCOPE</div>
                    <h3 className="metrics-card-title">Civic Governance Infrastructure</h3>
                    
                    <div className="stat-items-grid">
                      <div className="stat-item">
                        <div className="stat-icon-wrap icon-navy">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-3"/><path d="M9 9v.01"/><path d="M9 12v.01"/><path d="M9 15v.01"/><path d="M9 18v.01"/></svg>
                        </div>
                        <div className="stat-info">
                          <span className="stat-value">21</span>
                          <span className="stat-desc">Municipal Corporations</span>
                        </div>
                      </div>

                      <div className="stat-item">
                        <div className="stat-icon-wrap icon-gold">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                        </div>
                        <div className="stat-info">
                          <span className="stat-value">138</span>
                          <span className="stat-desc">Municipalities</span>
                        </div>
                      </div>

                      <div className="stat-item">
                        <div className="stat-icon-wrap icon-emerald">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                        </div>
                        <div className="stat-info">
                          <span className="stat-value">489</span>
                          <span className="stat-desc">Town Panchayats</span>
                        </div>
                      </div>

                      <div className="stat-item">
                        <div className="stat-icon-wrap icon-blue">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                        </div>
                        <div className="stat-info">
                          <span className="stat-value">12,525</span>
                          <span className="stat-desc">Village Panchayats</span>
                        </div>
                      </div>
                    </div>

                    <div className="hero-security-footer">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                      <span>Verified Official Portal</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section className="section about-section" id="about">
            <div className="container">
              <div className="section-header text-center">
                <span className="section-tag">DIGITAL GOVERNANCE INITIATIVE</span>
                <h2 className="section-title">About Local Body Elections</h2>
                <div className="section-line"></div>
                <p className="section-lead">
                  The TN EDMS platform is an end-to-end digital infrastructure developed to manage ward delimitation, voter roll sync, candidate nominations, and polling day monitoring.
                </p>
              </div>

              {/* Tabs */}
              <div className="about-tabs-wrap">
                <div className="tab-buttons">
                  <button className={`tab-btn ${activeTab === 'tab-urban' ? 'active' : ''}`} onClick={() => setActiveTab('tab-urban')}>Urban Local Bodies</button>
                  <button className={`tab-btn ${activeTab === 'tab-rural' ? 'active' : ''}`} onClick={() => setActiveTab('tab-rural')}>Rural Local Bodies</button>
                  <button className={`tab-btn ${activeTab === 'tab-tech' ? 'active' : ''}`} onClick={() => setActiveTab('tab-tech')}>Electoral Tech & Transparency</button>
                </div>

                {activeTab === 'tab-urban' && (
                  <div className="about-tab-grid">
                    <div className="tab-text">
                      <h3>Urban Local Bodies (Corporations & Municipalities)</h3>
                      <p>Governing 21 Municipal Corporations (including Greater Chennai, Coimbatore, Madurai, Tiruchirappalli, Salem, Tirunelveli, Erode, Vellore, and Thanjavur) and 138 Municipalities.</p>
                      <ul className="feature-checklist">
                        <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg> Direct election of Ward Councillors & Corporation Representatives</li>
                        <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg> 50% Statutory Reservation for Women across all wards</li>
                        <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg> Electronic Voting Machines (EVMs) with Voter Verified Paper Audit Trail (VVPAT)</li>
                      </ul>
                    </div>
                    <div className="tab-stats-box">
                      <div className="mini-stat">
                        <span className="mini-num">1,374+</span>
                        <span className="mini-lbl">Urban Wards</span>
                      </div>
                      <div className="mini-stat">
                        <span className="mini-num">1.84 Cr</span>
                        <span className="mini-lbl">Urban Voters</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'tab-rural' && (
                  <div className="about-tab-grid">
                    <div className="tab-text">
                      <h3>Rural Local Bodies (Panchayat Raj System)</h3>
                      <p>Coverage across 37 District Panchayats, 388 Panchayat Unions, and 12,525 Village Panchayats ensuring grassroot democratic participation.</p>
                      <ul className="feature-checklist">
                        <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg> 4-tier Ballot voting mechanism for Village & Union representatives</li>
                        <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg> Real-time polling booth monitoring & mobile dispatch teams</li>
                      </ul>
                    </div>
                    <div className="tab-stats-box">
                      <div className="mini-stat">
                        <span className="mini-num">91,000+</span>
                        <span className="mini-lbl">Panchayat Wards</span>
                      </div>
                      <div className="mini-stat">
                        <span className="mini-num">2.45 Cr</span>
                        <span className="mini-lbl">Rural Voters</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'tab-tech' && (
                  <div className="about-tab-grid">
                    <div className="tab-text">
                      <h3>TN EDMS Technological Innovations</h3>
                      <p>Built with enterprise security, cloud resilience, and GIS mapping to guarantee zero downtime and tamper-proof election data.</p>
                      <ul className="feature-checklist">
                        <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg> GIS Geo-fencing of all 45,000+ Polling Booths</li>
                        <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg> Biometric & EPIC integrated voter search index</li>
                      </ul>
                    </div>
                    <div className="tab-stats-box">
                      <div className="mini-stat">
                        <span className="mini-num">99.99%</span>
                        <span className="mini-lbl">Uptime SLA</span>
                      </div>
                      <div className="mini-stat">
                        <span className="mini-num">256-bit</span>
                        <span className="mini-lbl">AES Encryption</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="section services-section bg-light-alt" id="services">
            <div className="container">
              <div className="section-header text-center">
                <span className="section-tag">KEY PLATFORM MODULES</span>
                <h2 className="section-title">Digital Citizen & Electoral Services</h2>
                <div className="section-line"></div>
                <p className="section-lead">Explore the suite of tools designed for voters, candidates, and election officials.</p>
              </div>

              <div className="services-grid">
                <div className="service-card">
                  <div className="service-icon icon-blue">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M11 8v6"/><path d="M8 11h6"/></svg>
                  </div>
                  <h3 className="service-title">Voter Electoral Roll Check</h3>
                  <p className="service-text">Instantly verify your registration status, ward assignment, EPIC details, and designated polling station using your EPIC number or name.</p>
                  <button className="service-link" onClick={() => setVoterModalOpen(true)}>Search Voter Slip &rarr;</button>
                </div>

                <div className="service-card">
                  <div className="service-icon icon-gold">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <h3 className="service-title">Geo Polling Station Locator</h3>
                  <p className="service-text">Interactive map integration guiding voters directly to their assigned polling booth location with accessibility indicators for senior citizens.</p>
                  <button className="service-link" onClick={() => navigateTo('home', 'ward-finder')}>Locate Booth on Map &rarr;</button>
                </div>

                <div className="service-card">
                  <div className="service-icon icon-emerald">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                  </div>
                  <h3 className="service-title">Online Nomination Portal</h3>
                  <p className="service-text">Candidates filing for Corporation, Municipality, or Panchayat seats can submit affidavits, pay security deposits, and track nomination status online.</p>
                  <button className="service-link" onClick={() => setNomineeModalOpen(true)}>Nomination Guidelines &rarr;</button>
                </div>

                <div className="service-card">
                  <div className="service-icon icon-red">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                  </div>
                  <h3 className="service-title">MCC Violation Helpline & Grievance</h3>
                  <p class="service-text">Report Model Code of Conduct violations or voting anomalies directly to the Returning Officer with photo/geo-tag evidence.</p>
                  <button className="service-link" onClick={() => setComplaintModalOpen(true)}>Report Incident &rarr;</button>
                </div>
              </div>
            </div>
          </section>

          {/* Ward Finder Section */}
          <section className="section ward-finder-section" id="ward-finder">
            <div className="container">
              <div className="finder-wrapper">
                <div className="finder-header text-center">
                  <span className="badge-gold">REAL-TIME LOOKUP TOOL</span>
                  <h2>Tamil Nadu Local Body Ward & Polling Booth Finder</h2>
                  <p>Select your District and Local Body details to view ward boundaries, officer contacts, and booth information.</p>
                </div>

                <form onSubmit={handleWardSearch} className="finder-form">
                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="districtSelect">District</label>
                      <select id="districtSelect" className="form-control" value={district} onChange={(e) => setDistrict(e.target.value)} required>
                        <option value="">-- Select District --</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Coimbatore">Coimbatore</option>
                        <option value="Madurai">Madurai</option>
                        <option value="Tiruchirappalli">Tiruchirappalli</option>
                        <option value="Salem">Salem</option>
                        <option value="Tirunelveli">Tirunelveli</option>
                        <option value="Erode">Erode</option>
                        <option value="Vellore">Vellore</option>
                        <option value="Thanjavur">Thanjavur</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="bodyTypeSelect">Local Body Type</label>
                      <select id="bodyTypeSelect" className="form-control" value={bodyType} onChange={(e) => setBodyType(e.target.value)} required>
                        <option value="Corporation">Municipal Corporation</option>
                        <option value="Municipality">Municipality</option>
                        <option value="TownPanchayat">Town Panchayat</option>
                        <option value="VillagePanchayat">Village Panchayat</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="wardNoInput">Ward Number</label>
                      <input type="number" id="wardNoInput" className="form-control" placeholder="e.g. 45" min="1" max="200" value={wardNo} onChange={(e) => setWardNo(e.target.value)} required />
                    </div>

                    <div className="form-group form-btn-group">
                      <button type="submit" className="btn btn-primary btn-block">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                        <span>Search Ward Info</span>
                      </button>
                    </div>
                  </div>
                </form>

                {wardResult && (
                  <div className="ward-result-box">
                    <div className="result-header">
                      <span className="badge-gold">VERIFIED ELECTION DATA</span>
                      <h3 className="result-title">{wardResult.district} {wardResult.bodyType} — Ward No. {wardResult.wardNo} Details</h3>
                    </div>
                    <div className="result-card-grid">
                      <div>
                        <h4 style={{ marginBottom: '0.75rem', color: 'var(--royal-blue)' }}>Electoral Administration</h4>
                        <div className="result-list">
                          <div className="result-item"><span>Returning Officer:</span> <strong>{wardResult.officer}</strong></div>
                          <div className="result-item"><span>Administrative Zone:</span> <strong>{wardResult.zone}</strong></div>
                          <div className="result-item"><span>Control Room Helpline:</span> <strong>{wardResult.helpline}</strong></div>
                        </div>
                      </div>
                      <div>
                        <h4 style={{ marginBottom: '0.75rem', color: 'var(--emerald)' }}>Designated Polling Stations</h4>
                        <div className="result-list">
                          <div className="result-item"><span>Primary Booth Location:</span> <strong>{wardResult.boothPrimary}</strong></div>
                          <div className="result-item"><span>Auxiliary Booth:</span> <strong>{wardResult.boothAux}</strong></div>
                          <div className="result-item"><span>Total Ward Voters:</span> <strong>{wardResult.votersTotal} (M: {wardResult.maleVoters} | F: {wardResult.femaleVoters})</strong></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Schedule Section */}
          <section className="section schedule-section" id="schedule">
            <div className="container">
              <div className="section-header text-center">
                <span className="section-tag">ELECTION ROADMAP</span>
                <h2 className="section-title">Official Election Timeline & Schedule</h2>
                <div className="section-line"></div>
                <p className="section-lead">Key notifications and statutory milestones for the Tamil Nadu Local Body Elections.</p>
              </div>

              <div className="timeline-container">
                <div className="timeline-item completed">
                  <div className="timeline-badge">✓</div>
                  <div className="timeline-content">
                    <span className="timeline-date">Completed</span>
                    <h3>Delimitation & Draft Electoral Roll Publication</h3>
                    <p>Publication of draft ward boundary maps and integrated voter list revisions across all districts.</p>
                  </div>
                </div>

                <div className="timeline-item active">
                  <div className="timeline-badge"><span className="pulse-dot"></span></div>
                  <div className="timeline-content">
                    <span className="timeline-date">Current Stage</span>
                    <h3>Final Electoral Roll Verification & Polling Station Finalization</h3>
                    <p>Verification of voter registration claims and geo-tagging of booth locations.</p>
                  </div>
                </div>

                <div className="timeline-item highlight-stage">
                  <div className="timeline-badge ★">★</div>
                  <div className="timeline-content">
                    <span className="timeline-date highlight-text">Target • October 15, 2026</span>
                    <h3>Polling Day (Local Body Elections)</h3>
                    <p>Statewide voting across all Urban & Rural polling stations from 7:00 AM to 6:00 PM.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Accordion Section */}
          <section className="section faq-section bg-light-alt" id="faq">
            <div className="container">
              <div className="section-header text-center">
                <span className="section-tag">HELP & ASSISTANCE</span>
                <h2 className="section-title">Frequently Asked Questions</h2>
                <div className="section-line"></div>
                <p className="section-lead">Find answers to common questions about voting, candidate eligibility, and local body rules.</p>
              </div>

              <div className="faq-accordion-wrap">
                {[
                  {
                    q: 'What documents are valid proof of identity for voting in Local Body Polls?',
                    a: 'Along with the Voter ID Card (EPIC), the Tamil Nadu State Election Commission approves 11 alternative photo ID proofs: Aadhaar Card, MGNREGA Job Card, Passbook with photograph issued by Bank/Post Office, Passport, Driving License, PAN Card, and Official Identity Cards.'
                  },
                  {
                    q: 'How can I find my ward number and designated polling station?',
                    a: 'You can use the interactive Ward Finder Tool on this website by selecting your district and ward number, or click "Search Voter Status" to input your EPIC number.'
                  },
                  {
                    q: 'Where can I report violations of the Model Code of Conduct (MCC)?',
                    a: 'You can report violations by calling the 24/7 Election Control Room Helpline at 1950 (Toll-Free) or by submitting a complaint through the TN EDMS Incident Reporting portal.'
                  }
                ].map((item, idx) => (
                  <div className={`faq-card ${activeFaq === idx ? 'active' : ''}`} key={idx}>
                    <button className="faq-question" onClick={() => setActiveFaq(activeFaq === idx ? -1 : idx)}>
                      <span>{item.q}</span>
                      <svg className="faq-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                    </button>
                    <div className="faq-answer">
                      <p>{item.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      )}

      {/* VIEW: PRIVACY POLICY PAGE */}
      {currentView === 'privacy' && (
        <div id="privacy-view" className="page-view active">
          <div className="legal-page-header">
            <div className="container legal-header-container">
              <button className="btn btn-outline-light back-to-home-btn" onClick={() => navigateTo('home')}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                <span>← Back to Home</span>
              </button>
              <span className="legal-badge">OFFICIAL PRIVACY POLICY</span>
              <h1 className="legal-title">Privacy Policy & Voter Data Protection</h1>
              <p className="legal-meta">Effective Date: October 1, 2026 | Document Ref: TNEDMS-PRIV-2026-V2</p>
            </div>
          </div>

          <div className="container legal-body-container">
            <div className="legal-card">
              <div className="legal-section">
                <h2>1. Overview & Statutory Authority</h2>
                <p>The <strong>TN EDMS</strong> platform is operated in accordance with the Panchayats Act, Municipalities Act, and applicable Information Technology laws of India.</p>
              </div>

              <div className="legal-section">
                <h2>2. Information We Collect</h2>
                <p>TN EDMS collects and processes only data required for statutory electoral administration and citizen identity verification:</p>
                <ul>
                  <li><strong>Public Electoral Roll Information:</strong> Voter Name, EPIC number, relative's name, age, gender, and assigned Ward/Polling Station location.</li>
                  <li><strong>Portal Usage Logs:</strong> IP address, device browser type, and timestamp logs.</li>
                </ul>
              </div>

              <div className="legal-section">
                <h2>3. Data Protection & Security Controls</h2>
                <p>TN EDMS implements state-of-the-art security measures including 256-bit SSL encryption for data in transit, AES-256 encryption at rest, and multi-factor administrative authentication.</p>
              </div>

              <div className="legal-footer-nav">
                <button className="btn btn-primary" onClick={() => navigateTo('home')}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                  <span>← Back to Home Page</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: TERMS OF SERVICE PAGE */}
      {currentView === 'terms' && (
        <div id="terms-view" className="page-view active">
          <div className="legal-page-header">
            <div className="container legal-header-container">
              <button className="btn btn-outline-light back-to-home-btn" onClick={() => navigateTo('home')}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                <span>← Back to Home</span>
              </button>
              <span className="legal-badge">TERMS OF SERVICE</span>
              <h1 className="legal-title">Terms & Conditions of Platform Usage</h1>
              <p className="legal-meta">Effective Date: October 1, 2026 | Document Ref: TNEDMS-TOS-2026-V2</p>
            </div>
          </div>

          <div className="container legal-body-container">
            <div className="legal-card">
              <div className="legal-section">
                <h2>1. Acceptance of Terms</h2>
                <p>By accessing or using the <strong>TN EDMS</strong> portal, you agree to comply with and be bound by these Terms of Service.</p>
              </div>

              <div className="legal-section">
                <h2>2. Authorized Use & Acceptable Conduct</h2>
                <p>TN EDMS is an official public resource. Users agree to use the portal solely for legitimate voter lookups, candidate information verification, or civic grievance submissions.</p>
              </div>

              <div className="legal-footer-nav">
                <button className="btn btn-primary" onClick={() => navigateTo('home')}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                  <span>← Back to Home Page</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="site-footer">
        <div className="container footer-container">
          <div className="footer-top-grid">
            <div className="footer-col brand-col">
              <div className="footer-brand">
                <div className="footer-emblem">🏛️</div>
                <span className="footer-brand-title">TN EDMS</span>
              </div>
              <p className="footer-text">
                TN EDMS — Empowering civic democracy and transparent governance for Rural & Urban Local Body Elections.
              </p>
              <div className="helpline-badge">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span>Election Helpline: <strong>1950</strong> (Toll Free)</span>
              </div>
            </div>

            <div className="footer-col">
              <h4 className="footer-heading">Quick Navigation</h4>
              <ul className="footer-links">
                <li><button onClick={() => navigateTo('home')}>Home Portal</button></li>
                <li><button onClick={() => navigateTo('home', 'about')}>About Elections</button></li>
                <li><button onClick={() => navigateTo('home', 'services')}>Platform Services</button></li>
                <li><button onClick={() => navigateTo('home', 'ward-finder')}>Ward & Booth Finder</button></li>
                <li><button onClick={() => navigateTo('home', 'schedule')}>Election Roadmap</button></li>
                <li><button onClick={() => navigateTo('home', 'faq')}>Voter FAQs</button></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4 className="footer-heading">Electoral Portals</h4>
              <ul className="footer-links">
                <li><button onClick={() => setVoterModalOpen(true)}>Voter Status Lookup</button></li>
                <li><button onClick={() => setNomineeModalOpen(true)}>Candidate Affidavit Filing</button></li>
                <li><button onClick={() => setComplaintModalOpen(true)}>MCC Violation Reporting</button></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4 className="footer-heading">State Control Room</h4>
              <address className="footer-contact">
                <p><strong>Election Control Room</strong></p>
                <p>No. 208/2, Jawaharlal Nehru Road,</p>
                <p>Arumbakkam, Chennai - 600 106</p>
                <p>Email: <code>support@tnedms.tn.gov.in</code></p>
              </address>
            </div>
          </div>

          <div className="footer-divider"></div>

          <div className="footer-bottom-bar">
            <div className="footer-copy">
              &copy; 2026-2027 <strong>TN EDMS</strong>. All Rights Reserved.
            </div>

            {/* Bottom Right Legal Links (User Requirement) */}
            <div className="footer-legal-right">
              <span className="footer-legal-link" onClick={() => navigateTo('privacy')}>Privacy Policy</span>
              <span className="legal-sep">•</span>
              <span className="footer-legal-link" onClick={() => navigateTo('terms')}>Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {voterModalOpen && (
        <div className="modal-overlay" onClick={(e) => e.target.className === 'modal-overlay' && setVoterModalOpen(false)}>
          <div className="modal-card">
            <div className="modal-header">
              <h3>Search Voter Roll Status</h3>
              <button className="modal-close" onClick={() => setVoterModalOpen(false)}>&times;</button>
            </div>
            <div className="modal-body">
              <p className="modal-desc">Enter your 10-character EPIC Number or Full Name to check assigned ward & booth.</p>
              <form onSubmit={handleVoterSearch}>
                <div className="form-group">
                  <label>EPIC Number or Name</label>
                  <input type="text" className="form-control" placeholder="e.g. TNE9876543 or K. SELVAM" value={epicInput} onChange={(e) => setEpicInput(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: '1rem' }}>Verify Electoral Roll</button>
              </form>
              {voterSearchSuccess && (
                <div className="voter-result-area">
                  <div style={{ color: 'var(--emerald)', fontWeight: 700, marginBottom: '0.5rem' }}>✓ RECORD FOUND IN ELECTORAL ROLL</div>
                  <p><strong>EPIC Ref:</strong> {epicInput.toUpperCase() || 'TNE9876543'}</p>
                  <p><strong>Elector Name:</strong> K. SELVAM / SELVI</p>
                  <p><strong>District / Ward:</strong> Chennai Corporation — Ward 45</p>
                  <p><strong>Assigned Polling Station:</strong> Government HSS, Room No. 4, Royapettah</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {nomineeModalOpen && (
        <div className="modal-overlay" onClick={(e) => e.target.className === 'modal-overlay' && setNomineeModalOpen(false)}>
          <div className="modal-card">
            <div className="modal-header">
              <h3>Candidate Nomination Portal</h3>
              <button className="modal-close" onClick={() => setNomineeModalOpen(false)}>&times;</button>
            </div>
            <div className="modal-body">
              <p className="modal-desc">Online pre-filing for Corporation Councillors, Municipal Councillors, and Panchayat Ward representatives.</p>
              <div className="nominee-info-box">
                <h4>Required Candidate Documentation:</h4>
                <ul style={{ margin: '1rem 0 1.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
                  <li>✅ Statutory Affidavit (Form 2A / 2B)</li>
                  <li>✅ Security Deposit Online Receipt</li>
                  <li>✅ Electoral Roll Extract certified by Returning Officer</li>
                </ul>
                <button className="btn btn-gold btn-block" onClick={() => alert('Digital Nomination Filing will open as per TNSEC Gazette notification.')}>Access Digital Filing System</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {complaintModalOpen && (
        <div className="modal-overlay" onClick={(e) => e.target.className === 'modal-overlay' && setComplaintModalOpen(false)}>
          <div className="modal-card">
            <div className="modal-header">
              <h3>Report MCC Incident</h3>
              <button className="modal-close" onClick={() => setComplaintModalOpen(false)}>&times;</button>
            </div>
            <div className="modal-body">
              <p className="modal-desc">Report Model Code of Conduct violations directly to the District Returning Officer.</p>
              <form onSubmit={handleComplaintSubmit}>
                <div className="form-group">
                  <label>District</label>
                  <select className="form-control" value={compDistrict} onChange={(e) => setCompDistrict(e.target.value)} required>
                    <option value="Chennai">Chennai</option>
                    <option value="Coimbatore">Coimbatore</option>
                    <option value="Madurai">Madurai</option>
                  </select>
                </div>
                <div className="form-group" style={{ marginTop: '0.75rem' }}>
                  <label>Incident Details</label>
                  <textarea className="form-control" rows="3" placeholder="Describe the violation..." value={compDetails} onChange={(e) => setCompDetails(e.target.value)} required></textarea>
                </div>
                <button type="submit" className="btn btn-red btn-block" style={{ marginTop: '1rem' }}>Submit Report to Control Room</button>
              </form>
              {complaintTicket && (
                <div className="voter-result-area">
                  <div style={{ color: 'var(--emerald)', fontWeight: 700, marginBottom: '0.5rem' }}>✓ COMPLAINT LOGGED WITH CONTROL ROOM</div>
                  <p><strong>Grievance Ticket ID:</strong> {complaintTicket}</p>
                  <p><strong>Jurisdiction:</strong> {compDistrict} District Returning Officer</p>
                  <p><strong>Status:</strong> Dispatched to Flying Squad Team (FST-3)</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
