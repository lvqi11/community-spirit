const pendoApiKey = '7051f51d-0d8f-412b-8c52-1c3b5127f0ee';
const pendoScriptUrl = `https://cdn.pendo.io/agent/static/${pendoApiKey}/pendo.js`;
const eventAliases = {
  pulse_joined: "join_pulse",
  pulse_checked_in: "check_in",
  benefit_claimed: "claim_reward",
  benefit_activated: "activate_benefit",
  benefit_redeemed: "redeem_benefit",
  workflow_json_exported: "export_workflow"
};
const debugVersion = "2026-06-18-novus-signal-v1";

export function initProductAnalytics() {
  if (!pendoApiKey || typeof window === "undefined") return;
  const debug = getAnalyticsDebug();
  debug.version = debugVersion;
  debug.apiKey = pendoApiKey;
  debug.scriptUrl = pendoScriptUrl;
  debug.initStartedAt = new Date().toISOString();
  persistAnalyticsDebug(debug);
  markAnalyticsStatus("init-started");
  installPendoSnippet(pendoApiKey);
  window.pendo.initialize({
    visitor: {
      id: "synthetic-demo-visitor",
      type: "judge",
      data_mode: "fictional_or_synthetic_only"
    },
    account: {
      id: "community-spirit-demo",
      name: "Community Spirit Demo",
      release: "0.2.0"
    }
  });
  window.pendo.pageLoad?.();
  trackProductEvent("novus_install_ping", {
    source: "app_init",
    page: window.location.pathname
  });
}

export function trackProductEvent(eventName, metadata = {}) {
  if (typeof window === "undefined") return;
  const payload = {
    ...metadata,
    app: "community-spirit",
    data_policy: "fictional_or_synthetic_only"
  };
  const debug = getAnalyticsDebug();
  debug.version = debugVersion;
  debug.events.push({ eventName, payload, at: new Date().toISOString() });
  persistAnalyticsDebug(debug);

  if (!window.pendo) {
    debug.missingPendoCount += 1;
    persistAnalyticsDebug(debug);
    return;
  }

  sendPendoEvent(eventName, payload);
  if (eventAliases[eventName]) {
    sendPendoEvent(eventAliases[eventName], payload);
  }
}

function installPendoSnippet(apiKey) {
  if (window.pendo?.initialize) return;
  (function installPendo(p, e, n, d, o) {
    let v;
    let w;
    let x;
    let y;
    let z;
    o = p[d] = p[d] || {};
    o._q = o._q || [];
    v = ["initialize", "identify", "updateOptions", "pageLoad", "track", "trackAgent"];
    for (w = 0, x = v.length; w < x; ++w) {
      (function queueMethod(method) {
        o[method] =
          o[method] ||
          function queueCall() {
            o._q[method === v[0] ? "unshift" : "push"]([method].concat([].slice.call(arguments, 0)));
          };
      })(v[w]);
    }
    y = e.createElement(n);
    y.async = true;
    y.src = `https://cdn.pendo.io/agent/static/${apiKey}/pendo.js`;
    y.onload = function markPendoLoaded() {
      const debug = getAnalyticsDebug();
      debug.scriptLoadedAt = new Date().toISOString();
      persistAnalyticsDebug(debug);
      markAnalyticsStatus("script-loaded");
    };
    y.onerror = function markPendoLoadError() {
      const debug = getAnalyticsDebug();
      debug.scriptErrorAt = new Date().toISOString();
      debug.scriptError = "pendo.js failed to load";
      persistAnalyticsDebug(debug);
      markAnalyticsStatus("script-error");
    };
    z = e.getElementsByTagName(n)[0];
    z.parentNode.insertBefore(y, z);
  })(window, document, "script", "pendo");
}

function sendPendoEvent(eventName, payload) {
  window.pendo.track?.(eventName, payload);
  window.pendo.trackAgent?.(eventName, payload);
}

function getAnalyticsDebug() {
  window.__communitySpiritAnalytics =
    window.__communitySpiritAnalytics ||
    {
      apiKey: null,
      version: debugVersion,
      scriptUrl: null,
      initStartedAt: null,
      scriptLoadedAt: null,
      scriptErrorAt: null,
      scriptError: null,
      missingPendoCount: 0,
      events: []
    };
  return window.__communitySpiritAnalytics;
}

function persistAnalyticsDebug(debug) {
  try {
    window.localStorage.setItem("communitySpiritAnalyticsDebug", JSON.stringify(debug));
  } catch {
    // Local storage can be unavailable in restricted browser modes.
  }
}

function markAnalyticsStatus(status) {
  document.documentElement.dataset.communitySpiritAnalytics = status;
  document.documentElement.dataset.communitySpiritAnalyticsVersion = debugVersion;
}
