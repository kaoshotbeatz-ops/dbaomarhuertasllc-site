// The Lexicon's search: filters the chapters in place (no network). "/" focuses the box; Escape clears it.
const form=document.querySelector('[data-lexicon-search]');
if(form){
 const q=form.querySelector('input'),count=form.querySelector('[data-lexicon-count]'),total=count.textContent;
 const arts=[...document.querySelectorAll('details.lex')],groups=[...document.querySelectorAll('.lex-group')],empty=document.querySelector('.lex-empty'),toc=document.querySelector('.lex-toc');
 const run=()=>{const v=q.value.trim().toLowerCase();let n=0;
  for(const a of arts){const hit=!v||a.dataset.k.includes(v);a.hidden=!hit;if(hit)n++;if(v&&hit&&n<=3)a.open=true}
  for(const g of groups){let el=g.nextElementSibling,any=false;while(el&&!el.classList.contains('lex-group')){if(el.matches('details.lex')&&!el.hidden){any=true;break}el=el.nextElementSibling}g.hidden=!!v&&!any}
  if(toc)toc.hidden=!!v;empty.hidden=n>0;count.textContent=v?`${n} of ${arts.length} chapters match “${q.value.trim()}”.`:total};
 q.addEventListener('input',run);form.addEventListener('submit',e=>{e.preventDefault();run()});
 addEventListener('keydown',e=>{if(e.key==='/'&&!/input|textarea/i.test(document.activeElement.tagName)){e.preventDefault();q.focus()}if(e.key==='Escape'&&document.activeElement===q){q.value='';run()}});
 const openHash=()=>{if(!location.hash)return;const t=document.querySelector(location.hash);if(t&&t.matches('details'))t.open=true;if(t)t.scrollIntoView()};addEventListener('hashchange',openHash);openHash();
}
