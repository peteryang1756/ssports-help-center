import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import {useThemeConfig} from '@docusaurus/theme-common';
import Logo from '@theme/Logo';
import CollapseButton from '@theme/DocSidebar/Desktop/CollapseButton';
import Content from '@theme/DocSidebar/Desktop/Content';
import type {Props} from '@theme/DocSidebar/Desktop';

function DocSidebarDesktop({path, sidebar, onCollapse, isHidden}: Props) {
  const {
    navbar: {hideOnScroll},
    docs: {
      sidebar: {hideable = true}, // Make hideable default to true
    },
  } = useThemeConfig();

  const [hidden, setHidden] = useState(true); // Set initial state to hidden

  // Call onCollapse to sync with parent state if necessary
  useEffect(() => {
    if (hidden && onCollapse) {
      onCollapse();
    }
  }, [hidden, onCollapse]);

  return (
    <div
      className={clsx(
        'sidebar', // Use plain string class names
        hideOnScroll && 'sidebarWithHideableNavbar',
        hidden && 'sidebarHidden',
      )}>
      {hideOnScroll && <Logo tabIndex={-1} className="sidebarLogo" />}
      <Content path={path} sidebar={sidebar} />
      {hideable && <CollapseButton onClick={() => setHidden(!hidden)} />} {/* Toggle visibility */}
    </div>
  );
}

export default React.memo(DocSidebarDesktop);
