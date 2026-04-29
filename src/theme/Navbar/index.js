import React, { useEffect, useRef, useState } from 'react';
import './navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [sportsOpen, setSportsOpen] = useState(false);
  const [supportPanelOpen, setSupportPanelOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const searchInputRef = useRef(null);
  const sportsTriggerRef = useRef(null);
  const sportsDropdownRef = useRef(null);
  const hideTimerRef = useRef(null);

  // Scroll shadow
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile drawer or search is open
  useEffect(() => {
    document.body.classList.toggle('ssy-no-scroll', mobileOpen);
    return () => document.body.classList.remove('ssy-no-scroll');
  }, [mobileOpen]);

  // Focus search input when modal opens
  useEffect(() => {
    if (searchOpen) {
      const t = setTimeout(() => searchInputRef.current?.focus(), 80);
      return () => clearTimeout(t);
    }
  }, [searchOpen]);

  // Close support panel on Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        setSupportPanelOpen(false);
        setSearchOpen(false);
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  const openSearch = () => {
    setMobileOpen(false);
    setSearchOpen(true);
  };
  const closeSearch = () => {
    setSearchOpen(false);
    setSearchValue('');
  };

  return (
    <>
      {/* ── Main Header ── */}
      <header id="ssy-main-header" className={scrolled ? 'ssy-shadow' : ''}>
        <div className="ssy-header-inner">
          {/* Logo */}
          <a href="/" className="ssy-logo-link">
            <img src="https://i.pixi.mg/i/1d12b4723ba119a9be5571f7.png" alt="雙龍體育" />
          </a>

          {/* Desktop Nav */}
          <nav className="ssy-desktop-nav">
            {/* Sports dropdown */}
            <div
              className="ssy-dropdown-wrapper"
              onMouseEnter={() => { clearTimeout(hideTimerRef.current); setSportsOpen(true); }}
              onMouseLeave={() => { hideTimerRef.current = setTimeout(() => setSportsOpen(false), 120); }}
            >
              <button
                className="ssy-nav-btn"
                onClick={() => setSportsOpen((o) => !o)}
              >
                體育
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </button>
              <div className={`ssy-dropdown-content${sportsOpen ? ' open' : ''}`}>
                <div className="ssy-dropdown-inner">
                  <a href="/forum/announcements/longshiguantongzhi-1" className="ssy-dropdown-item">
                    <span className="ssy-dropdown-item-title">雙龍職棒</span>
                    <span className="ssy-dropdown-item-desc">雙龍職棒官方網站</span>
                  </a>
                  <a href="https://sba.sysports.de/" target="_blank" rel="noreferrer" className="ssy-dropdown-item">
                    <span className="ssy-dropdown-item-title">雙龍職籃</span>
                    <span className="ssy-dropdown-item-desc">雙龍職籃官方網站</span>
                  </a>
                  <a href="/forum/announcements/longshiguantongzhi" className="ssy-dropdown-item">
                    <span className="ssy-dropdown-item-title">雙龍足球</span>
                    <span className="ssy-dropdown-item-desc">雙龍足球官方網站</span>
                  </a>
                </div>
              </div>
            </div>

            <a href="/game"   className="ssy-nav-link">賽程</a>
            <a href="/event"  className="ssy-nav-link">組織活動</a>
            <a href="/forum"  className="ssy-nav-link">論壇</a>
            <a href="/blog"   className="ssy-nav-link">部落格</a>
            <a href="https://support.sysports.de/open.php" target="_blank" rel="noreferrer" className="ssy-nav-link">聯絡我們</a>
          </nav>

          {/* Desktop search */}
          <div className="ssy-desktop-search">
            <button className="ssy-icon-btn" aria-label="搜尋" onClick={openSearch}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="10" cy="10" r="7"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </button>
          </div>

          {/* Mobile controls */}
          <div className="ssy-mobile-controls">
            <button className="ssy-icon-btn" aria-label="搜尋" onClick={openSearch}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="10" cy="10" r="7"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </button>
            <button className="ssy-icon-btn" aria-label="選單" onClick={() => setMobileOpen(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
          </div>
        </div>
      </header>

      {/* ── Sub Navbar ── */}
      <div id="ssy-sub-navbar">
        <div className="ssy-sub-navbar-inner">
          <button
            className={`ssy-sub-nav-trigger${supportPanelOpen ? ' open' : ''}`}
            aria-expanded={supportPanelOpen}
            onClick={() => setSupportPanelOpen((o) => !o)}
          >
            支援
            <svg className="ssy-chevron-sm" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>
      </div>

      {/* ── Support Panel ── */}
      <div id="ssy-support-panel" className={supportPanelOpen ? 'open' : ''}>
        <div className="ssy-support-panel-list">
          <a href="https://support.sysports.de/open.php" target="_blank" rel="noreferrer" className="ssy-support-panel-item">
            <div className="ssy-support-panel-item-left">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 9a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1a2 2 0 0 1 0 4v1a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1a2 2 0 0 1 0-4Z"/>
                <line x1="9" y1="12" x2="15" y2="12"/>
              </svg>
              建立新案件
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </a>
          <a href="https://support.sysports.de/" target="_blank" rel="noreferrer" className="ssy-support-panel-item">
            <div className="ssy-support-panel-item-left">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
              案件狀態查詢
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </a>
          <a href="/login" className="ssy-support-panel-item">
            <div className="ssy-support-panel-item-left">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              登入
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </a>
        </div>
      </div>

      {/* Backdrop to close panel */}
      {supportPanelOpen && (
        <div className="ssy-panel-backdrop" onClick={() => setSupportPanelOpen(false)} />
      )}

      {/* ── Mobile Drawer ── */}
      <div
        className={`ssy-mobile-overlay${mobileOpen ? ' open' : ''}`}
        onClick={(e) => { if (e.target === e.currentTarget) setMobileOpen(false); }}
      >
        <div className="ssy-mobile-drawer">
          <div className="ssy-drawer-header">
            <img src="https://i.pixi.mg/i/1d12b4723ba119a9be5571f7.png" alt="雙龍體育" />
            <button className="ssy-icon-btn" aria-label="關閉選單" onClick={() => setMobileOpen(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          <div className="ssy-drawer-body">
            <div className="ssy-drawer-section">
              <button className="ssy-drawer-search-btn" onClick={() => { setMobileOpen(false); setTimeout(openSearch, 220); }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="10" cy="10" r="7"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                搜尋...
              </button>
            </div>
            <div className="ssy-drawer-section">
              <div className="ssy-drawer-label">體育聯盟</div>
              <div className="ssy-drawer-links">
                <a href="/forum/announcements/longshiguantongzhi-1" className="ssy-drawer-link">雙龍職棒</a>
                <a href="https://sba.sysports.de/" target="_blank" rel="noreferrer" className="ssy-drawer-link">雙龍職籃</a>
                <a href="/forum/announcements/longshiguantongzhi" className="ssy-drawer-link">雙龍足球</a>
              </div>
            </div>
            <div className="ssy-drawer-section">
              <div className="ssy-drawer-label">導航</div>
              <div className="ssy-drawer-links">
                <a href="/game"  className="ssy-drawer-link">賽程</a>
                <a href="/event" className="ssy-drawer-link">組織活動</a>
                <a href="/forum" className="ssy-drawer-link">論壇</a>
                <a href="/blog"  className="ssy-drawer-link">部落格</a>
                <a href="https://support.sysports.de/open.php" target="_blank" rel="noreferrer" className="ssy-drawer-link">聯絡我們</a>
              </div>
            </div>
            <div className="ssy-drawer-section">
              <div className="ssy-drawer-label">支援</div>
              <div className="ssy-drawer-links">
                <a href="https://support.sysports.de/open.php" target="_blank" rel="noreferrer" className="ssy-drawer-link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1a2 2 0 0 1 0 4v1a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1a2 2 0 0 1 0-4Z"/><line x1="9" y1="12" x2="15" y2="12"/></svg>
                  建立新案件
                </a>
                <a href="https://support.sysports.de/" target="_blank" rel="noreferrer" className="ssy-drawer-link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                  案件狀態查詢
                </a>
                <a href="/login" className="ssy-drawer-link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  登入
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Search Modal ── */}
      <div
        className={`ssy-search-modal${searchOpen ? ' open' : ''}`}
        onClick={(e) => { if (e.target === e.currentTarget) closeSearch(); }}
      >
        <div className="ssy-search-box">
          <div className="ssy-search-input-row">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="10" cy="10" r="7"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input
              ref={searchInputRef}
              type="text"
              className="ssy-search-input"
              placeholder="搜尋文章、論壇、幫助..."
              autoComplete="off"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button className="ssy-icon-btn" aria-label="關閉搜尋" onClick={closeSearch}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          {searchValue.trim() && (
            <div className="ssy-search-results-preview">
              <div className="ssy-search-results-label">搜尋結果（展示）</div>
              <a href="#" className="ssy-search-result-item">
                <div className="ssy-search-result-title">{`關於「${searchValue}」的最新論壇文章`}</div>
                <div className="ssy-search-result-sub">雙龍體育官方消息</div>
              </a>
              <a href="#" className="ssy-search-result-item">
                <div className="ssy-search-result-title">{`幫助中心：${searchValue} 相關教學`}</div>
                <div className="ssy-search-result-sub">使用說明與常見問題</div>
              </a>
            </div>
          )}
          <div className="ssy-search-hint">搜尋結果僅為示意顯示。</div>
        </div>
      </div>
    </>
  );
}
