<?php $title = ($cfg && is_object($cfg) && $cfg->getTitle())
    ? $cfg->getTitle() : 'osTicket :: '.__('Support Ticket System');
$signin_url = ROOT_PATH . "login.php?do=ext&bk=oauth2.user.p1i1";
$signout_url = ROOT_PATH . "logout.php?auth=".$ost->getLinkToken();
$checkldap = 'SELECT * FROM '.PLUGIN_TABLE
                .' WHERE name LIKE "%ldap%" AND `isactive` = "1"';
// Algolia config for navbar
$algoliaAppId = '70GEOCJCSX';
$algoliaApiKey = 'c2e792c2e75fe1dd3e40574f8b4c9a80';
$algoliaIndexName = 'help';
header("Content-Type: text/html; charset=UTF-8");
if (($lang = Internationalization::getCurrentLanguage())) {
    $langs = array_unique(array($lang, $cfg->getPrimaryLanguage()));
    $langs = Internationalization::rfc1766($langs);
    header("Content-Language: ".implode(', ', $langs));
}
?>
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?php echo Format::htmlchars($title); ?></title>
    <meta name="description" content="customer support platform">
    <meta name="keywords" content="osTicket, Customer support system, support ticket system">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/flowbite@2.4.1/dist/flowbite.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@algolia/sitesearch@latest/dist/search.min.css" />
    <script src="https://cdn.jsdelivr.net/npm/@algolia/sitesearch@latest/dist/search.min.js"></script>
    <style>
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        html,
        body {
            background: #f9fafb;
            min-height: 100%;
        }

        body {
            font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            -webkit-font-smoothing: antialiased;
            padding-top: 4rem;
        }
        body.no-scroll { overflow: hidden; }
        a { text-decoration: none; color: inherit; }

        #main-header {
            position: fixed;
            top: 0; left: 0; right: 0;
            z-index: 50;
            background-color: rgba(255,255,255,0.95);
            backdrop-filter: blur(12px);
            border-bottom: 1px solid rgba(229,231,235,0.6);
            transition: all 0.2s ease;
        }
        #main-header.shadow-md { box-shadow: 0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -1px rgba(0,0,0,0.04); }

        .header-inner {
            margin: 0 auto;
            max-width: 80rem;
            height: 4rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 1rem;
        }
        @media (min-width: 640px) { .header-inner { padding: 0 1.5rem; } }
        @media (min-width: 1024px) { .header-inner { padding: 0 2rem; } }

        .logo-group { display: flex; align-items: center; flex-shrink: 0; }
        #logo-link { display: flex; align-items: center; gap: 0.5rem; }
        #logo-link img { height: 1.75rem; width: auto; object-fit: contain; }

        .logo-divider {
            width: 1px;
            height: 1.25rem;
            background-color: #d1d5db;
            margin: 0 0.75rem;
            flex-shrink: 0;
        }

        .logo-blog-link {
            font-size: 0.9rem;
            font-weight: 500;
            color: #4b5563;
            white-space: nowrap;
            transition: color 0.15s;
        }
        .logo-blog-link:hover { color: #111827; }

        .desktop-nav {
            display: none;
            align-items: center;
            gap: 0.25rem;
        }
        @media (min-width: 1024px) { .desktop-nav { display: flex; } }

        .nav-link {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            height: 2.25rem;
            padding: 0 0.75rem;
            border-radius: 0.375rem;
            font-size: 0.875rem;
            font-weight: 500;
            color: #4b5563;
            background: none;
            border: none;
            cursor: pointer;
            transition: background 0.15s;
            white-space: nowrap;
        }
        .nav-link:hover { background: #f3f4f6; color: #111827; }

        .desktop-search {
            display: none;
            align-items: center;
            gap: 0.75rem;
        }
        @media (min-width: 1024px) { .desktop-search { display: flex; } }

        .icon-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 0.5rem;
            border-radius: 0.375rem;
            color: #4b5563;
            background: none;
            border: none;
            cursor: pointer;
            transition: background 0.15s;
        }
        .icon-btn:hover { background: #f3f4f6; }

        .mobile-controls {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        @media (min-width: 1024px) { .mobile-controls { display: none; } }

        #mobileSheetOverlay {
            position: fixed; inset: 0; z-index: 60;
            visibility: hidden; opacity: 0;
            background: rgba(0,0,0,0.4);
            backdrop-filter: blur(4px);
            transition: opacity 0.3s, visibility 0.3s;
        }
        #mobileSheetOverlay.open { visibility: visible; opacity: 1; }

        #mobileSheetDrawer {
            position: absolute; right: 0; top: 0;
            height: 100%; width: 100%;
            background: #fff;
            box-shadow: -8px 0 30px rgba(0,0,0,0.12);
            transform: translateX(100%);
            transition: transform 0.3s;
            display: flex; flex-direction: column;
        }
        @media (min-width: 640px) { #mobileSheetDrawer { width: 24rem; } }
        #mobileSheetOverlay.open #mobileSheetDrawer { transform: translateX(0); }

        .drawer-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1.25rem;
            border-bottom: 1px solid #e5e7eb;
        }
        .drawer-header img { height: 1.5rem; width: auto; }

        .drawer-body { flex: 1; overflow-y: auto; }
        .drawer-section {
            padding: 1rem;
            border-bottom: 1px solid #f3f4f6;
        }
        .drawer-section:last-child { border-bottom: none; }

        .drawer-label {
            font-size: 0.7rem;
            font-weight: 600;
            color: #9ca3af;
            text-transform: uppercase;
            letter-spacing: 0.075em;
            margin-bottom: 0.75rem;
        }

        .drawer-links {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
        }

        .drawer-link {
            width: 100%;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            border: 1px solid transparent;
            border-radius: 0.375rem;
            padding: 0.5rem 0.75rem;
            color: #374151;
            background: none;
            cursor: pointer;
            font-size: 0.875rem;
            font-weight: 500;
            transition: background 0.15s;
            text-align: left;
            text-decoration: none;
        }
        .drawer-link:hover { background: #f9fafb; }

        .auth-icon-btn,
        .profile-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 2.25rem;
            height: 2.25rem;
            border: 0;
            border-radius: 999px;
            color: #4b5563;
            background: transparent;
            cursor: pointer;
            text-decoration: none;
            transition: background 0.15s, transform 0.15s, box-shadow 0.15s;
        }
        .auth-icon-btn:hover,
        .profile-btn:hover { background: #f3f4f6; color: #111827; transform: translateY(-1px); }
        .profile-wrap { position: relative; }
        .profile-btn { overflow: hidden; background: #f3f4f6; color: #4b5563; font-size: 0.9rem; font-weight: 800; }
        .profile-btn img { width: 100%; height: 100%; object-fit: cover; }
        .profile-btn span { line-height: 1; }
        .profile-menu { position: absolute; right: 0; top: calc(100% + 0.55rem); width: 14rem; z-index: 80; padding: 0.35rem; border: 1px solid #e5e7eb; border-radius: 0.75rem; background: #fff; box-shadow: 0 18px 45px rgba(15, 23, 42, 0.14); display: none; }
        .profile-menu.open { display: block; }
        .profile-menu-label { padding: 0.65rem 0.75rem; }
        .profile-menu-name { overflow: hidden; color: #111827; font-size: 0.875rem; font-weight: 600; line-height: 1.2; text-overflow: ellipsis; white-space: nowrap; }
        .profile-menu-email { overflow: hidden; color: #6b7280; font-size: 0.75rem; line-height: 1.2; margin-top: 0.25rem; text-overflow: ellipsis; white-space: nowrap; }
        .profile-menu-separator { height: 1px; background: #e5e7eb; margin: 0.25rem -0.35rem; }
        .profile-menu-item { display: flex; align-items: center; gap: 0.55rem; border-radius: 0.5rem; color: #374151; font-size: 0.875rem; padding: 0.55rem 0.65rem; text-decoration: none; }
        .profile-menu-item:hover { background: #f9fafb; color: #111827; }
        .profile-menu-danger { color: #dc2626; }
        .profile-menu-danger:hover { color: #dc2626; background: #fef2f2; }

        /* Nav search - looks like input but clicks open modal directly */
        #nav-search-wrapper {
            position: relative;
        }
        @media (max-width: 1023px) {
            #nav-search-wrapper { display: none; }
        }

        /* Search input style trigger */
        #nav-search-trigger {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            width: 200px;
            height: 2.25rem;
            padding: 0 0.75rem;
            border-radius: 0.375rem;
            border: 1px solid #e5e7eb;
            background: #f9fafb;
            color: #6b7280;
            font-size: 0.875rem;
            cursor: pointer;
            transition: all 0.15s;
        }
        #nav-search-trigger:hover {
            background: #f3f4f6;
            border-color: #d1d5db;
        }
        #nav-search-trigger svg {
            color: #9ca3af;
            flex-shrink: 0;
        }
        #nav-search-trigger .search-placeholder {
            flex: 1;
            text-align: left;
        }

        /* Hidden container for Algolia search */
        #nav-search-hidden-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 1px;
            height: 1px;
            overflow: hidden;
            opacity: 0;
            pointer-events: none;
        }

        /* Mobile search in drawer */
        #mobile-search-trigger {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.75rem;
            margin: 0 1rem 1rem 1rem;
            width: calc(100% - 2rem);
            border: 1px solid #e5e7eb;
            border-radius: 0.5rem;
            background: #f9fafb;
            color: #6b7280;
            font-size: 0.875rem;
            cursor: pointer;
            transition: background 0.15s;
        }
        #mobile-search-trigger:hover { background: #f3f4f6; }

        #mobile-search-hidden-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 1px;
            height: 1px;
            overflow: hidden;
            opacity: 0;
            pointer-events: none;
        }


        /* Match official support navbar: icon-only desktop search, drawer search inside first section */
        #nav-search-trigger.icon-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: auto;
            height: auto;
            padding: 0.5rem;
            border: 0;
            border-radius: 0.375rem;
            background: none;
            color: #4b5563;
        }
        #nav-search-trigger.icon-btn:hover { background: #f3f4f6; color: #4b5563; }
        #mobile-search-trigger {
            width: 100%;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            border: 1px solid #d1d5db;
            border-radius: 0.375rem;
            padding: 0.5rem 0.75rem;
            margin: 0;
            color: #6b7280;
            background: none;
            cursor: pointer;
            font-size: 0.875rem;
            transition: background 0.15s;
            text-align: left;
        }
        #mobile-search-trigger:hover { background: #f9fafb; }

    </style>

    <script type="text/javascript" src="<?php echo ROOT_PATH; ?>js/jquery-3.7.0.min.js"></script>
    <script type="text/javascript" src="<?php echo ROOT_PATH; ?>js/osticket.js"></script>
    <script type="text/javascript" src="<?php echo ROOT_PATH; ?>js/filedrop.field.js"></script>

    <?php
    if($ost && ($headers=$ost->getExtraHeaders())) {
        echo "\n\t".implode("\n\t", $headers)."\n";
    }
    ?>
</head>
<body>
    <header id="main-header">
        <div class="header-inner">
            <div class="logo-group">
                <a href="https://sysports.de/support" id="logo-link">
                    <img src="https://i.pixi.mg/i/f456f14c64ca7bf7b7c84040.png" alt="雙龍體育" />
                </a>
                <div class="logo-divider"></div>
                <a href="https://sysports.de/support" class="logo-blog-link">支援中心</a>
            </div>

            <nav class="desktop-nav">
                <a href="https://sysports.de/support" class="nav-link">支援中心首頁</a>
                <a href="/open.php" class="nav-link">建立新案件</a>
                <a href="/view.php" class="nav-link">案件狀態查詢</a>
            </nav>

            <div class="desktop-search">
                <button id="nav-search-trigger" class="icon-btn" type="button" aria-label="搜尋">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="7"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </button>
                <div id="nav-search-wrapper"><div id="nav-search-hidden-container"></div></div>
                <?php if ($thisclient && is_object($thisclient) && $thisclient->isValid() && !$thisclient->isGuest()) {
                    $client_name = Format::htmlchars($thisclient->getName());
                    $client_email = Format::htmlchars($thisclient->getEmail());
                    $client_initial = Format::htmlchars(mb_strtoupper(mb_substr($thisclient->getName(), 0, 1, 'UTF-8'), 'UTF-8'));
                ?>
                    <div class="profile-wrap">
                        <button class="profile-btn" type="button" aria-label="客服帳號：<?php echo $client_name; ?>" aria-haspopup="menu" aria-expanded="false"><span><?php echo $client_initial ?: 'U'; ?></span></button>
                        <div class="profile-menu" role="menu">
                            <div class="profile-menu-label"><div class="profile-menu-name"><?php echo $client_name; ?></div><div class="profile-menu-email"><?php echo $client_email ?: 'support.sysports.de'; ?></div></div>
                            <div class="profile-menu-separator"></div>
                            <a class="profile-menu-item" href="/account.php" role="menuitem"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21a8 8 0 0 0-16 0"></path><circle cx="12" cy="7" r="4"></circle></svg><span>帳戶設定</span></a>
                            <a class="profile-menu-item" href="/tickets.php" role="menuitem"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"></path></svg><span>我的工單</span></a>
                            <div class="profile-menu-separator"></div>
                            <a class="profile-menu-item profile-menu-danger" href="<?php echo $signout_url; ?>" role="menuitem"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><path d="m16 17 5-5-5-5"></path><path d="M21 12H9"></path></svg><span>登出</span></a>
                        </div>
                    </div>
                <?php } else { ?>
                    <a href="<?php echo $signin_url; ?>" class="auth-icon-btn" aria-label="登入客服系統" title="登入客服系統"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21a8 8 0 0 0-16 0"></path><circle cx="12" cy="7" r="4"></circle></svg></a>
                <?php } ?>
            </div>

            <div class="mobile-controls">
                <?php if ($thisclient && is_object($thisclient) && $thisclient->isValid() && !$thisclient->isGuest()) { ?>
                    <div class="profile-wrap"><button class="profile-btn" type="button" aria-label="客服帳號：<?php echo Format::htmlchars($thisclient->getName()); ?>" aria-haspopup="menu" aria-expanded="false"><span><?php echo Format::htmlchars(mb_strtoupper(mb_substr($thisclient->getName(), 0, 1, 'UTF-8'), 'UTF-8')) ?: 'U'; ?></span></button></div>
                <?php } else { ?>
                    <a href="<?php echo $signin_url; ?>" class="auth-icon-btn" aria-label="登入客服系統" title="登入客服系統"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21a8 8 0 0 0-16 0"></path><circle cx="12" cy="7" r="4"></circle></svg></a>
                <?php } ?>
                <button id="menuTriggerBtn" class="icon-btn" aria-label="選單">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                </button>
                <!-- Hidden container for mobile navbar search -->
                <div id="mobile-nav-search-hidden-container" style="position:absolute;left:-9999px;"></div>
            </div>
        </div>
    </header>

    <!-- Mobile drawer -->
    <div id="mobileSheetOverlay">
        <div id="mobileSheetDrawer">
            <div class="drawer-header">
                <img src="https://i.pixi.mg/i/f456f14c64ca7bf7b7c84040.png" alt="雙龍體育" />
                <button id="closeSheetBtn" class="icon-btn" aria-label="關閉選單">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            </div>

            <div id="mobile-search-hidden-container"></div>

            <div class="drawer-body">
                <div class="drawer-section">
                    <button id="mobile-search-trigger" type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="10" cy="10" r="7"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        搜尋...
                    </button>
                </div>
                <div class="drawer-section">
                    <div class="drawer-label">支援中心</div>
                    <div class="drawer-links">
                        <a href="https://sysports.de/support" class="drawer-link">支援中心首頁</a>
                        <a href="/open.php" class="drawer-link">建立新案件</a>
                        <a href="/view.php" class="drawer-link">案件狀態查詢</a>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <script>
        // Header shadow on scroll
        const header = document.getElementById('main-header');
        window.addEventListener('scroll', () => {
            header.classList.toggle('shadow-md', window.scrollY > 10);
        });

        // Profile dropdown
        document.querySelectorAll('.profile-wrap').forEach((wrap) => {
            const btn = wrap.querySelector('.profile-btn');
            const menu = wrap.querySelector('.profile-menu');
            if (!btn || !menu) return;
            btn.addEventListener('click', (event) => {
                event.stopPropagation();
                document.querySelectorAll('.profile-menu.open').forEach((openMenu) => { if (openMenu !== menu) openMenu.classList.remove('open'); });
                const open = menu.classList.toggle('open');
                btn.setAttribute('aria-expanded', open ? 'true' : 'false');
            });
        });
        document.addEventListener('click', () => {
            document.querySelectorAll('.profile-menu.open').forEach((menu) => menu.classList.remove('open'));
            document.querySelectorAll('.profile-btn[aria-expanded="true"]').forEach((btn) => btn.setAttribute('aria-expanded', 'false'));
        });

        // Mobile drawer
        const overlay = document.getElementById('mobileSheetOverlay');
        const openSheet = () => {
            overlay.classList.add('open');
            document.body.classList.add('no-scroll');
            // Initialize mobile search when drawer opens
            initMobileSearch();
        };
        const closeSheet = () => {
            overlay.classList.remove('open');
            document.body.classList.remove('no-scroll');
        };

        document.getElementById('menuTriggerBtn').addEventListener('click', openSheet);
        document.getElementById('closeSheetBtn').addEventListener('click', closeSheet);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeSheet();
        });

        // Algolia Search
        const algoliaAppId = <?php echo json_encode($algoliaAppId); ?>;
        const algoliaApiKey = <?php echo json_encode($algoliaApiKey); ?>;
        const algoliaIndexName = <?php echo json_encode($algoliaIndexName); ?>;

        let navSearchInitialized = false;
        let mobileSearchInitialized = false;
        let mobileNavSearchInitialized = false;
        let navSearchInstance = null;
        let mobileSearchInstance = null;
        let mobileNavSearchInstance = null;

        function triggerHiddenSearch(containerId) {
            const container = document.getElementById(containerId);
            if (!container) return;
            const hiddenBtn = container.querySelector('.sitesearch-button');
            if (hiddenBtn) {
                hiddenBtn.click();
            }
        }

        function initNavSearch() {
            if (navSearchInitialized || !window.SiteSearch) return;
            
            const container = document.getElementById('nav-search-hidden-container');
            if (!container) return;

            navSearchInstance = window.SiteSearch.init({
                container: '#nav-search-hidden-container',
                applicationId: algoliaAppId,
                apiKey: algoliaApiKey,
                indexName: algoliaIndexName,
                attributes: {
                    primaryText: 'title',
                    secondaryText: 'description',
                    tertiaryText: 'itunesAuthor',
                    url: 'url',
                    image: 'imageUrl'
                }
            });
            navSearchInitialized = true;

            // Bind click event to desktop trigger
            const trigger = document.getElementById('nav-search-trigger');
            if (trigger) {
                trigger.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    triggerHiddenSearch('nav-search-hidden-container');
                });
            }
        }

        function initMobileNavSearch() {
            if (mobileNavSearchInitialized || !window.SiteSearch) return;
            
            const container = document.getElementById('mobile-nav-search-hidden-container');
            if (!container) return;

            mobileNavSearchInstance = window.SiteSearch.init({
                container: '#mobile-nav-search-hidden-container',
                applicationId: algoliaAppId,
                apiKey: algoliaApiKey,
                indexName: algoliaIndexName,
                attributes: {
                    primaryText: 'title',
                    secondaryText: 'description',
                    tertiaryText: 'itunesAuthor',
                    url: 'url',
                    image: 'imageUrl'
                }
            });
            mobileNavSearchInitialized = true;

            // Bind click event to mobile navbar search button
            const trigger = document.getElementById('mobileSearchBtn');
            if (trigger) {
                trigger.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    triggerHiddenSearch('mobile-nav-search-hidden-container');
                });
            }
        }

        function initMobileSearch() {
            if (mobileSearchInitialized || !window.SiteSearch) return;
            
            const container = document.getElementById('mobile-search-hidden-container');
            if (!container) return;

            mobileSearchInstance = window.SiteSearch.init({
                container: '#mobile-search-hidden-container',
                applicationId: algoliaAppId,
                apiKey: algoliaApiKey,
                indexName: algoliaIndexName,
                attributes: {
                    primaryText: 'title',
                    secondaryText: 'description',
                    tertiaryText: 'itunesAuthor',
                    url: 'url',
                    image: 'imageUrl'
                }
            });
            mobileSearchInitialized = true;

            // Bind click event to drawer trigger
            const trigger = document.getElementById('mobile-search-trigger');
            if (trigger) {
                trigger.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    closeSheet();
                    setTimeout(() => {
                        triggerHiddenSearch('mobile-search-hidden-container');
                    }, 300);
                });
            }
        }

        // Initialize desktop search when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(initNavSearch, 100);
                setTimeout(initMobileNavSearch, 150);
            });
        } else {
            setTimeout(initNavSearch, 100);
            setTimeout(initMobileNavSearch, 150);
        }
        
        // Retry initialization
        setTimeout(initNavSearch, 500);
        setTimeout(initMobileNavSearch, 550);
        setTimeout(initNavSearch, 1000);
        setTimeout(initMobileNavSearch, 1050);
    </script>

    <div class="main-content" style="background: #f9fafb; min-height: calc(100vh - 4rem); padding: 2rem 1rem;">
        <div style="max-width: 80rem; margin: 0 auto;">
            <?php if($errors['err']) { ?>
                <div style="background: #fee2e2; border-left: 4px solid #dc2626; color: #991b1b; padding: 1rem; margin-bottom: 1rem; border-radius: 0.375rem;" role="alert">
                    <p><?php echo $errors['err']; ?></p>
                </div>
            <?php } elseif($msg) { ?>
                <div style="background: #dbeafe; border-left: 4px solid #2563eb; color: #1e40af; padding: 1rem; margin-bottom: 1rem; border-radius: 0.375rem;" role="alert">
                    <p><?php echo $msg; ?></p>
                </div>
            <?php } elseif($warn) { ?>
                <div style="background: #fef3c7; border-left: 4px solid #f59e0b; color: #92400e; padding: 1rem; margin-bottom: 1rem; border-radius: 0.375rem;" role="alert">
                    <p><?php echo $warn; ?></p>
                </div>
            <?php } ?>
