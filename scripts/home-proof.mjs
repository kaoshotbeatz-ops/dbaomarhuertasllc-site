// Home page proof sections (2026-10, design/proof-first): the "see it work" demo, the capability tiles and the proof strip.
// Everything here is a labelled demo UI with sample data. No client names, no statistics, no testimonials.
const chk=`<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 8.5 6.5 11.5 12.5 5"/></svg>`;
const STEPS=['Requested','Approved','Executed','Closed'];
const rec=(n,{id,title,type,risk,win,owner,cis,checks,on})=>`<div class="rec${on?' on':''}" id="rec-${n}" role="tabpanel" aria-labelledby="tab-${n}" data-rec data-step="0">
<div class="rec-h"><p class="mono rec-id">${id}</p><h3>${title}</h3><p class="rec-chips"><span class="chip">${type}</span><span class="chip ${risk[1]}">${risk[0]}</span></p></div>
<ol class="stepper" aria-label="Change state">${STEPS.map((s,i)=>`<li${i===0?' class="cur"':''} data-s="${i}"><i>${chk}</i>${s}</li>`).join('')}</ol>
<dl class="meta"><div><dt>Window</dt><dd>${win}</dd></div><div><dt>Assignment</dt><dd>${owner}</dd></div></dl>
<div class="rec-cols"><div><p class="mini-h">Affected configuration items</p><ul class="ci">${cis.map(c=>`<li><span class="mono">${c[0]}</span><em>${c[1]}</em></li>`).join('')}</ul></div>
<div><p class="mini-h">Pre-checks</p><ul class="pre">${checks.map(c=>`<li><span class="st"></span>${c}</li>`).join('')}</ul></div></div>
<div class="rec-act"><button type="button" class="btn btn-primary btn-sm" data-adv>Run pre-checks</button><button type="button" class="btn btn-ghost btn-sm" data-reset hidden>Reset demo</button></div>
<div class="audit"><p class="mini-h">Audit trail</p><ol class="audit-l" aria-live="polite"><li><span class="mono">00</span>Record created from a request (sample data)</li></ol></div>
</div>`;
export const DEMO=`<section id="demo" class="sec" aria-labelledby="demo-h"><div class="wrap">
<div class="head reveal"><p class="eyebrow">See it work</p><h2 class="h-section" id="demo-h">Click through a change record</h2><p class="sub">The quality bar, hands on. A demo interface with sample data: pick a change, run the pre-checks, approve, execute, close. Every step lands in the audit trail.</p></div>
<div class="demo reveal" data-demo>
<div class="demo-bar"><i></i><i></i><i></i><span>Change workspace</span><b class="chip amber">Demo UI &middot; sample data</b></div>
<div class="demo-body">
<div class="demo-list" role="tablist" aria-label="Sample change records" aria-orientation="vertical">
<button type="button" role="tab" id="tab-1" aria-selected="true" aria-controls="rec-1" class="on"><span class="mono">CHG-DEMO-101</span>Add a MID server for Discovery</button>
<button type="button" role="tab" id="tab-2" aria-selected="false" aria-controls="rec-2" tabindex="-1"><span class="mono">CHG-DEMO-102</span>Rotate integration credentials</button>
<button type="button" role="tab" id="tab-3" aria-selected="false" aria-controls="rec-3" tabindex="-1"><span class="mono">CHG-DEMO-103</span>Reclassify servers to CSDM classes</button>
</div>
<div class="demo-main">
${rec(1,{id:'CHG-DEMO-101',title:'Add a MID server for Discovery',type:'Normal change',risk:['Moderate risk','amber'],win:'Saturday 06:00 &ndash; 08:00',owner:'Platform team (sample)',cis:[['mid-server-02','MID server'],['disco-schedule-weekly','Schedule'],['svc-inventory','Business service']],checks:['Credentials scoped to read-only','Firewall rule reviewed','Rollback step written','ATF suite green on sub-production'],on:true})}
${rec(2,{id:'CHG-DEMO-102',title:'Rotate integration credentials',type:'Standard change',risk:['Low risk','green'],win:'Weekday 18:00 &ndash; 18:30',owner:'Integrations (sample)',cis:[['rest-spoke-billing','IntegrationHub spoke'],['cred-alias-erp','Credential alias'],['svc-orders','Business service']],checks:['New secret stored outside the instance export','Connection test passes','Previous secret kept for rollback','Owner notified'],on:false})}
${rec(3,{id:'CHG-DEMO-103',title:'Reclassify servers to CSDM classes',type:'Normal change',risk:['Moderate risk','amber'],win:'Sunday 02:00 &ndash; 04:00',owner:'CMDB owners (sample)',cis:[['srv-app-014','Linux server'],['srv-db-003','Database host'],['svc-reporting','Business service']],checks:['Identification rules dry-run clean','Duplicate report reviewed','Reconciliation precedence confirmed','Snapshot taken for rollback'],on:false})}
</div></div></div>
<p class="note reveal">This is a built-for-the-page demo, not a client system and not a live instance. It shows how we think about a change: checks first, approval by a person, execution on the record, an audit trail at the end. <a href="/operations-platform.html">See Obvera, in development</a>.</p>
</div></section>`;

const ico={
 cmdb:`<svg viewBox="0 0 120 64"><path d="M60 12 28 34M60 12 60 34M60 12 92 34M28 34 16 54M28 34 40 54M60 34 60 54M92 34 80 54M92 34 104 54"/><circle class="c" cx="60" cy="12" r="6"/><circle cx="28" cy="34" r="4"/><circle cx="60" cy="34" r="4"/><circle cx="92" cy="34" r="4"/><circle cx="16" cy="54" r="3"/><circle cx="40" cy="54" r="3"/><circle cx="60" cy="54" r="3"/><circle cx="80" cy="54" r="3"/><circle cx="104" cy="54" r="3"/></svg>`,
 itam:`<svg viewBox="0 0 120 64"><rect x="8" y="10" width="30" height="44" rx="4"/><rect x="45" y="10" width="30" height="44" rx="4"/><rect class="f" x="82" y="10" width="30" height="44" rx="4"/><path d="M14 22h18M14 30h12M51 22h18M51 30h12M88 22h18M88 30h12"/><circle cx="23" cy="44" r="3"/><circle cx="60" cy="44" r="3"/><circle class="c" cx="97" cy="44" r="3"/></svg>`,
 itsm:`<svg viewBox="0 0 120 64"><rect x="8" y="8" width="104" height="14" rx="4"/><rect x="8" y="26" width="104" height="14" rx="4"/><rect x="8" y="44" width="104" height="14" rx="4"/><circle class="c" cx="18" cy="15" r="3"/><circle cx="18" cy="33" r="3"/><circle cx="18" cy="51" r="3"/><path d="M28 15h44M28 33h32M28 51h52"/></svg>`,
 itom:`<svg viewBox="0 0 120 64"><path d="M6 44 22 30 36 38 52 14 68 34 84 22 100 40 114 26"/><path class="d" d="M6 52h108"/><circle class="c" cx="52" cy="14" r="4"/><circle cx="84" cy="22" r="3"/></svg>`,
 integ:`<svg viewBox="0 0 120 64"><circle class="c" cx="60" cy="32" r="10"/><circle cx="14" cy="14" r="5"/><circle cx="14" cy="50" r="5"/><circle cx="106" cy="14" r="5"/><circle cx="106" cy="50" r="5"/><path d="M19 17 51 28M19 47 51 36M101 17 69 28M101 47 69 36"/></svg>`,
 ai:`<svg viewBox="0 0 120 64"><rect x="8" y="12" width="60" height="14" rx="7"/><rect class="f" x="52" y="32" width="60" height="14" rx="7"/><path d="M20 19h30M64 39h34"/><path class="d" d="M14 54h92"/><circle class="c" cx="100" cy="54" r="3"/></svg>`,
 web:`<svg viewBox="0 0 120 64"><rect x="8" y="6" width="74" height="52" rx="6"/><path d="M8 18h74"/><circle cx="15" cy="12" r="1.6"/><circle cx="21" cy="12" r="1.6"/><path d="M16 28h40M16 36h56M16 44h28"/><rect class="f" x="88" y="16" width="24" height="42" rx="5"/><path d="M96 24h8"/></svg>`};
const tile=(k,h,p,href)=>`<li class="cap reveal"><div class="cap-v" aria-hidden="true">${ico[k]}</div><h3><a class="stretch" href="${href}">${h}</a></h3><p>${p}</p></li>`;
export const CAPS=`<section id="capabilities" class="sec" aria-labelledby="cap-h"><div class="wrap">
<div class="head reveal"><p class="eyebrow">Capabilities</p><h2 class="h-section" id="cap-h">Where we go deep</h2><p class="sub">Six areas of the Now Platform, plus the web and app work around it. Each links to how we scope and deliver it.</p></div>
<ul class="caps">
${tile('cmdb','CMDB and CSDM','Classes, identification and reconciliation rules, service maps. Data you can trust before you automate on it.','/services.html#cmdb')}
${tile('itam','ITAM','Hardware and software asset lifecycles tied to the CMDB, from receipt to retirement.','/services.html#expertise')}
${tile('itsm','ITSM','Incident, problem, change and request flows shaped around your process, not a template.','/services.html#expertise')}
${tile('itom','ITOM and Discovery','Discovery, Service Mapping and event management that keep the picture current.','/services.html#itom')}
${tile('integ','Integrations','Scripted REST, IntegrationHub spokes and MID servers. Logged, monitored, documented.','/services.html#integration')}
${tile('ai','AI on the platform','Practical AI features with a person approving anything that changes a record.','/services.html#expertise')}
${tile('web','Websites and apps','Fast, accessible sites and native apps, built with the same scope-first habits.','/services.html#digital')}
</ul></div></section>`;

export const PROOF=`<section id="proof" class="sec" aria-labelledby="pf-h"><div class="wrap">
<div class="head reveal"><p class="eyebrow">Proof, not promises</p><h2 class="h-section" id="pf-h">What you get besides the build</h2><p class="sub">Scoped, tested, documented. These are the formats we hand over. The examples are samples we wrote to show the format, not records from any client.</p></div>
<div class="pdocs">
<article class="pdoc reveal" aria-labelledby="d1"><p class="pdoc-tag"><span class="chip acc">Sample format</span></p><h3 id="d1">Test report</h3>
<table class="tr"><caption class="sr">Sample ATF suite results</caption><thead><tr><th scope="col">Suite</th><th scope="col">Cases</th><th scope="col">Result</th></tr></thead><tbody>
<tr><td>Intake form validation</td><td class="mono">12</td><td><span class="ok">Pass</span></td></tr>
<tr><td>Approval routing</td><td class="mono">8</td><td><span class="ok">Pass</span></td></tr>
<tr><td>ACL deny paths</td><td class="mono">10</td><td><span class="ok">Pass</span></td></tr>
<tr><td>REST failure handling</td><td class="mono">6</td><td><span class="warn">1 to fix</span></td></tr></tbody></table>
<p class="fine">Run on sub-production before every promotion. Failures block the release.</p></article>
<article class="pdoc reveal" aria-labelledby="d2"><p class="pdoc-tag"><span class="chip acc">Sample format</span></p><h3 id="d2">Runbook snippet</h3>
<pre class="rb" tabindex="0" aria-label="Sample runbook excerpt"><code><b>Go-live: scoped app release</b>
1. Confirm change is Approved
2. Back up: export update set
3. Promote in the window
4. Run smoke tests (ATF)
5. Verify event logs are clean
<b>Rollback</b>
  Back out update set, re-run
  smoke tests, notify owner</code></pre>
<p class="fine">Written so someone who was not in the room can run it.</p></article>
<article class="pdoc reveal" aria-labelledby="d3"><p class="pdoc-tag"><span class="chip acc">Sample format</span></p><h3 id="d3">Upgrade-safe checklist</h3>
<ul class="ck">
<li><i>${chk}</i>Built in its own application scope</li>
<li><i>${chk}</i>Base-system records extended, not edited</li>
<li><i>${chk}</i>Roles and ACLs defined per table</li>
<li><i>${chk}</i>ATF covers happy and failure paths</li>
<li><i>${chk}</i>Skipped-changes review after each upgrade</li></ul>
<p class="fine">The reason upgrades stay boring.</p></article>
</div>
<div class="act"><a class="btn btn-primary" href="/contact.html">Book a free 30-minute architecture review</a><a class="more" href="/services.html#method">How we deliver</a></div>
</div></section>`;
