import React, { type ReactNode, useState, useCallback } from 'react';
import clsx from 'clsx';
import { ThemeClassNames } from '@docusaurus/theme-common';
import { useDocsSidebar } from '@docusaurus/theme-common/internal';
import { useLocation } from '@docusaurus/router';
import DocSidebar from '@theme/DocSidebar';
import ExpandButton from '@theme/DocRoot/Layout/Sidebar/ExpandButton';
import type { Props } from '@theme/DocRoot/Layout/Sidebar';

import styles from './styles.module.css';

function ResetOnSidebarChange({ children }: { children: ReactNode }) {
  const sidebar = useDocsSidebar();
  return (
    <React.Fragment key={sidebar?.name ?? 'noSidebar'}>{children}</React.Fragment>
  );
}

export default function DocRootLayoutSidebar({
  sidebar,
  hiddenSidebarContainer,
  setHiddenSidebarContainer,
}: Props): JSX.Element {
  const { pathname } = useLocation();

+  // 将初始状态设置为 true，使侧边栏默认隐藏
+  const [hiddenSidebar, setHiddenSidebar] = useState(true);

  const toggleSidebar = useCallback(() => {
+    setHiddenSidebar((prev) => !prev);
+    setHiddenSidebarContainer((prev) => !prev);
  }, [setHiddenSidebarContainer]);

  return (
    <aside
      className={clsx(
        ThemeClassNames.docs.docSidebarContainer,
        styles.docSidebarContainer,
        hiddenSidebarContainer && styles.docSidebarContainerHidden,
      )}
      onTransitionEnd={(e) => {
        if (
          !e.currentTarget.classList.contains(styles.docSidebarContainer!)
        ) {
          return;
        }

+        if (!hiddenSidebarContainer) {
+          setHiddenSidebar(false);
+        }
      }}>
      <ResetOnSidebarChange>
        <div
          className={clsx(
            styles.sidebarViewport,
            hiddenSidebar && styles.sidebarViewportHidden,
          )}>
          <DocSidebar
            sidebar={sidebar}
            path={pathname}
            onCollapse={toggleSidebar}
            isHidden={hiddenSidebar}
          />
          {hiddenSidebar && <ExpandButton toggleSidebar={toggleSidebar} />}
        </div>
      </ResetOnSidebarChange>
    </aside>
  );
}