#!/usr/bin/env node
// Element clips for review: node scripts/clip.mjs <url> <outPrefix> <width> <selector>[,<selector>...]
import {createRequire} from 'node:module';import {homedir} from 'node:os';import {join} from 'node:path';
const require=createRequire(import.meta.url);const pw=require(join(homedir(),'.albena-a11y-tools/node_modules/playwright-core'));
const [url,out,w,sels]=process.argv.slice(2);const width=Number(w);
const b=await pw.chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
const ctx=await b.newContext({viewport:{width,height:900},isMobile:width<700,deviceScaleFactor:1,reducedMotion:'reduce'});const p=await ctx.newPage();
await p.goto(url,{waitUntil:'networkidle'});await p.evaluate(()=>{for(const f of document.querySelectorAll('[data-plate]'))f.classList.add('in')});await p.waitForTimeout(800);
let i=0;for(const s of sels.split(',')){const el=p.locator(s).first();await el.scrollIntoViewIfNeeded();await p.waitForTimeout(300);await el.screenshot({path:`${out}-${i++}.png`});}
await b.close();
