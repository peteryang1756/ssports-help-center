import React, { useState } from 'react';
import clsx from 'clsx';
import { useThemeConfig } from '@docusaurus/theme-common';
import Logo from '@theme/Logo';
import CollapseButton from '@theme/DocSidebar/Desktop/CollapseButton';
import Content from '@theme/DocSidebar/Desktop/Content';
import type { Props } from '@theme/DocSidebar/Desktop';

import styles from './styles.module.css';

function DocSidebarDesktop({ path, sidebar, onCollapse }: Props) {
  const {
    navbar: { hideOnScroll },
    docs: {
      sidebar: { hideable },
    },
  } = useThemeConfig();

  // State to manage the visibility of the sidebar
  const [isHidden, setIsHidden] = useState(true);

  const handleToggleSidebar = () => {
    setIsHidden(!isHidden);
    if (onCollapse) {
      onCollapse();
    }
  };

  return (
    <div
      className={clsx(
        styles.sidebar,
        hideOnScroll && styles.sidebarWithHideableNavbar,
        isHidden && styles.sidebarHidden,
      )}
    >
      {hideOnScroll && <Logo tabIndex={-1} className={styles.sidebarLogo} />}
      <Content path={path} sidebar={sidebar} />
      {hideable && <CollapseButton onClick={handleToggleSidebar} />}
    </div>
  );
}

export default React.memo(DocSidebarDesktop);
