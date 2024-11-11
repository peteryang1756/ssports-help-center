/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import clsx from 'clsx';
import {translate} from '@docusaurus/Translate';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {useBackToTopButton} from '@docusaurus/theme-common/internal';

import styles from './styles.module.css';

export default function BackToTopButton(): JSX.Element {
  const {shown, scrollToTop} = useBackToTopButton({threshold: 300});
  return (
    <div></div>
  );
}
