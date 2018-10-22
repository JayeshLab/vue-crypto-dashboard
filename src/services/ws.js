function noop() {}

export default function (url, opts) {
  opts = opts || {};

  let k, ws, num, $={}, self=this;
  let ms=opts.timeout || 1e3, max=opts.maxAttempts || Infinity;

  $.onmessage = opts.onmessage || noop;

  $.onclose = e => {
    e.endpoint = url;
    (e.code !== 1e3 && e.code !== 1005) && self.reconnect(e);
    (opts.onclose || noop)(e);
  };

  $.onerror = e => {
    e.endpoint = url;
    (e && e.code==='ECONNREFUSED') ? self.reconnect(e) : (opts.onerror || noop)(e);
  };

  $.onopen = e => {
    e.endpoint = url;
    num=0; (opts.onopen || noop)(e);
  };

  self.open = () => {
    ws = new WebSocket(url, opts.protocols);
    for (k in $) ws[k] = $[k];
  };

  self.reconnect = e => {
    (num++ < max) ? setTimeout(() => {
      (opts.onreconnect || noop)(e);
      self.open();
    }, ms) : (opts.onmaximum || noop)(e);
  };

  self.close = (x, y) => {
    ws.close(x, y);
  };

  self.open(); // init

  return self;
}