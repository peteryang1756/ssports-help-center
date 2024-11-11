import React from 'react';
import Footer from '@theme-original/Footer';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { MendableFloatingButton } from '@mendable/search';

export default function FooterWrapper(props) {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();

  const icon = (
    <img
      src="https://88ij.vercel.app/1000001111-removebg-preview.png?text=Logo"
      alt="Logo"
    />
  );
  
  const popupText = '詢問任何問題?';
  const welcomeMessage = '任何需要雙龍體育協助的嗎?';

  const floatingButtonStyle = {
    color: '#e2e8f0',
    backgroundColor: '#000000',
  };

  return (
    <>
      <MendableFloatingButton
        icon={icon}
        dismissPopupAfter={1}
        welcomeMessage={welcomeMessage}
        messageSettings={{ hideSources: true }} // Fixed object syntax
        floatingButtonStyle={floatingButtonStyle}
        anon_key="d24adf46-bada-44ef-a25b-94d01fe6fb3e"
        dialogPlaceholder="如何聯繫雙龍體育?"
        
      />
      <Footer {...props} />
    </>
  );
}
