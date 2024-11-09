/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import {useThemeConfig} from '@docusaurus/theme-common';
import Logo from '@theme/Logo';
import CollapseButton from '@theme/DocSidebar/Desktop/CollapseButton';
import Content from '@theme/DocSidebar/Desktop/Content';
import type {Props} from '@theme/DocSidebar/Desktop';

function DocSidebarDesktop({path, sidebar, onCollapse, isHidden: isHiddenProp}: Props) {
  const [isHidden, setIsHidden] = useState(true); // 預設為隱藏狀態

  const {
    navbar: {hideOnScroll},
    docs: {
      sidebar: {hideable},
    },
  } = useThemeConfig();

  useEffect(() => {
    setIsHidden(isHiddenProp);
  }, [isHiddenProp]);

  return (
    <div
      className={clsx(
        'sidebar',
        hideOnScroll && 'sidebarWithHideableNavbar',
        isHidden && 'sidebarHidden',
      )}>
      {hideOnScroll && <Logo tabIndex={-1} className="sidebarLogo" />}
      <Content path={path} sidebar={sidebar} />
      {hideable && (
        <CollapseButton 
          onClick={() => {
            setIsHidden(!isHidden);
            onCollapse();
          }} 
        />
      )}
    </div>
  );
}

export default React.memo(DocSidebarDesktop);
