
(function(){
  const year = document.querySelectorAll('[data-year]');
  year.forEach(el => el.textContent = new Date().getFullYear());
  const items = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{ if(entry.isIntersecting){ entry.target.classList.add('visible'); }});
  },{threshold:.12});
  items.forEach(i=>obs.observe(i));

  const form = document.querySelector('[data-contact-form]');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const data = new FormData(form);
      const name = encodeURIComponent(data.get('name') || '');
      const email = encodeURIComponent(data.get('email') || '');
      const company = encodeURIComponent(data.get('company') || '');
      const message = encodeURIComponent(data.get('message') || '');
      const subject = encodeURIComponent('Website inquiry from ' + (data.get('name') || 'prospect'));
      const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0ACompany: ${company}%0D%0A%0D%0A${message}`;
      window.location.href = `mailto:contact@dbaomarhuertasllc.com?subject=${subject}&body=${body}`;
    });
  }
})();
