// --- CONFIG ---
const BANNER_LINK = "https://sisuny.top/click?o=2&a=3126";
const BANNER_IMAGE = "https://github.com/deadforlov/stacy/blob/main/.gitkeep/jfytkWhy_o.jpg?raw=true"; // твоя картинка
const HIDE_HOURS = 24;           // на сколько часов скрывать после закрытия
const SHOW_DELAY_MS = 2000;      // задержка показа баннера, мс
// --- /CONFIG ---

(function () {
  const KEY = "mylfBannerDismissedUntil";
  const now = Date.now();
  const until = Number(localStorage.getItem(KEY) || 0);
  if (now < until) return;

  const css = `
  .mylf-banner{position:fixed;right:16px;bottom:16px;z-index:99999;
    display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:14px;
    background:rgba(0,0,0,.55);color:#fff;box-shadow:0 10px 30px rgba(0,0,0,.35);
    backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);
    width:min(320px,92vw);opacity:0;transform:translateY(10px);
    transition:opacity .35s ease,transform .35s ease;
    font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif}
  .mylf-banner.show{opacity:1;transform:translateY(0)}
  .mylf-banner a{display:flex;align-items:center;gap:12px;color:inherit;text-decoration:none;width:100%}
  .mylf-banner__img{width:56px;height:56px;flex:0 0 56px;border-radius:10px;overflow:hidden;background:rgba(255,255,255,.08);display:grid;place-items:center}
  .mylf-banner__img img{width:100%;height:100%;object-fit:contain}
  .mylf-banner__text{display:grid;gap:4px;line-height:1.15}
  .mylf-banner__title{font-weight:800;letter-spacing:.3px;font-size:16px}
  .mylf-banner__subtitle{font-size:13px;opacity:.9}
  .mylf-banner__close{position:absolute;top:6px;right:8px;width:28px;height:28px;border:0;border-radius:50%;
    background:rgba(255,255,255,.12);color:#fff;cursor:pointer;display:grid;place-items:center;
    transition:background .2s ease,transform .2s ease}
  .mylf-banner__close:hover{background:rgba(255,255,255,.2);transform:scale(1.05)}
  @media (max-width:480px){.mylf-banner{right:12px;left:12px;width:auto}.mylf-banner__img{width:48px;height:48px}}
  `;
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  const wrap = document.createElement("div");
  wrap.className = "mylf-banner";
  wrap.innerHTML = `
    <button class="mylf-banner__close" aria-label="Close" title="Close">✕</button>
    <a href="${BANNER_LINK}" target="_blank" rel="nofollow noopener">
      <div class="mylf-banner__img"><img src="${BANNER_IMAGE}" alt="Find Your MYLF"></div>
      <div class="mylf-banner__text">
        <div class="mylf-banner__title">Your hot girlfriend for the night</div>
        <div class="mylf-banner__subtitle">Click to view</div>
      </div>
    </a>
  `;
  document.body.appendChild(wrap);

  wrap.querySelector(".mylf-banner__close").addEventListener("click", () => {
    localStorage.setItem(KEY, String(Date.now() + HIDE_HOURS*60*60*1000));
    wrap.remove();
  });

  setTimeout(() => wrap.classList.add("show"), SHOW_DELAY_MS);
})();
