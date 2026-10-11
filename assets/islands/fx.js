// FX: cursor-spotlight borders (one rect read per frame) and magnetic CTAs. Fine pointers only; no-op with reduced motion.
export default function fx(_el,ctx){
 if(!ctx.fine||ctx.reduce)return;
 let pend=null,raf=0;
 document.addEventListener('pointermove',e=>{const c=e.target.closest?.('.lit');if(!c)return;pend={c,x:e.clientX,y:e.clientY};if(!raf)raf=requestAnimationFrame(()=>{raf=0;const r=pend.c.getBoundingClientRect();pend.c.style.setProperty('--mx',(pend.x-r.left)+'px');pend.c.style.setProperty('--my',(pend.y-r.top)+'px')})},{passive:true});
 for(const b of document.querySelectorAll('.button,.mag')){let r=null;
  b.addEventListener('pointerenter',()=>{r=b.getBoundingClientRect()});
  b.addEventListener('pointermove',e=>{if(!r)r=b.getBoundingClientRect();b.style.translate=((e.clientX-r.left-r.width/2)*.18).toFixed(1)+'px '+((e.clientY-r.top-r.height/2)*.28).toFixed(1)+'px'},{passive:true});
  b.addEventListener('pointerleave',()=>{r=null;b.style.translate=''})}
}
