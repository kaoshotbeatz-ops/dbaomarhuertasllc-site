// Runtime: loads an "island" module only when its element nears the viewport (or on demand).
// <div data-island="facet"> -> /assets/islands/facet.js, default export (el, ctx). See docs/ARCHITECTURE.md.
const R=document.documentElement,flags=new Set((R.dataset.flags||'').split(/\s+/).filter(Boolean));
const ctx={reduce:matchMedia('(prefers-reduced-motion: reduce)').matches,fine:matchMedia('(hover:hover) and (pointer:fine)').matches,
 scrollTimeline:CSS.supports('animation-timeline: view()'),flags,flag:n=>flags.has(n),
 // every island may expose a pause/resume pair; the runtime pauses them when the tab is hidden
 live:new Set()};
const loaded=new Map();
export const load=async(name,el)=>{if(!loaded.has(name))loaded.set(name,import(`/assets/islands/${name}.js`).catch(e=>{console.warn('island',name,e);return null}));const m=await loaded.get(name);if(m&&m.default&&!el.dataset.ready){el.dataset.ready='1';try{const h=await m.default(el,ctx);if(h)ctx.live.add(h)}catch(e){console.warn('island',name,e)}}};
const io='IntersectionObserver' in window?new IntersectionObserver(es=>{for(const e of es)if(e.isIntersecting){io.unobserve(e.target);load(e.target.dataset.island,e.target)}},{rootMargin:'240px'}):null;
for(const el of document.querySelectorAll('[data-island]')){const need=el.dataset.needs;if(need&&!ctx[need])continue;if(el.dataset.flag&&!flags.has(el.dataset.flag))continue;if(el.dataset.lazy==='idle')(window.requestIdleCallback||setTimeout)(()=>load(el.dataset.island,el));else if(io&&el.dataset.lazy!=='now')io.observe(el);else load(el.dataset.island,el)}
// on-demand islands: any [data-open-island] button, and Cmd/Ctrl+K for the palette
addEventListener('click',e=>{const b=e.target.closest('[data-open-island]');if(b){const el=document.getElementById(b.dataset.openIsland);if(el)load(el.dataset.island,el).then(()=>el.dispatchEvent(new CustomEvent('island:open',{detail:b})))}});
addEventListener('keydown',e=>{if((e.key==='k'||e.key==='K')&&(e.metaKey||e.ctrlKey)){const el=document.getElementById('cmd');if(!el)return;e.preventDefault();load('palette',el).then(()=>el.dispatchEvent(new CustomEvent('island:open')))}});
document.addEventListener('visibilitychange',()=>{for(const h of ctx.live)(document.hidden?h.pause:h.resume)?.()});
R.dataset.rt='1';
