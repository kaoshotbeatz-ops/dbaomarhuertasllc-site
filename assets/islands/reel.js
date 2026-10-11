// Reel: the tribute video. Nothing downloads until the figure nears the viewport; then it plays muted in a loop
// unless motion is reduced (system setting or the a11y toolbar), in which case it waits for the visitor to press play.
export default function reel(el,ctx){
 const v=el.querySelector('video');if(!v)return;
 const quiet=()=>ctx.reduce||document.documentElement.classList.contains('a11y-nomotion');
 v.preload='auto';if(!quiet()){v.muted=true;v.autoplay=true;v.play().catch(()=>{})}
 return {pause(){if(!v.paused)v.pause()},resume(){if(!quiet()&&v.paused&&!v.ended)v.play().catch(()=>{})}};
}
