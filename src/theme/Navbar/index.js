import React, { useEffect, useRef, useState } from 'react';
import './navbar.css';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [scrolled, setScrolled] = useState(false);

  const searchInputRef = useRef(null);

  // Header shadow on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
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

  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setMobileOpen(false);
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
      {/* Dummy element so Docusaurus TOC scroll-spy querySelector('.navbar') never returns null */}
      <nav
        className="navbar"
        aria-hidden="true"
        style={{ height: 0, minHeight: 0, overflow: 'hidden', visibility: 'hidden', padding: 0, border: 'none', margin: 0 }}
      />

      {/* ── Main Header ── */}
      <header id="ssy-main-header" className={scrolled ? 'ssy-scrolled' : ''}>
        <div className="ssy-header-inner">

          {/* Logo group */}
          <div className="ssy-logo-group">
            <a href="/" id="ssy-logo-link">
              <img src="https://i.pixi.mg/i/f456f14c64ca7bf7b7c84040.png" alt="雙龍體育" />
            </a>
            <div className="ssy-logo-divider" />
            <a href="https://sysports.de/support" className="ssy-logo-blog-link">支援中心</a>
          </div>

          {/* Desktop nav */}
          <nav className="ssy-desktop-nav">
            <a href="https://sysports.de/support" className="ssy-nav-link">支援中心首頁</a>
            <a href="https://support.sysports.de/open.php" target="_blank" rel="noreferrer" className="ssy-nav-link">建立新案件</a>
            <a href="https://support.sysports.de/view.php" target="_blank" rel="noreferrer" className="ssy-nav-link">案件狀態查詢</a>
          </nav>

          {/* Desktop search */}
          <div className="ssy-desktop-search">
            <button className="ssy-icon-btn" aria-label="搜尋" onClick={openSearch}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="10" cy="10" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </div>

          {/* Mobile controls */}
          <div className="ssy-mobile-controls">
            <button className="ssy-icon-btn" aria-label="搜尋" onClick={openSearch}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="10" cy="10" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
            <button className="ssy-icon-btn" aria-label="選單" onClick={() => setMobileOpen(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Drawer ── */}
      <div
        className={`ssy-mobile-overlay${mobileOpen ? ' open' : ''}`}
        onClick={(e) => { if (e.target === e.currentTarget) setMobileOpen(false); }}
      >
        <div className="ssy-mobile-drawer">
          <div className="ssy-drawer-header">
            <img src="https://i.pixi.mg/i/f456f14c64ca7bf7b7c84040.png" alt="雙龍體育" />
            <button className="ssy-icon-btn" aria-label="關閉選單" onClick={() => setMobileOpen(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className="ssy-drawer-body">
            <div className="ssy-drawer-section">
              <button
                className="ssy-drawer-search-btn"
                onClick={() => { setMobileOpen(false); setTimeout(openSearch, 220); }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="10" cy="10" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                搜尋...
              </button>
            </div>

            <div className="ssy-drawer-section">
              <div className="ssy-drawer-label">支援中心</div>
              <div className="ssy-drawer-links">
                <a href="https://sysports.de/support" className="ssy-drawer-link">支援中心首頁</a>
                <a href="https://support.sysports.de/open.php" target="_blank" rel="noreferrer" className="ssy-drawer-link">建立新案件</a>
                <a href="https://support.sysports.de/view.php" target="_blank" rel="noreferrer" className="ssy-drawer-link">案件狀態查詢</a>
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
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="10" cy="10" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              ref={searchInputRef}
              type="text"
              className="ssy-search-input"
              placeholder="搜尋支援中心內容..."
              autoComplete="off"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button className="ssy-icon-btn" aria-label="關閉搜尋" onClick={closeSearch}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          {searchValue.trim() && (
            <div className="ssy-search-results-preview">
              <div className="ssy-search-results-label">搜尋結果（展示）</div>
              <a href="#" className="ssy-search-result-item">
                <div className="ssy-search-result-title">{`「${searchValue}」相關支援案件`}</div>
                <div className="ssy-search-result-sub">顯示目前可用的幫助文章與指引</div>
              </a>
              <a href="#" className="ssy-search-result-item">
                <div className="ssy-search-result-title">{`新手操作：${searchValue}`}</div>
                <div className="ssy-search-result-sub">常見問題與流程指引</div>
              </a>
            </div>
          )}
          <div className="ssy-search-hint">搜尋結果僅為示意顯示。</div>
        </div>
      </div>
    </>
  );
}
