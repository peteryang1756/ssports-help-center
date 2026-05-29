import React, {useEffect, useState} from 'react';

export const SUPPORT_ORIGIN = 'https://support.sysports.de';
export const SUPPORT_LOGIN_URL = `${SUPPORT_ORIGIN}/login.php`;
export const SUPPORT_TICKETS_URL = `${SUPPORT_ORIGIN}/tickets.php`;
export const SUPPORT_BRIDGE_URL = `${SUPPORT_ORIGIN}/auth-bridge.html`;

export function useSupportAuthStatus() {
  const [state, setState] = useState({status: 'checking', user: null, message: ''});

  useEffect(() => {
    let timeoutId;

    function onMessage(event) {
      if (event.origin !== SUPPORT_ORIGIN) return;
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

  return state;
}

export function SupportAuthBridgeFrame() {
  return (
    <iframe
      title="客服登入狀態檢查"
      src={SUPPORT_BRIDGE_URL}
      style={{
        border: 0,
        height: 1,
        left: -9999,
        opacity: 0,
        pointerEvents: 'none',
        position: 'absolute',
        top: 0,
        width: 1,
      }}
      sandbox="allow-scripts allow-same-origin"
    />
  );
}

export default function SupportAuthStatus() {
  return null;
}
