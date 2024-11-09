import React from 'react';
import {useThemeConfig} from '@docusaurus/theme-common';
import type {Props} from '@theme/DocSidebar/Desktop';

function DocSidebarDesktop({path, sidebar, onCollapse, isHidden}: Props) {
  // Sidebar is completely removed
  return null;
}

export default React.memo(DocSidebarDesktop);
