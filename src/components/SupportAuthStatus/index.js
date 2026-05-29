import React, {useEffect, useMemo, useState} from 'react';
import styles from './styles.module.css';

const SUPPORT_ORIGIN = 'https://support.sysports.de';
const BRIDGE_ORIGIN = 'https://storage.sysports.de';
const BRIDGE_URL = `${BRIDGE_ORIGIN}/auth-bridge.html`;
const LOGIN_URL = `${SUPPORT_ORIGIN}/login.php?do=ext&bk=oauth2.user.p1i1`;
const TICKETS_URL = `${SUPPORT_ORIGIN}/tickets.php`;

function labelFor(status) {
  switch (status) {
    case 'authenticated':
      return '已登入客服系統';
    case 'anonymous':
      return '尚未登入客服系統';
    case 'error':
    case 'unknown':
      return '無法確認登入狀態';
    default:
      return '正在確認客服登入狀態…';
  }
}

export default function SupportAuthStatus() {
  const [state, setState] = useState({status: 'checking', user: null});

  useEffect(() => {
    let timeoutId;

    function onMessage(event) {
      if (event.origin !== BRIDGE_ORIGIN) return;
      const data = event.data || {};
      if (data.source !== 'sysports-support-auth-bridge') return;

      if (['checking', 'authenticated', 'anonymous', 'unknown', 'error'].includes(data.status)) {
        setState({
          status: data.status,
          user: data.user || null,
          message: data.message || '',
        });
      }
    }

    window.addEventListener('message', onMessage);
    timeoutId = window.setTimeout(() => {
      setState((current) => current.status === 'checking'
        ? {status: 'unknown', user: null, message: 'auth bridge timeout'}
        : current);
    }, 7000);

    return () => {
      window.removeEventListener('message', onMessage);
      window.clearTimeout(timeoutId);
    };
  }, []);

  const statusClass = useMemo(() => {
    if (state.status === 'authenticated') return styles.signedIn;
    if (state.status === 'anonymous') return styles.signedOut;
    return styles.pending;
  }, [state.status]);

  return (
    <section className={styles.card} aria-live="polite">
      <iframe
        title="客服登入狀態檢查"
        src={BRIDGE_URL}
        className={styles.bridgeFrame}
        sandbox="allow-scripts allow-same-origin"
      />
      <div className={styles.copy}>
        <span className={`${styles.dot} ${statusClass}`} aria-hidden="true" />
        <div>
          <p className={styles.kicker}>客服工單系統</p>
          <h2 className={styles.title}>{labelFor(state.status)}</h2>
          {state.status === 'authenticated' && state.user && state.user.name ? (
            <p className={styles.description}>目前帳號：{state.user.name}</p>
          ) : state.status === 'anonymous' ? (
            <p className={styles.description}>登入後即可查看案件回覆進度與建立新工單。</p>
          ) : (
            <p className={styles.description}>若瀏覽器封鎖跨網站 Cookie，請直接開啟客服系統確認。</p>
          )}
        </div>
      </div>
      <div className={styles.actions}>
        {state.status === 'authenticated' ? (
          <a className={styles.primaryButton} href={TICKETS_URL}>查看我的工單</a>
        ) : (
          <a className={styles.primaryButton} href={LOGIN_URL}>登入客服系統</a>
        )}
        <a className={styles.secondaryButton} href={SUPPORT_ORIGIN}>開啟客服系統</a>
      </div>
    </section>
  );
}
