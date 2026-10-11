/* Omar Huertas LLC: progressive enhancements that work on every page.
   1. Contact / support forms post to Web3Forms without leaving the page (the form also works as a plain HTML post).
   2. The accessibility toolbar (high contrast, larger text, reduced motion), remembered per visitor.
   3. The engraved plates draw themselves once they scroll into view (still when motion is reduced). */
/* ============ PLATES ============ */
(function(){
  var plates = document.querySelectorAll('[data-plate]'); if(!plates.length) return;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.classList.contains('a11y-nomotion');
  if(reduce || !('IntersectionObserver' in window)){ plates.forEach(function(p){ p.classList.add('in'); }); return; }
  var io = new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }); }, {threshold:.25});
  plates.forEach(function(p){ if(p.classList.contains('hero-plate')) setTimeout(function(){ p.classList.add('in'); }, 700); else io.observe(p); });
})();
/* ============ HEADER: condenses on scroll; full-screen menu sheet (focus-trapped, Esc closes) ============ */
(function(){
  var hdr = document.querySelector('[data-hdr]');
  if(hdr){
    var on = false, raf = 0;
    var check = function(){ raf = 0; var s = window.scrollY > 24; if(s !== on){ on = s; hdr.classList.toggle('is-scrolled', s); } };
    window.addEventListener('scroll', function(){ if(!raf) raf = requestAnimationFrame(check); }, {passive:true}); check();
  }
  var sheet = document.querySelector('[data-sheet]'), opener = document.querySelector('[data-sheet-open]');
  if(!sheet || !opener) return;
  var last = null, FOCUS = 'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])';
  function open(){ last = document.activeElement; sheet.hidden = false; document.documentElement.classList.add('sheet-open'); opener.setAttribute('aria-expanded','true'); requestAnimationFrame(function(){ sheet.classList.add('open'); var f = sheet.querySelector(FOCUS); if(f) f.focus(); }); }
  function close(){ sheet.classList.remove('open'); document.documentElement.classList.remove('sheet-open'); opener.setAttribute('aria-expanded','false'); var done = function(){ sheet.hidden = true; }; var m = matchMedia('(prefers-reduced-motion: reduce)').matches; if(m) done(); else setTimeout(done, 420); if(last && last.focus) last.focus(); }
  opener.addEventListener('click', function(){ sheet.hidden ? open() : close(); });
  sheet.addEventListener('click', function(e){ if(e.target.closest('[data-sheet-close]') || e.target.closest('a[href]')) close(); });
  document.addEventListener('keydown', function(e){
    if(sheet.hidden) return;
    if(e.key === 'Escape'){ e.preventDefault(); close(); return; }
    if(e.key !== 'Tab') return;
    var f = sheet.querySelectorAll(FOCUS); if(!f.length) return;
    var first = f[0], end = f[f.length-1];
    if(e.shiftKey && document.activeElement === first){ e.preventDefault(); end.focus(); }
    else if(!e.shiftKey && document.activeElement === end){ e.preventDefault(); first.focus(); }
  });
  matchMedia('(min-width: 901px)').addEventListener('change', function(m){ if(m.matches && !sheet.hidden) close(); });
})();

(function(){
  document.querySelectorAll('[data-year]').forEach(function(el){ el.textContent = new Date().getFullYear(); });

  // contact form -> Web3Forms (real send, no email app) with mailto fallback
  var form = document.querySelector('[data-contact-form]');
  if(form){
    var status = form.querySelector('.form-status');
    var submitBtn = form.querySelector('button[type=submit]');
    if(/[?&]sent=1/.test(location.search) && status){ status.innerHTML = '&#10003; Message sent. Thank you! We&rsquo;ll get back to you shortly.'; }
    form.addEventListener('submit', async function(e){
      e.preventDefault();
      var d = new FormData(form);
      d.delete('redirect');
      var nm = (d.get('name')||'').replace(/[<>]/g,'');
      var keyEl = form.querySelector('[name=access_key]');
      var hasKey = keyEl && keyEl.value && keyEl.value.indexOf('PASTE') === -1;
      if(hasKey){
        status.textContent = 'Sending…'; if(submitBtn) submitBtn.disabled = true;
        try{
          if(!d.get('subject')) d.set('subject', 'New website inquiry from ' + (nm||'a visitor'));
          d.set('from_name', 'Omar Huertas LLC website');
          var r = await fetch('https://api.web3forms.com/submit', { method:'POST', body:d });
          var j = await r.json();
          if(j.success){ status.innerHTML = '&#10003; Message sent' + (nm?(', '+nm):'') + '. Thank you! We&rsquo;ll get back to you shortly.'; form.reset(); }
          else { throw new Error(j.message||'failed'); }
        }catch(err){
          status.innerHTML = 'Sorry, that didn&rsquo;t go through. Please email us directly at <strong>omar@dbaomarhuertasllc.com</strong>.';
        }
        if(submitBtn) submitBtn.disabled = false;
        return;
      }
      // Fallback (no key yet): mailto + clear confirmation
      var subject = encodeURIComponent('Website inquiry from ' + (nm || 'prospect'));
      var body = 'Name: ' + (d.get('name')||'') + '%0D%0AEmail: ' + (d.get('email')||'') +
                 '%0D%0ACompany: ' + (d.get('company')||'') + '%0D%0A%0D%0A' + (d.get('message')||'');
      status.innerHTML = '&#10003; Thanks' + (nm ? (', ' + nm) : '') + '! Opening your email app to send to <strong>omar@dbaomarhuertasllc.com</strong>. If nothing opens, just email us there directly.';
      try { window.location.href = 'mailto:omar@dbaomarhuertasllc.com?subject=' + subject + '&body=' + body; } catch(err){}
    });
  }
})();

/* ============ ACCESSIBILITY TOOLBAR ============ */
(function(){
  var root = document.documentElement, store;
  try { store = window.localStorage; } catch(e){ store = { getItem:function(){return null}, setItem:function(){} }; }
  var OPTS = [['contrast','High contrast'],['large','Larger text'],['nomotion','Reduce motion']];
  OPTS.forEach(function(o){ try{ if(store.getItem('a11y-'+o[0])==='1') root.classList.add('a11y-'+o[0]); }catch(e){} });

  var fab = document.createElement('button');
  fab.className='a11y-fab'; fab.type='button';
  fab.setAttribute('aria-label','Accessibility options'); fab.setAttribute('aria-expanded','false'); fab.setAttribute('aria-controls','a11y-panel');
  fab.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="4.5" r="1.8"/><path d="M5 9.5c4.6 1.2 9.4 1.2 14 0M12 10v4.5M12 14.5 8.5 21M12 14.5l3.5 6.5"/></svg>';
  var panel = document.createElement('div');
  panel.className='a11y-panel'; panel.id='a11y-panel'; panel.setAttribute('role','dialog'); panel.setAttribute('aria-label','Accessibility options');
  panel.innerHTML = '<h2>Accessibility</h2>' + OPTS.map(function(o){ return '<div class="a11y-opt"><span id="a11y-l-'+o[0]+'">'+o[1]+'</span><button type="button" data-k="'+o[0]+'" aria-pressed="false" aria-labelledby="a11y-l-'+o[0]+'">Off</button></div>'; }).join('');
  document.body.appendChild(fab); document.body.appendChild(panel);

  function syncBtns(){
    panel.querySelectorAll('button[data-k]').forEach(function(b){
      var on = root.classList.contains('a11y-'+b.dataset.k);
      b.setAttribute('aria-pressed', on?'true':'false'); b.textContent = on?'On':'Off';
    });
  }
  function applyMotion(){
    document.querySelectorAll('video').forEach(function(v){
      if(root.classList.contains('a11y-nomotion')){ try{v.pause();}catch(e){} } else { try{v.play();}catch(e){} }
    });
  }
  fab.addEventListener('click', function(){
    var open = panel.classList.toggle('open'); fab.setAttribute('aria-expanded', open?'true':'false');
    if(open){ var first = panel.querySelector('button'); if(first) first.focus(); }
  });
  panel.addEventListener('click', function(e){
    var b = e.target.closest('button[data-k]'); if(!b) return;
    var cls='a11y-'+b.dataset.k, on=root.classList.toggle(cls);
    try{ store.setItem(cls, on?'1':'0'); }catch(err){}
    syncBtns(); if(b.dataset.k==='nomotion') applyMotion();
  });
  document.addEventListener('keydown', function(e){ if(e.key==='Escape' && panel.classList.contains('open')){ panel.classList.remove('open'); fab.setAttribute('aria-expanded','false'); fab.focus(); }});
  syncBtns(); applyMotion();
})();
