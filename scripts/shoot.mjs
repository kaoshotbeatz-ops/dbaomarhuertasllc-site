#!/usr/bin/env node
// Page screenshots: node scripts/shoot.mjs <baseUrl> <outDir> <prefix> [pages=home,about,...] [widths=1440,390]
import {createRequire} from 'node:module';import {homedir} from 'node:os';import {join} from 'node:path';import {mkdir} from 'node:fs/promises';
const require=createRequire(import.meta.url);const pw=require(process.env.PLAYWRIGHT_CORE||join(homedir(),'.albena-a11y-tools/node_modules/playwright-core'));
const [base,out,prefix,only,widths]=process.argv.slice(2);await mkdir(out,{recursive:true});
export const ALL={home:'/',about:'/about.html',services:'/services.html',industries:'/industries.html',support:'/support.html',contact:'/contact.html',security:'/security.html',lexicon:'/servicenow-lexicon/',privacy:'/privacy-policy.html',terms:'/terms.html',legal:'/legal.html',accessibility:'/accessibility.html','404':'/no-such-page'};
const pages=only?Object.fromEntries(only.split(',').map(k=>[k,ALL[k]])):ALL;
const ws=(widths||'1440,390').split(',').map(Number);
const b=await pw.chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',args:['--enable-unsafe-webgpu','--use-angle=metal']});
for(const w of ws){const mobile=w<700;const ctx=await b.newContext({viewport:{width:w,height:mobile?844:900},isMobile:mobile,hasTouch:mobile,deviceScaleFactor:1,reducedMotion:process.env.REDUCE?'reduce':'no-preference'});const p=await ctx.newPage();
 for(const [n,u] of Object.entries(pages)){await p.goto(base+u,{waitUntil:'networkidle'});await p.waitForTimeout(2200);await p.evaluate(async()=>{for(const i of document.images){i.loading='eager'}await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})))});await p.waitForTimeout(400);
  const label=w===1440?'desktop':w===390?'mobile':String(w);await p.screenshot({path:`${out}/${prefix}-${n}-${label}.png`,fullPage:!process.env.FOLD});}
 await ctx.close();}
await b.close();
