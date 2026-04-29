import React, { useState, useEffect, useRef } from 'react';
import styles from './styles.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const searchInputRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current && searchInputRef.current.focus(), 80);
    }
  }, [searchOpen]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  const openSearch = () => {
    setSearchOpen(true);
    setDrawerOpen(false);
  };
  const closeSearch = () => {
    setSearchOpen(false);
    setSearchVal('');
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) setDrawerOpen(false);
  };
  const handleSearchModalClick = (e) => {
    if (e.target === e.currentTarget) closeSearch();
  };

  return (
    <>
      <header className={`${styles.header}${scrolled ? ' ' + styles.headerShadow : ''}`}>
        <div className={styles.inner}>
          {/* Logo */}
          <div className={styles.logoGroup}>
            <a href="/" className={styles.logoLink}>
              <img
                src="https://i.pixi.mg/i/f456f14c64ca7bf7b7c84040.png"
                alt="雙龍體育"
                className={styles.logoImg}
              />
            </a>
            <div className={styles.logoDivider} />
            <a href="https://sysports.de/support" className={styles.logoBlogLink}>
              支援中心
            </a>
          </div>

          {/* Desktop Nav */}
          <nav className={styles.desktopNav} aria-label="主要導覽">
            <a href="https://sysports.de/support" className={styles.navLink}>支援中心首頁</a>
            <a href="https://support.sysports.de/open.php" className={styles.navLink}>建立新案件</a>
            <a href="https://support.sysports.de/view.php" className={styles.navLink}>案件狀態查詢</a>
          </nav>

          {/* Desktop Search */}
          <div className={styles.desktopSearch}>
            <button
              className={styles.iconBtn}
              aria-label="搜尋"
              onClick={() => setSearchOpen(true)}
            >
              <SearchIcon />
            </button>
          </div>

          {/* Mobile Controls */}
          <div className={styles.mobileControls}>
            <button className={styles.iconBtn} aria-label="搜尋" onClick={() => setSearchOpen(true)}>
              <SearchIcon />
            </button>
            <button className={styles.iconBtn} aria-label="選單" onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`${styles.overlay}${drawerOpen ? ' ' + styles.overlayOpen : ''}`}
        onClick={handleOverlayClick}
        aria-hidden={!drawerOpen}
      >
        <div className={`${styles.drawer}${drawerOpen ? ' ' + styles.drawerOpen : ''}`} role="dialog" aria-modal="true" aria-label="選單">
          <div className={styles.drawerHeader}>
            <img
              src="https://i.pixi.mg/i/f456f14c64ca7bf7b7c84040.png"
              alt="雙龍體育"
              className={styles.drawerLogo}
            />
            <button className={styles.iconBtn} aria-label="關閉選單" onClick={() => setDrawerOpen(false)}>
              <CloseIcon />
            </button>
          </div>

          <div className={styles.drawerBody}>
            <div className={styles.drawerSection}>
              <button className={styles.drawerSearchBtn} onClick={openSearch}>
                <SearchIconSm />
                搜尋...
              </button>
            </div>

            <div className={styles.drawerSection}>
              <div className={styles.drawerLabel}>支援中心</div>
              <div className={styles.drawerLinks}>
                <a href="https://sysports.de/support" className={styles.drawerLink} onClick={() => setDrawerOpen(false)}>支援中心首頁</a>
                <a href="https://support.sysports.de/open.php" className={styles.drawerLink} onClick={() => setDrawerOpen(false)}>建立新案件</a>
                <a href="https://support.sysports.de/view.php" className={styles.drawerLink} onClick={() => setDrawerOpen(false)}>案件狀態查詢</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Modal */}
      <div
        className={`${styles.searchModal}${searchOpen ? ' ' + styles.searchModalOpen : ''}`}
        onClick={handleSearchModalClick}
        aria-hidden={!searchOpen}
        role="dialog"
        aria-modal="true"
        aria-label="搜尋"
      >
        <div className={styles.searchBox}>
          <div className={styles.searchInputRow}>
            <SearchIcon />
            <input
              ref={searchInputRef}
              type="text"
              className={styles.searchInput}
              placeholder="搜尋支援中心內容..."
              autoComplete="off"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
            />
            <button className={styles.iconBtn} aria-label="關閉搜尋" onClick={closeSearch}>
              <CloseIcon />
            </button>
          </div>

          {searchVal.trim() && (
            <div className={styles.searchResults}>
              <div className={styles.searchResultsLabel}>搜尋結果（展示）</div>
              <a href="#" className={styles.searchResultItem}>
                <div className={styles.searchResultTitle}>「{searchVal}」相關支援案件</div>
                <div className={styles.searchResultSub}>顯示目前可用的幫助文章與指引</div>
              </a>
              <a href="#" className={styles.searchResultItem}>
                <div className={styles.searchResultTitle}>新手操作：{searchVal}</div>
                <div className={styles.searchResultSub}>常見問題與流程指引</div>
              </a>
            </div>
          )}

          <div className={styles.searchHint}>搜尋結果僅為示意顯示。</div>
        </div>
      </div>
    </>
  );
}

function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="10" cy="10" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function SearchIconSm() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="10" cy="10" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
