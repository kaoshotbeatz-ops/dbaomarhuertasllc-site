// Palette: Cmd/Ctrl+K site navigation on the Popover API (top layer, light dismiss) with keyboard navigation.
export default function palette(el){
 const q=el.querySelector('input'),list=el.querySelector('ul'),items=[...list.querySelectorAll('li')];let opener;
 const vis=()=>items.filter(l=>!l.hidden);
 const filter=()=>{const v=q.value.trim().toLowerCase();let n=0;for(const l of items){l.hidden=!!v&&!l.dataset.k.includes(v);if(!l.hidden)n++}el.querySelector('.cmd-empty').hidden=n>0;items.forEach(l=>l.querySelector('a').tabIndex=l.hidden?-1:0)};
 const open=(from)=>{opener=from||document.activeElement;if(el.matches(':popover-open'))return;q.value='';filter();el.showPopover();q.focus()};
 el.addEventListener('island:open',e=>open(e.detail));
 el.addEventListener('toggle',e=>{if(e.newState==='closed'&&opener&&opener.focus)opener.focus()});
 q.addEventListener('input',filter);
 el.addEventListener('keydown',e=>{const v=vis().map(l=>l.querySelector('a')),i=v.indexOf(document.activeElement);
  if(e.key==='ArrowDown'){e.preventDefault();(v[i+1]||v[0])?.focus()}else if(e.key==='ArrowUp'){e.preventDefault();(i<=0?q:v[i-1]).focus()}
  else if(e.key==='Enter'&&document.activeElement===q&&v[0]){e.preventDefault();location.href=v[0].href}else if(e.key==='Escape'){el.hidePopover()}});
 open();
}
