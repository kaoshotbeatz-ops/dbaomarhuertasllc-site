// Tilt: light pointer tilt + specular sweep for framed screenshots (.frame inside the island element).
export default function tilt(el,ctx){
 if(!ctx.fine||ctx.reduce)return;const f=el.querySelector('.frame')||el;
 el.addEventListener('pointermove',e=>{const r=f.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;f.style.setProperty('--ry',((x-.5)*6).toFixed(2)+'deg');f.style.setProperty('--rx',((.5-y)*5).toFixed(2)+'deg');f.style.setProperty('--sx',(x*100).toFixed(1)+'%');f.style.setProperty('--sy',(y*100).toFixed(1)+'%')},{passive:true});
 el.addEventListener('pointerleave',()=>{f.style.setProperty('--rx','0deg');f.style.setProperty('--ry','0deg')});
}
