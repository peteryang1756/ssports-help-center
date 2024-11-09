import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useThemeConfig } from '@docusaurus/theme-common';
import Logo from '@theme/Logo';
import CollapseButton from '@theme/DocSidebar/Desktop/CollapseButton';
import Content from '@theme/DocSidebar/Desktop/Content';
import type { Props } from '@theme/DocSidebar/Desktop';

import styles from './styles.module.css';

function DocSidebarDesktop({ path, sidebar }: Props) {
  const {
    navbar: { hideOnScroll },
    docs: {
      sidebar: { hideable },
    },
  } = useThemeConfig();

  // Initialize the sidebar as hidden
  const [isHidden, setIsHidden] = useState(true);

  // Optional: Persist the sidebar state across sessions using localStorage
  useEffect(() => {
    const storedState = localStorage.getItem('sidebarHidden');
    if (storedState !== null) {
      setIsHidden(storedState === 'true');
    }
  }, []);

  // Update localStorage whenever isHidden changes
  useEffect(() => {
    localStorage.setItem('sidebarHidden', isHidden.toString());
  }, [isHidden]);

  // Function to toggle the sidebar visibility
  const handleToggleSidebar = () => {
    setIsHidden(!isHidden);
  };

  return (
    <div
      className={clsx(
        styles.sidebar,
        hideOnScroll && styles.sidebarWithHideableNavbar,
        isHidden && styles.sidebarHidden,
      )}>
      {hideOnScroll && <Logo tabIndex={-1} className={styles.sidebarLogo} />}
      
      {/* Render the collapse button at the top */}
      {hideable && (
        <CollapseButton onClick={handleToggleSidebar} isCollapsed={isHidden} />
      )}
      
      {/* Only render the content if the sidebar is not hidden */}
      {!isHidden && <Content path={path} sidebar={sidebar} />}
    </div>
  );
}

export default React.memo(DocSidebarDesktop);
