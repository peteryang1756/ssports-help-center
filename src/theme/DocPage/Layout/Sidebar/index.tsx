import React, { type ReactNode, useState, useEffect } from 'react';
import clsx from 'clsx';
import { ThemeClassNames } from '@docusaurus/theme-common';
import { useDocsSidebar } from '@docusaurus/theme-common/internal';
import { useLocation } from '@docusaurus/router';
import DocSidebar from '@theme/DocSidebar';
import type { Props } from '@theme/DocPage/Layout/Sidebar';

import styles from './styles.module.css';

function ResetOnSidebarChange({ children }: { children: ReactNode }) {
  const sidebar = useDocsSidebar();
  return (
    <React.Fragment key={sidebar?.name ?? 'noSidebar'}>
      {children}
    </React.Fragment>
  );
}

export default function DocPageLayoutSidebar({
  sidebar,
  hiddenSidebarContainer,
  setHiddenSidebarContainer,
}: Props): JSX.Element {
  const { pathname } = useLocation();

  const [hiddenSidebar, setHiddenSidebar] = useState(true);

  useEffect(() => {
    // 隱藏 sidebar 在初始加載時
    setHiddenSidebarContainer(true);
  }, [setHiddenSidebarContainer]);

  return (
    <aside
      className={clsx(
        ThemeClassNames.docs.docSidebarContainer,
        styles.docSidebarContainer,
        hiddenSidebarContainer && styles.docSidebarContainerHidden,
      )}
      onTransitionEnd={(e) => {
        if (!e.currentTarget.classList.contains(styles.docSidebarContainer!)) {
          return;
        }

        // 保持 sidebar 隱藏狀態
        if (hiddenSidebarContainer) {
          setHiddenSidebar(true);
        }
      }}>
      <ResetOnSidebarChange>
        <DocSidebar
          sidebar={sidebar}
          path={pathname}
          isHidden={hiddenSidebar}
        />
      </ResetOnSidebarChange>
    </aside>
  );
}
