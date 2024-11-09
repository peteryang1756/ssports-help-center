import React, { useState } from 'react';
import clsx from 'clsx';
import { useThemeConfig } from '@docusaurus/theme-common';
import Logo from '@theme/Logo';
import CollapseButton from '@theme/DocSidebar/Desktop/CollapseButton';
import Content from '@theme/DocSidebar/Desktop/Content';
import type { Props } from '@theme/DocSidebar/Desktop';

function DocSidebarDesktop({ path, sidebar, onCollapse }: Props) {
  const {
    navbar: { hideOnScroll },
    docs: {
      sidebar: { hideable },
    },
  } = useThemeConfig();

  // 設定 isHidden 為 true，讓側邊欄預設隱藏
  const [isHidden, setIsHidden] = useState(true);

  return (
    <div
      style={{
        display: isHidden ? 'none' : 'block', // 預設隱藏側邊欄
        width: isHidden ? '0' : '250px', // 調整寬度，隱藏時為 0
        transition: 'width 0.3s', // 添加動畫效果
      }}
      className={clsx(
        hideOnScroll && 'sidebarWithHideableNavbar' // 可選的 hideOnScroll 類名
      )}
    >
      {hideOnScroll && <Logo tabIndex={-1} style={{ marginBottom: '1rem' }} />}
      <Content path={path} sidebar={sidebar} />
      {hideable && (
        <CollapseButton onClick={() => setIsHidden(!isHidden)} />
      )}
    </div>
  );
}

export default React.memo(DocSidebarDesktop);
