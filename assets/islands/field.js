// Field: the calm, centred facet light behind the home hero (WebGL2; the CSS gradient in .field stays as the fallback).
// A quieter cut of the studio's facet island: fewer, larger cells, light centred on the headline, fades toward the stage.
const GLSL=`#version 300 es
precision highp float;uniform vec2 res,mouse;uniform float time,scroll,fade;out vec4 O;
vec2 h2(vec2 p){return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);}
float hs(float p){return fract(sin(p*78.233)*43758.5453);}
void main(){vec2 uv=gl_FragCoord.xy/res;float asp=res.x/res.y;vec2 p=vec2(uv.x*asp,1.-uv.y);p=p*3.6+vec2(time*.03,scroll*1.2);
vec2 n=floor(p),f=fract(p);float d1=8.,d2=8.,id=0.;
for(int j=-1;j<=1;j++)for(int k=-1;k<=1;k++){vec2 g=vec2(k,j);vec2 o=h2(n+g);vec2 oo=.5+.38*sin(time*.25+6.2831*o);vec2 r=g+oo-f;float d=dot(r,r);if(d<d1){d2=d1;d1=d;id=dot(n+g,vec2(1.,57.));}else if(d<d2)d2=d;}
float edge=1.-smoothstep(0.,.016,sqrt(d2)-sqrt(d1));vec2 nrm=normalize(vec2(hs(id)-.5,hs(id+3.1)-.5)+1e-3);
vec2 m=vec2(mouse.x*asp,1.-mouse.y),q=vec2(uv.x*asp,1.-uv.y);vec2 dir=normalize(m-q);
float lit=clamp(dot(nrm,dir)*.5+.5,0.,1.),ds=exp(-length(m-q)*1.5);
vec3 deep=vec3(.012,.19,.13),em=vec3(.063,.725,.506),ice=vec3(.75,.93,.88),champ=vec3(.9,.835,.66);
vec3 c=mix(deep,em,pow(lit,2.2)*(.55+.45*hs(id+9.)));c=mix(c,ice,pow(lit,9.)*.5*ds+.08*ds);c=mix(c,champ,edge*(.18+.22*ds));
float a=.09+.3*pow(lit,2.4)+edge*(.08+.4*ds)+ds*.55;a*=smoothstep(.0,.55,uv.y)*fade*.42;
a+=(hs(gl_FragCoord.x+gl_FragCoord.y*917.+time)-.5)*.02;a=clamp(a,0.,1.);O=vec4(c*a,a);}`;
export default function field(el,ctx){
 if(ctx.reduce||document.documentElement.classList.contains('a11y-nomotion'))return;
 const cv=el.querySelector('canvas');if(!cv)return;
 const gl=cv.getContext('webgl2',{alpha:true,premultipliedAlpha:true,antialias:false,powerPreference:'low-power'});if(!gl)return;
 const sh=(t,s)=>{const o=gl.createShader(t);gl.shaderSource(o,s);gl.compileShader(o);if(!gl.getShaderParameter(o,gl.COMPILE_STATUS))throw gl.getShaderInfoLog(o);return o};
 const pr=gl.createProgram();
 try{gl.attachShader(pr,sh(gl.VERTEX_SHADER,'#version 300 es\nin vec2 p;void main(){gl_Position=vec4(p,0.,1.);}'));gl.attachShader(pr,sh(gl.FRAGMENT_SHADER,GLSL));}catch{return}
 gl.linkProgram(pr);if(!gl.getProgramParameter(pr,gl.LINK_STATUS))return;gl.useProgram(pr);
 const b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);const lp=gl.getAttribLocation(pr,'p');gl.enableVertexAttribArray(lp);gl.vertexAttribPointer(lp,2,gl.FLOAT,false,0,0);
 const U=n=>gl.getUniformLocation(pr,n),uR=U('res'),uM=U('mouse'),uT=U('time'),uS=U('scroll'),uF=U('fade');
 gl.enable(gl.BLEND);gl.blendFunc(gl.ONE,gl.ONE_MINUS_SRC_ALPHA);
 const S={w:0,h:0,mx:.5,my:.4,gx:.5,gy:.4,t0:performance.now(),scroll:0,fade:0,loop:0,vis:true},scale=Math.min(devicePixelRatio||1,1.5)*.5;
 const size=()=>{S.w=Math.max(2,Math.round(cv.clientWidth*scale));S.h=Math.max(2,Math.round(cv.clientHeight*scale));if(cv.width!==S.w||cv.height!==S.h){cv.width=S.w;cv.height=S.h;gl.viewport(0,0,S.w,S.h)}};
 el.parentNode.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();S.gx=(e.clientX-r.left)/r.width;S.gy=(e.clientY-r.top)/r.height},{passive:true});
 addEventListener('scroll',()=>{S.scroll=Math.min(1,scrollY/Math.max(1,innerHeight))},{passive:true});
 const live=()=>S.vis&&!document.hidden;
 const step=now=>{S.loop=0;if(!live())return;size();S.mx+=(S.gx-S.mx)*.06;S.my+=(S.gy-S.my)*.06;S.fade=Math.min(1,S.fade+.02);gl.uniform2f(uR,S.w,S.h);gl.uniform2f(uM,S.mx,S.my);gl.uniform1f(uT,(now-S.t0)/1000);gl.uniform1f(uS,S.scroll);gl.uniform1f(uF,S.fade);gl.drawArrays(gl.TRIANGLES,0,3);S.loop=requestAnimationFrame(step)};
 const go=()=>{if(!S.loop&&live())S.loop=requestAnimationFrame(step)};
 new IntersectionObserver(es=>{S.vis=es[0].isIntersecting;go()}).observe(el);
 cv.addEventListener('webglcontextlost',e=>{e.preventDefault();el.classList.remove('on')});
 go();el.classList.add('on');
 return {pause(){cancelAnimationFrame(S.loop);S.loop=0},resume:go};
}
