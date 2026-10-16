/* Apps page: category filter chips. Without JS every group is simply listed, with a jump nav. */
(function () {
  var chips = document.querySelector('[data-chips]');
  if (!chips) return;
  var btns = chips.querySelectorAll('button');
  var groups = document.querySelectorAll('[data-group]');
  var count = document.querySelector('[data-count]');
  chips.hidden = false;
  function apply(g) {
    var n = 0;
    groups.forEach(function (el) {
      var show = g === 'all' || el.getAttribute('data-group') === g;
      el.hidden = !show;
      if (show) n += el.querySelectorAll('.app').length;
    });
    btns.forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-g') === g ? 'true' : 'false'); });
    if (count) { count.hidden = false; count.textContent = 'Showing ' + n + (n === 1 ? ' app' : ' apps') + '.'; }
    try { history.replaceState(null, '', g === 'all' ? location.pathname : '#' + g); } catch (e) {}
  }
  btns.forEach(function (b) { b.addEventListener('click', function () { apply(b.getAttribute('data-g')); }); });
  var h = location.hash.slice(1);
  if (h && chips.querySelector('[data-g="' + h + '"]')) apply(h);
  /* only one preview plays at a time */
  document.addEventListener('play', function (e) {
    document.querySelectorAll('video').forEach(function (v) { if (v !== e.target) v.pause(); });
  }, true);
})();
