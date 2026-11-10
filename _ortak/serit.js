/* Perabayt konsept çalışması şeridi.
 * Her demoya tek satırla eklenir: <script src="/_ortak/serit.js" defer></script>
 * Sol kenarda küçük, dikey bir sekme; üzerine gelince (ya da dokununca) "Siteye dön" açılır.
 * Bağlantı tek yerde: Perabayt adresi değişirse yalnızca SITE değişir. */
(function () {
  var SITE = "https://perabayt-new.vercel.app/calismalarimiz";
  if (window.top !== window.self) return; // sayfa başka bir sayfanın içinde (iframe) açıldıysa gösterme
  if (document.getElementById("perabayt-serit")) return;

  var css =
    "#perabayt-serit,#perabayt-serit *{box-sizing:border-box}" +
    "#perabayt-serit{position:fixed;left:0;top:50%;z-index:2147483646;transform:translateY(-50%);" +
    "display:flex;align-items:center;gap:8px;height:96px;width:26px;padding:0 0 0 5px;overflow:hidden;" +
    "background:rgba(18,18,16,.86);color:#f3f1ea;border:1px solid rgba(255,255,255,.14);border-left:0;" +
    "border-radius:0 12px 12px 0;box-shadow:0 6px 20px rgba(0,0,0,.25);text-decoration:none;" +
    "font:600 12px/1 system-ui,-apple-system,'Segoe UI',sans-serif;letter-spacing:.02em;" +
    "transition:width .25s ease,background .25s ease;-webkit-tap-highlight-color:transparent;" +
    "backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px)}" +
    "#perabayt-serit .ps-dikey{writing-mode:vertical-rl;transform:rotate(180deg);font-size:10px;" +
    "letter-spacing:.18em;text-transform:uppercase;color:#c6e35c;white-space:nowrap;flex:none}" +
    "#perabayt-serit .ps-acik{display:flex;flex-direction:column;gap:4px;white-space:nowrap;opacity:0;transition:opacity .2s ease}" +
    "#perabayt-serit .ps-acik small{font-weight:500;font-size:11px;color:rgba(243,241,234,.7)}" +
    "#perabayt-serit:hover,#perabayt-serit:focus-visible,#perabayt-serit.ps-ac{width:178px;background:rgba(18,18,16,.95)}" +
    "#perabayt-serit:hover .ps-acik,#perabayt-serit:focus-visible .ps-acik,#perabayt-serit.ps-ac .ps-acik{opacity:1}" +
    "#perabayt-serit:focus-visible{outline:2px solid #c6e35c;outline-offset:2px}" +
    // Telefonda yazının üstüne binmesin: kapalıyken 10 px'lik ince bir tutamak, dokununca açılır
    "@media (max-width:760px){#perabayt-serit:not(.ps-ac){width:10px;height:72px;padding:0;border-radius:0 8px 8px 0;" +
    "background:rgba(18,18,16,.72);box-shadow:none}" +
    "#perabayt-serit:not(.ps-ac) .ps-dikey{opacity:0}" +
    "#perabayt-serit:not(.ps-ac)::after{content:'';position:absolute;left:3px;top:18px;bottom:18px;width:3px;border-radius:2px;background:#c6e35c}" +
    "#perabayt-serit.ps-ac{padding-left:5px}}" +
    "@media print{#perabayt-serit{display:none}}" +
    "@media (prefers-reduced-motion:reduce){#perabayt-serit,#perabayt-serit .ps-acik{transition:none}}";

  function kur() {
    var stil = document.createElement("style");
    stil.textContent = css;
    document.head.appendChild(stil);

    var a = document.createElement("a");
    a.id = "perabayt-serit";
    a.href = SITE;
    a.target = "_top";
    a.rel = "noopener";
    a.setAttribute("aria-label", "Perabayt konsept çalışması. Perabayt sitesine dön");
    a.innerHTML =
      '<span class="ps-dikey">Perabayt</span>' +
      '<span class="ps-acik">← Siteye dön<small>Perabayt konsept çalışması</small></span>';

    // Dokunmatik ekranda ilk dokunuş sekmeyi açar, ikinci dokunuş siteye götürür.
    var dokunmatik = window.matchMedia && window.matchMedia("(hover: none)").matches;
    a.addEventListener("click", function (e) {
      if (dokunmatik && !a.classList.contains("ps-ac")) {
        e.preventDefault();
        a.classList.add("ps-ac");
        setTimeout(function () { a.classList.remove("ps-ac"); }, 3500);
      }
    });
    document.body.appendChild(a);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", kur);
  else kur();
})();
