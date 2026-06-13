
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
