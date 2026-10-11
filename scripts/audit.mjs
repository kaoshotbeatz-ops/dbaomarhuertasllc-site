#!/usr/bin/env node
// a11y + overflow audit: node scripts/audit.mjs <baseUrl>
import {createRequire} from 'node:module';import {homedir} from 'node:os';import {join} from 'node:path';import {readFileSync} from 'node:fs';
const require=createRequire(import.meta.url);const root=join(homedir(),'.albena-a11y-tools/node_modules/');const pw=require(root+'playwright-core');const axe=readFileSync(root+'axe-core/axe.min.js','utf8');
const base=process.argv[2];const paths=['/','/about.html','/services.html','/industries.html','/support.html','/contact.html','/security.html','/servicenow-lexicon/','/privacy-policy.html','/terms.html','/legal.html','/accessibility.html','/no-such-page'];
const b=await pw.chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});let bad=0;
for(const [name,vp] of [['320',{width:320,height:700}],['1440',{width:1440,height:900}]]){const ctx=await b.newContext({viewport:vp,reducedMotion:'reduce',bypassCSP:true});const p=await ctx.newPage();
 for(const u of paths){await p.goto(base+u,{waitUntil:'networkidle'});await p.addScriptTag({content:axe});
  const r=await p.evaluate(()=>axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa','best-practice']}}));
  const ov=await p.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
  const v=r.violations.map(x=>x.id+':'+x.nodes.length+' '+x.nodes[0].target.join(' ')+' | '+x.nodes[0].failureSummary.split('\n')[1]);if(v.length||ov>0)bad++;console.log(name,u,'axe',v.length?v:0,'overflow',ov)}
 await ctx.close()}
await b.close();process.exit(bad?1:0);
