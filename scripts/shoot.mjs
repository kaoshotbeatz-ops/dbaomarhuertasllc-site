#!/usr/bin/env node
// Page screenshots: node scripts/shoot.mjs <baseUrl> <outDir> <prefix> [pages=home,about,...] [widths=1440,390]
// Writes two captures per page and width: a true first screen at scrollY 0 (-fold) and the full page.
import {createRequire} from 'node:module';import {homedir} from 'node:os';import {join} from 'node:path';import {mkdir} from 'node:fs/promises';
const require=createRequire(import.meta.url);const pw=require(process.env.PLAYWRIGHT_CORE||join(homedir(),'.albena-a11y-tools/node_modules/playwright-core'));
const [base,out,prefix,only,widths]=process.argv.slice(2);await mkdir(out,{recursive:true});
export const ALL={home:'/',services:'/services.html',about:'/about.html',industries:'/industries.html',apps:'/apps.html','operations-platform':'/operations-platform.html',support:'/support.html',contact:'/contact.html',security:'/security.html',lexicon:'/servicenow-lexicon/',privacy:'/privacy-policy.html',terms:'/terms.html',legal:'/legal.html',accessibility:'/accessibility.html','404':'/404.html'};
const pages=only?Object.fromEntries(only.split(',').map(k=>[k,ALL[k]])):ALL;
const ws=(widths||'1440,390').split(',').map(Number);
const b=await pw.chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
for(const w of ws){const mobile=w<700;const ctx=await b.newContext({viewport:{width:w,height:mobile?844:900},isMobile:mobile,hasTouch:mobile,deviceScaleFactor:1,reducedMotion:process.env.REDUCE?'reduce':'no-preference'});const p=await ctx.newPage();
 for(const [n,u] of Object.entries(pages)){await p.goto(base+u,{waitUntil:'networkidle'});await p.waitForTimeout(2600);
  const label=w===1440?'desktop':w===390?'mobile':String(w);
  await p.screenshot({path:`${out}/${prefix}-${n}-${label}-fold.png`,fullPage:false});
  await p.evaluate(async()=>{for(const i of document.images){i.loading='eager'}await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));for(const f of document.querySelectorAll('[data-plate],.reveal,.stage'))f.classList.add('in');document.documentElement.style.scrollBehavior='auto';const h=document.documentElement.scrollHeight;for(let y=0;y<h;y+=600){scrollTo(0,y);await new Promise(r=>setTimeout(r,40))}scrollTo(0,0)});await p.waitForTimeout(3600);
  await p.screenshot({path:`${out}/${prefix}-${n}-${label}.png`,fullPage:true});}
 await ctx.close();}
await b.close();
