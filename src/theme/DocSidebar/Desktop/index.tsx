import React from 'react';
import {useThemeConfig} from '@docusaurus/theme-common';
import type {Props} from '@theme/DocSidebar/Desktop';


function DocSidebarDesktop({path, sidebar, onCollapse}: Props) {
  // 不渲染任何內容，使側邊欄完全隱藏
  return null;
}

export default React.memo(DocSidebarDesktop);
