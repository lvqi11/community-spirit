const pendoApiKey = import.meta.env.VITE_PENDO_API_KEY;

export function initProductAnalytics() {
  if (!pendoApiKey || typeof window === "undefined") return;
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
}

export function trackProductEvent(eventName, metadata = {}) {
  if (typeof window === "undefined" || !window.pendo?.track) return;
  window.pendo.track(eventName, {
    ...metadata,
    app: "community-spirit",
    data_policy: "fictional_or_synthetic_only"
  });
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
    z = e.getElementsByTagName(n)[0];
    z.parentNode.insertBefore(y, z);
  })(window, document, "script", "pendo");
}
