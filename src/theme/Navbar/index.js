import React, { useEffect, useRef, useState } from 'react';
import './styles.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [sportsOpen, setSportsOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  const sportsRef = useRef(null);
  const hideTimerRef = useRef(null);
  const searchInputRef = useRef(null);

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Body scroll lock when mobile drawer is open
  useEffect(() => {
    document.body.classList.toggle('nb-no-scroll', mobileOpen);
    return () => document.body.classList.remove('nb-no-scroll');
  }, [mobileOpen]);

  // Focus search input when modal opens
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 80);
    } else {
      setSearchVal('');
    }
  }, [searchOpen]);

  // ESC closes support panel
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setSupportOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const openSearch = () => setSearchOpen(true);
  const closeSearch = () => setSearchOpen(false);

  return (
    <>
      {/* ── Main Header ── */}
      <header id="nb-main-header" className={scrolled ? 'nb-shadow-md' : ''}>
        <div className="nb-header-inner">
          {/* Logo */}
          <a href="/" className="nb-logo-link">
            <img src="https://i.pixi.mg/i/1d12b4723ba119a9be5571f7.png" alt="雙龍體育" />
          </a>

          {/* Desktop Nav */}
          <nav className="nb-desktop-nav">
            {/* Sports dropdown */}
            <div
              className="nb-dropdown-wrapper"
              onMouseEnter={() => { clearTimeout(hideTimerRef.current); setSportsOpen(true); }}
              onMouseLeave={() => { hideTimerRef.current = setTimeout(() => setSportsOpen(false), 120); }}
            >
              <button
                className="nb-nav-btn"
                onClick={() => setSportsOpen(v => !v)}
              >
                體育
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
              </button>
              <div className={`nb-dropdown-content${sportsOpen ? ' open' : ''}`}>
                <div className="nb-dropdown-inner">
                  <a href="/forum/announcements/longshiguantongzhi-1" className="nb-dropdown-item">
                    <span className="nb-dropdown-item-title">雙龍職棒</span>
                    <span className="nb-dropdown-item-desc">雙龍職棒官方網站</span>
                  </a>
                  <a href="https://sba.sysports.de/" target="_blank" rel="noreferrer" className="nb-dropdown-item">
                    <span className="nb-dropdown-item-title">雙龍職籃</span>
                    <span className="nb-dropdown-item-desc">雙龍職籃官方網站</span>
                  </a>
                  <a href="/forum/announcements/longshiguantongzhi" className="nb-dropdown-item">
                    <span className="nb-dropdown-item-title">雙龍足球</span>
                    <span className="nb-dropdown-item-desc">雙龍足球官方網站</span>
                  </a>
                </div>
              </div>
            </div>

            <a href="/game"  className="nb-nav-link">賽程</a>
            <a href="/event" className="nb-nav-link">組織活動</a>
            <a href="/forum" className="nb-nav-link">論壇</a>
            <a href="/blog"  className="nb-nav-link">部落格</a>
            <a href="https://support.sysports.de/open.php" target="_blank" rel="noreferrer" className="nb-nav-link">聯絡我們</a>
          </nav>

          {/* Desktop search */}
          <div className="nb-desktop-search">
            <button className="nb-icon-btn" aria-label="搜尋" onClick={openSearch}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="10" cy="10" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            </button>
          </div>

          {/* Mobile controls */}
          <div className="nb-mobile-controls">
            <button className="nb-icon-btn" aria-label="搜尋" onClick={openSearch}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="10" cy="10" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            </button>
            <button className="nb-icon-btn" aria-label="選單" onClick={() => setMobileOpen(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
            </button>
          </div>
        </div>
      </header>

      {/* ── Sub Navbar ── */}
      <div id="nb-sub-navbar">
        <div className="nb-sub-navbar-inner">
          <button
            id="nb-support-trigger"
            className={`nb-sub-nav-trigger${supportOpen ? ' open' : ''}`}
            aria-expanded={supportOpen}
            onClick={() => setSupportOpen(v => !v)}
          >
            支援
            <svg className="nb-chevron-sm" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Support Panel ── */}
      <div id="nb-support-panel" className={supportOpen ? 'open' : ''}>
        <div className="nb-support-panel-list">
          <a href="https://support.sysports.de/open.php" target="_blank" rel="noreferrer" className="nb-support-panel-item">
            <div className="nb-support-panel-item-left">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 9a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1a2 2 0 0 1 0 4v1a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1a2 2 0 0 1 0-4Z" />
                <line x1="9" y1="12" x2="15" y2="12" />
              </svg>
              建立新案件
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
          </a>
          <a href="https://support.sysports.de/" target="_blank" rel="noreferrer" className="nb-support-panel-item">
            <div className="nb-support-panel-item-left">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
              案件狀態查詢
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
          </a>
          <a href="/login" className="nb-support-panel-item">
            <div className="nb-support-panel-item-left">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              登入
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
          </a>
        </div>
      </div>

      {/* Panel backdrop */}
      {supportOpen && (
        <div className="nb-panel-backdrop active" onClick={() => setSupportOpen(false)} />
      )}

      {/* ── Mobile Drawer ── */}
      <div className={`nb-mobile-sheet-overlay${mobileOpen ? ' open' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) setMobileOpen(false); }}>
        <div className="nb-mobile-sheet-drawer">
          <div className="nb-drawer-header">
            <img src="https://i.pixi.mg/i/1d12b4723ba119a9be5571f7.png" alt="雙龍體育" />
            <button className="nb-icon-btn" aria-label="關閉選單" onClick={() => setMobileOpen(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
          </div>
          <div className="nb-drawer-body">
            <div className="nb-drawer-section">
              <button className="nb-drawer-search-btn" onClick={() => { setMobileOpen(false); setTimeout(openSearch, 220); }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="10" cy="10" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                搜尋...
              </button>
            </div>
            <div className="nb-drawer-section">
              <div className="nb-drawer-label">體育聯盟</div>
              <div className="nb-drawer-links">
                <a href="/forum/announcements/longshiguantongzhi-1" className="nb-drawer-link">雙龍職棒</a>
                <a href="https://sba.sysports.de/" target="_blank" rel="noreferrer" className="nb-drawer-link">雙龍職籃</a>
                <a href="/forum/announcements/longshiguantongzhi" className="nb-drawer-link">雙龍足球</a>
              </div>
            </div>
            <div className="nb-drawer-section">
              <div className="nb-drawer-label">導航</div>
              <div className="nb-drawer-links">
                <a href="/game"  className="nb-drawer-link">賽程</a>
                <a href="/event" className="nb-drawer-link">組織活動</a>
                <a href="/forum" className="nb-drawer-link">論壇</a>
                <a href="/blog"  className="nb-drawer-link">部落格</a>
                <a href="https://support.sysports.de/open.php" target="_blank" rel="noreferrer" className="nb-drawer-link">聯絡我們</a>
              </div>
            </div>
            <div className="nb-drawer-section">
              <div className="nb-drawer-label">支援</div>
              <div className="nb-drawer-links">
                <a href="https://support.sysports.de/open.php" target="_blank" rel="noreferrer" className="nb-drawer-link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1a2 2 0 0 1 0 4v1a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1a2 2 0 0 1 0-4Z" /><line x1="9" y1="12" x2="15" y2="12" /></svg>
                  建立新案件
                </a>
                <a href="https://support.sysports.de/" target="_blank" rel="noreferrer" className="nb-drawer-link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>
                  案件狀態查詢
                </a>
                <a href="/login" className="nb-drawer-link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                  登入
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Search Modal ── */}
      <div
        className={`nb-global-search-modal${searchOpen ? ' open' : ''}`}
        onClick={(e) => { if (e.target === e.currentTarget) closeSearch(); }}
      >
        <div className="nb-search-box">
          <div className="nb-search-input-row">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="10" cy="10" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="搜尋文章、論壇、幫助..."
              autoComplete="off"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
            />
            <button className="nb-icon-btn" aria-label="關閉搜尋" onClick={closeSearch}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
          </div>
          {searchVal.trim() && (
            <div className="nb-search-results-preview">
              <div className="nb-search-results-label">搜尋結果（展示）</div>
              <a href="#" className="nb-search-result-item">
                <div className="nb-search-result-title">關於「{searchVal}」的最新論壇文章</div>
                <div className="nb-search-result-sub">雙龍體育官方消息</div>
              </a>
              <a href="#" className="nb-search-result-item">
                <div className="nb-search-result-title">幫助中心：{searchVal} 相關教學</div>
                <div className="nb-search-result-sub">使用說明與常見問題</div>
              </a>
            </div>
          )}
          <div className="nb-search-hint">搜尋結果僅為示意顯示。</div>
        </div>
      </div>
    </>
  );
}
