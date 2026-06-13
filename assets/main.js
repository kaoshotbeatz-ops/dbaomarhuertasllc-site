
(function(){
  // year stamp
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

  // sticky header shadow
  var header = document.getElementById('header');
  if(header){
    var onScroll = function(){ header.classList.toggle('scrolled', window.scrollY > 8); };
    onScroll(); window.addEventListener('scroll', onScroll, {passive:true});
  }

  // count-up animation
  function animateCount(el){
    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    if(el.getAttribute('data-plain')){ el.textContent = target + suffix; return; }
    var dur = 1400, start = null;
    function step(ts){
      if(!start) start = ts;
      var p = Math.min((ts - start)/dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if(p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // reveal + trigger bars/counts on view
  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(!entry.isIntersecting) return;
      var t = entry.target;
      t.classList.add('visible');
      t.querySelectorAll('.bar span[data-w]').forEach(function(s){ s.style.width = s.getAttribute('data-w') + '%'; });
      var num = t.querySelector('[data-count]');
      if(num && !num._counted){ num._counted = true; animateCount(num); }
      obs.unobserve(t);
    });
  }, {threshold:.18});
  document.querySelectorAll('.reveal').forEach(function(i){ obs.observe(i); });

  // animate hero card bars immediately (above the fold)
  setTimeout(function(){
    document.querySelectorAll('.hero-card .bar span[data-w]').forEach(function(s){ s.style.width = s.getAttribute('data-w') + '%'; });
  }, 350);

  // ---------- Next-level interactions ----------
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // scroll progress bar
  var prog = document.createElement('div'); prog.id = 'scroll-progress'; document.body.appendChild(prog);
  // back-to-top
  var top = document.createElement('button'); top.className = 'to-top'; top.setAttribute('aria-label','Back to top'); top.innerHTML = '&uarr;';
  top.addEventListener('click', function(){ window.scrollTo({top:0, behavior:'smooth'}); });
  document.body.appendChild(top);
  function onScrollFx(){
    var st = window.scrollY, h = document.documentElement.scrollHeight - window.innerHeight;
    prog.style.width = (h > 0 ? (st/h*100) : 0) + '%';
    top.classList.toggle('show', st > 600);
  }
  onScrollFx(); window.addEventListener('scroll', onScrollFx, {passive:true});

  if(!reduce){
    // cursor glow
    var glow = document.createElement('div'); glow.id = 'cursor-glow'; document.body.appendChild(glow);
    window.addEventListener('mousemove', function(e){
      glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px'; glow.style.opacity = '1';
    }, {passive:true});
    window.addEventListener('mouseout', function(){ glow.style.opacity = '0'; });

    // 3D tilt on cards
    document.querySelectorAll('.card,.pillar,.outcome').forEach(function(el){
      el.classList.add('tilt');
      el.addEventListener('mousemove', function(e){
        var r = el.getBoundingClientRect();
        var px = (e.clientX - r.left)/r.width - .5, py = (e.clientY - r.top)/r.height - .5;
        el.style.transform = 'perspective(900px) rotateX(' + (-py*5) + 'deg) rotateY(' + (px*5) + 'deg) translateY(-5px)';
      });
      el.addEventListener('mouseleave', function(){ el.style.transform = ''; });
    });

    // magnetic primary buttons
    document.querySelectorAll('.btn-primary').forEach(function(b){
      b.addEventListener('mousemove', function(e){
        var r = b.getBoundingClientRect();
        b.style.transform = 'translate(' + ((e.clientX-r.left-r.width/2)*.22) + 'px,' + ((e.clientY-r.top-r.height/2)*.30) + 'px)';
      });
      b.addEventListener('mouseleave', function(){ b.style.transform = ''; });
    });

    // live-fluctuating hero metrics (subtle)
    var bars = document.querySelectorAll('.hero-card .bar span[data-w]');
    if(bars.length){
      setInterval(function(){
        bars.forEach(function(s){
          var base = +s.getAttribute('data-w');
          var jitter = base + (Math.sin(Date.now()/900 + base) * 1.5);
          s.style.width = Math.max(0, Math.min(100, jitter)) + '%';
        });
      }, 1200);
    }
  }

  // contact form -> mailto
  var form = document.querySelector('[data-contact-form]');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var d = new FormData(form);
      var subject = encodeURIComponent('Website inquiry from ' + (d.get('name') || 'prospect'));
      var body = 'Name: ' + (d.get('name')||'') + '%0D%0AEmail: ' + (d.get('email')||'') +
                 '%0D%0ACompany: ' + (d.get('company')||'') + '%0D%0A%0D%0A' + (d.get('message')||'');
      window.location.href = 'mailto:contact@dbaomarhuertasllc.com?subject=' + subject + '&body=' + body;
    });
  }
})();

/* ============ ACCESSIBILITY ============ */
(function(){
  var root = document.documentElement, store = window.localStorage;
  // apply saved prefs
  ['contrast','large','nomotion'].forEach(function(k){
    if(store.getItem('a11y-'+k)==='1') root.classList.add('a11y-'+k);
  });

  // ensure main landmark + skip link
  var main = document.querySelector('main'); if(main && !main.id) main.id='main';
  var skip = document.createElement('a');
  skip.className='skip-link'; skip.href='#main'; skip.textContent='Skip to content';
  document.body.insertBefore(skip, document.body.firstChild);

  // toolbar
  var fab = document.createElement('button');
  fab.className='a11y-fab'; fab.type='button';
  fab.setAttribute('aria-label','Accessibility options'); fab.setAttribute('aria-expanded','false');
  fab.innerHTML='&#9855;'; // wheelchair/accessibility glyph
  var panel = document.createElement('div');
  panel.className='a11y-panel'; panel.setAttribute('role','dialog'); panel.setAttribute('aria-label','Accessibility options');
  panel.innerHTML =
    '<h3>Accessibility</h3>'+
    '<div class="a11y-opt"><span>High contrast</span><button data-k="contrast" aria-pressed="false">Off</button></div>'+
    '<div class="a11y-opt"><span>Larger text</span><button data-k="large" aria-pressed="false">Off</button></div>'+
    '<div class="a11y-opt"><span>Reduce motion</span><button data-k="nomotion" aria-pressed="false">Off</button></div>';
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
  });
  panel.addEventListener('click', function(e){
    var b = e.target.closest('button[data-k]'); if(!b) return;
    var cls='a11y-'+b.dataset.k, on=root.classList.toggle(cls);
    store.setItem(cls, on?'1':'0'); syncBtns(); if(b.dataset.k==='nomotion') applyMotion();
  });
  document.addEventListener('keydown', function(e){ if(e.key==='Escape'){ panel.classList.remove('open'); fab.setAttribute('aria-expanded','false'); }});
  syncBtns(); applyMotion();

  // decorative icon boxes shouldn't be read
  document.querySelectorAll('.icon-box,.pmono,.brand-mark,.av,.grain,.aurora,#cursor-glow').forEach(function(el){
    el.setAttribute('aria-hidden','true');
  });
})();
