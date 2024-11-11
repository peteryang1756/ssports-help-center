import React, { useEffect } from 'react';

const ChatScript = () => {
  useEffect(() => {
    (function(d, t) {
      const g = d.createElement(t);
      const s = d.getElementsByTagName(t)[0];
      g.src = "https://ssportlivechat.onrender.com/embed.js";
      s.parentNode.insertBefore(g, s);
      g.onload = function() {
        new window.ChaskiqMessengerEncrypted({
          domain: 'https://ssportlivechat.onrender.com',
          ws: 'wss://ssportlivechat.onrender.com/cable',
          app_id: "egXA8jUz5tjZq5UE3xUkH7mH",
          data: "YOUR_ENCRYPTED_JWE_DATA",
          lang: "USER_LANG_OR_DEFAULTS_TO_BROWSER_LANG"
        });
      };
    })(document, "script");
  }, []);

  return null;
};

export default ChatScript;