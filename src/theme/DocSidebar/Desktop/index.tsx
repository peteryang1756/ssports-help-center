import React, {useState} from 'react';
import clsx from 'clsx';
import {useThemeConfig} from '@docusaurus/theme-common';
import Logo from '@theme/Logo';
import CollapseButton from '@theme/DocSidebar/Desktop/CollapseButton';
import Content from '@theme/DocSidebar/Desktop/Content';
import type {Props} from '@theme/DocSidebar/Desktop';

import styles from './styles.module.css';

function DocSidebarDesktop({path, sidebar, onCollapse}: Props) {
  const {
    navbar: {hideOnScroll},
    docs: {
      sidebar: {hideable},
    },
  } = useThemeConfig();

  // 設定 isHidden 為 true，使側邊欄預設隱藏
  const [isHidden, setIsHidden] = useState(true);

  // 切換顯示/隱藏側邊欄
  const toggleSidebar = () => setIsHidden(!isHidden);

  return (
    <div
      className={clsx(
        styles.sidebar,
        hideOnScroll && styles.sidebarWithHideableNavbar,
        isHidden && styles.sidebarHidden, // 當 isHidden 為 true 時隱藏
      )}>
      {hideOnScroll && <Logo tabIndex={-1} className={styles.sidebarLogo} />}
      <Content path={path} sidebar={sidebar} />
      {hideable && <CollapseButton onClick={onCollapse} />}
      {/* 新增切換顯示/隱藏的按鈕 */}
      <button onClick={toggleSidebar} className={styles.toggleButton}>
        {isHidden ? 'Show Sidebar' : 'Hide Sidebar'}
      </button>
    </div>
  );
}

export default React.memo(DocSidebarDesktop);
