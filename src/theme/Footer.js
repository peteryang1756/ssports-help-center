import React from 'react';
import Footer from '@theme-original/Footer';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { MendableFloatingButton } from '@mendable/search';
import ChatwootWidget from '../components/ChatwootWidget';

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
      <ChatwootWidget />
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <h2 className="footer-section-title">組織</h2>
            <ul className="footer-list">
              <li className="footer-list-item">
                <a href="https://ssangyongsports.eu.org/blog" className="footer-link">部落格</a>
              </li>
              <li className="footer-list-item">
                <a href="https://ssangyongsports.eu.org/contact" className="footer-link">聯繫</a>
              </li>
              <li className="footer-list-item">
                <a id="footer-badge" href="https://status.ssangyongsports.eu.org" className="footer-link">
                  載入狀態中
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="footer-section-title">體育</h2>
            <ul className="footer-list">
              <li className="footer-list-item">
                <a href="https://slb.ssport.eu.org/" className="footer-link">雙龍職棒</a>
              </li>
              <li className="footer-list-item">
                <a href="https://sba.ssangyongsports.eu.org/" className="footer-link">雙龍職籃</a>
              </li>
              <li className="footer-list-item">
                <a href="https://js.ssangyongsports.eu.org/" className="footer-link">雙龍足球</a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="footer-section-title">條款</h2>
            <ul className="footer-list">
              <li className="footer-list-item">
                <a href="https://ssangyongsports.eu.org/p" className="footer-link">隱私政策</a>
              </li>
              <li className="footer-list-item">
                <a href="https://ssangyongsports.eu.org/t" className="footer-link">服務條款</a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="footer-section-title">雙龍體育TV</h2>
            <ul className="footer-list">
              <li className="footer-list-item">
                <a href="https://ssangyongsports.eu.org/tv" className="footer-link">官網</a>
              </li>
              <li className="footer-list-item">
                <a href="https://ssangyongsports.eu.org/contact?mode=tv" className="footer-link">註冊</a>
              </li>
              <li className="footer-list-item">
                <a href="https://ssangyongsports.org/watch-tv" className="footer-link">登入</a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="footer-section-title">幫助</h2>
            <ul className="footer-list">
              <li className="footer-list-item">
                <a href="https://ssangyongsports.eu.org/support" className="footer-link">幫助中心</a>
              </li>
              <li className="footer-list-item">
                <a href="https://backed-live.ssport.eu.org/" className="footer-link">線上客服</a>
              </li>
              <li className="footer-list-item">
                <a href="https://forum.ssangyongsports.eu.org/d/1" className="footer-link">論壇</a>
              </li>
              <li className="footer-list-item">
                <a href="https://ssangyongsports.eu.org/contact" className="footer-link">聯繫</a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="footer-divider" />

        <div className="footer-bottom">
          <div className="footer-logo">
            <a href="https://ssangyongsports.eu.org/">
              <img src="https://ssangyongsports.eu.org/logo.png" alt="雙龍體育Logo" />
            </a>
          </div>

          <span className="footer-copyright">
            Copyright © 2024 
            <a href="https://ssangyongsports.eu.org/" className="footer-link">雙龍體育</a>
            保留一切權利。
          </span>

          <div className="social-links">
            <a href="https://www.facebook.com/ssangyongsports/" target="_blank">
              <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M22 12c0-4.991-3.657-9.128-8.438-9.878v6.987h2.54V12h-2.54v2.203c0 2.506-1.492 3.89-3.777 3.89-1.094 0-2.238-.1[...]"></path>
              </svg>
            </a>

            <a href="https://twitter.com/ssport_org" target="_blank">
              <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.6[...]"></path>
              </svg>
            </a>

            <a href="https://www.instagram.com/ssangyong_sports/" className="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.[...]"></path>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}