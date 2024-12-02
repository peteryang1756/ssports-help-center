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
          <a href="https://ssangyongsports.eu.org/blog" className="footer-link">
            部落格
          </a>
        </li>
        <li className="footer-list-item">
          <a
            href="https://ssangyongsports.eu.org/contact"
            className="footer-link"
          >
            聯繫
          </a>
        </li>
        <li className="footer-list-item">
          <a
            id="footer-badge"
            href="https://status.ssangyongsports.eu.org"
            className="footer-link"
          >
            載入狀態中
          </a>
        </li>
      </ul>
    </div>
    <div>
      <h2 className="footer-section-title">體育</h2>
      <ul className="footer-list">
        <li className="footer-list-item">
          <a href="https://slb.ssport.eu.org/" className="footer-link">
            雙龍職棒
          </a>
        </li>
        <li className="footer-list-item">
          <a href="https://sba.ssangyongsports.eu.org/" className="footer-link">
            雙龍職籃
          </a>
        </li>
        <li className="footer-list-item">
          <a href="https://js.ssangyongsports.eu.org/" className="footer-link">
            雙龍足球
          </a>
        </li>
      </ul>
    </div>
    <div>
      <h2 className="footer-section-title">條款</h2>
      <ul className="footer-list">
        <li className="footer-list-item">
          <a href="https://ssangyongsports.eu.org//p" className="footer-link">
            隱私政策
          </a>
        </li>
        <li className="footer-list-item">
          <a href="https://ssangyongsports.eu.org//t" className="footer-link">
            服務條款
          </a>
        </li>
      </ul>
    </div>
    <div>
      <h2 className="footer-section-title">雙龍體育TV</h2>
      <ul className="footer-list">
        <li className="footer-list-item">
          <a href="https://ssangyongsports.eu.org//tv" className="footer-link">
            官網
          </a>
        </li>
        <li className="footer-list-item">
          <a
            href="https://ssangyongsports.eu.org/contact?mode=tv"
            className="footer-link"
          >
            註冊
          </a>
        </li>
        <li className="footer-list-item">
          <a
            href="https://ssangyongsports.eu.org/watch-tv"
            className="footer-link"
          >
            登入
          </a>
        </li>
      </ul>
    </div>
    <div>
      <h2 className="footer-section-title">幫助</h2>
      <ul className="footer-list">
        <li className="footer-list-item">
          <a
            href="https://ssangyongsports.eu.org/support"
            className="footer-link"
          >
            幫助中心
          </a>
        </li>
        <li className="footer-list-item">
          <a href="https://backed-live.ssport.eu.org/" className="footer-link">
            線上客服
          </a>
        </li>
        <li className="footer-list-item">
          <a
            href="https://forum.ssangyongsports.eu.org/"
            className="footer-link"
          >
            論壇
          </a>
        </li>
        <li className="footer-list-item">
          <a
            href="https://ssangyongsports.eu.org/contact"
            className="footer-link"
          >
            聯繫
          </a>
        </li>
      </ul>
    </div>
  </div>
  <hr className="footer-divider" />
  <div className="footer-bottom">
    <div className="footer-logo">
      <a href="/">
        <img src="https://ssangyongsports.eu.org/logo.png" alt="雙龍體育Logo" />
      </a>
    </div>
    <span className="footer-copyright">
      Copyright © 2024
      <a href="https://ssangyongsports.eu.org/" className="footer-link">
        雙龍體育
      </a>
      保留一切權利。
    </span>
    <div className="social-links">
      <a href="https://www.facebook.com/ssangyongsports/" target="_blank">
        <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      </a>
      <a href="https://twitter.com/ssport_org" target="_blank">
        <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      </a>
      <a
        href="https://www.instagram.com/ssangyong_sports/"
        classname="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={16}
          height={16}
          fill="currentColor"
          classname="bi bi-instagram"
          viewBox="0 0 16 16"
        >
          <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
        </svg>
      </a>
    </div>
  </div>
</footer>

    </>
  );
}
