import React, { useEffect } from 'react';

const ChatwootWidget = () => {
  useEffect(() => {
    function loadCCWidget() {
      (new window["click-connector-widget"]).mount({});
    }
    function loadCCScript() {
      var t = document.createElement("script");
      t.id = "cc-widget-script";
      t.setAttribute("data-widget-id", "piu03u-4ljgo");
      t.type = "text/javascript";
      t.defer = true;
      t.addEventListener("load", function(t) {
        loadCCWidget();
      });
      t.src = "https://widget.clickconnector.app/widget.js";
      document.getElementsByTagName("head")[0].appendChild(t);
    }
    loadCCScript();
  }, []);

  return null; // This component doesn't render anything to the UI
};

export default ChatwootWidget;
