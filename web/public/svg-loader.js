(function(){function t(e,r,n){function s(i,a){if(!r[i]){if(!e[i]){var c="function"==typeof require&&require;if(!a&&c)return c(i,!0);if(o)return o(i,!0);var u=new Error("Cannot find module '"+i+"'");throw u.code="MODULE_NOT_FOUND",u}var d=r[i]={exports:{}};e[i][0].call(d.exports,(function(t){var r=e[i][1][t];return s(r||t)}),d,d.exports,t,e,r,n)}return r[i].exports}for(var o="function"==typeof require&&require,i=0;i<n.length;i++)s(n[i]);return s}return t})()({1:[function(t,e,r){"use strict";let n=0;e.exports={incr(){return++n},decr(){return--n},curr(){return n}}},{}],2:[function(t,e,r){"use strict";e.exports=(t,e)=>{const r=new RegExp("([^\r\n,{}]+)(,(?=[^}]*{)|s*{)","g");t=t.replace(r,(function(t,r,n){if(r.match(/^\s*(@media|@.*keyframes|to|from|@font-face|1?[0-9]?[0-9])/)){return r+n}r=r.replace(/^(\s*)/,"$1"+e+" ");return r+n}));return t}},{}],3:[function(t,e,r){"use strict";Object.defineProperty(r,"__esModule",{value:true});class n{constructor(t="keyval-store",e="keyval"){this.storeName=e;this._dbp=new Promise(((r,n)=>{const s=indexedDB.open(t,1);s.onerror=()=>n(s.error);s.onsuccess=()=>r(s.result);s.onupgradeneeded=()=>{s.result.createObjectStore(e)}}))}_withIDBStore(t,e){return this._dbp.then((r=>new Promise(((n,s)=>{const o=r.transaction(this.storeName,t);o.oncomplete=()=>n();o.onabort=o.onerror=()=>s(o.error);e(o.objectStore(this.storeName))}))))}}let s;function o(){if(!s)s=new n;return s}function i(t,e=o()){let r;return e._withIDBStore("readonly",(e=>{r=e.get(t)})).then((()=>r.result))}function a(t,e,r=o()){return r._withIDBStore("readwrite",(r=>{r.put(e,t)}))}function c(t,e=o()){return e._withIDBStore("readwrite",(e=>{e.delete(t)}))}function u(t=o()){return t._withIDBStore("readwrite",(t=>{t.clear()}))}function d(t=o()){const e=[];return t._withIDBStore("readonly",(t=>{(t.openKeyCursor||t.openCursor).call(t).onsuccess=function(){if(!this.result)return;e.push(this.result.key);this.result.continue()}})).then((()=>e))}r.Store=n;r.get=i;r.set=a;r.del=c;r.clear=u;r.keys=d},{}],4:[function(t,e,r){"use strict";const{get:n,set:s,del:o}=t("idb-keyval");const i=t("./lib/scope-css");const a=t("./lib/counter");const c=async t=>{try{let e=await n(`loader_${t}`);if(!e){return}e=JSON.parse(e);if(Date.now()<e.expiry){return e.data}else{o(`loader_${t}`);return}}catch(t){return}};const u=(t,e,r)=>{const n=parseInt(r,10);try{s(`loader_${t}`,JSON.stringify({data:e,expiry:Date.now()+(Number.isNaN(n)?60*60*1e3*24:n)}))}catch(t){return}};const d=[];const l=()=>{if(d.length){return d}for(const t in document.head){if(t.startsWith("on")){d.push(t)}}return d};const f={};const b=(t,e,r)=>{const{enableJs:n,disableUniqueIds:s,disableCssScoping:o}=e;const c=new DOMParser;const u=c.parseFromString(r,"text/html");const d=u.querySelector("svg");const b=l();const h=f[t.getAttribute("data-id")]||new Set;const p=t.getAttribute("data-id")||`svg-loader_${a.incr()}`;const g={};if(!s){Array.from(u.querySelectorAll("[id]")).forEach((t=>{const e=t.getAttribute("id");const r=`${e}_${a.incr()}`;t.setAttribute("id",r);g[e]=r}))}const m=/url\("?#([a-zA-Z][\w:.-]*)"?\)/g;const y=/#([a-zA-Z][\w:.-]*)/g;Array.from(u.querySelectorAll("*")).forEach((t=>{if(t.tagName==="script"){if(!n){t.remove();return}else{const e=document.createElement("script");e.innerHTML=t.innerHTML;document.body.appendChild(e)}}for(let e=0;e<t.attributes.length;e++){const{name:r,value:s}=t.attributes[e];if(s.match(m)){const e=s.replace(m,(function(t,e){if(!g[e]){return t}return`url(#${g[e]})`}));if(s!==e){t.setAttribute(r,e)}}if(["href","xlink:href"].includes(r)){if(s.match(y)){const e=s.replace(y,(function(t,e){if(!g[e]){return t}return`#${g[e]}`}));if(s!==e){t.setAttribute(r,e)}}}if(b.includes(r.toLowerCase())&&!n){t.removeAttribute(r);continue}if(["href","xlink:href"].includes(r)&&s.startsWith("javascript")&&!n){t.removeAttribute(r)}}if(t.tagName==="style"&&!o){t.innerHTML=i(t.innerHTML,`[data-id="${p}"]`)}}));for(let e=0;e<d.attributes.length;e++){const{name:r,value:n}=d.attributes[e];if(!t.getAttribute(r)||h.has(r)){h.add(r);t.setAttribute(r,n)}}f[p]=h;t.setAttribute("data-id",p);t.innerHTML=d.innerHTML};const h={};const p={};const g=async t=>{const e=t.getAttribute("data-src");const r=t.getAttribute("data-cache");const n=t.getAttribute("data-js")==="enabled";const s=t.getAttribute("data-unique-ids")==="disabled";const o=t.getAttribute("data-css-scoping")==="disabled";const i=await c(e);const a=r!=="disabled";const d=b.bind(this,t,{enableJs:n,disableUniqueIds:s,disableCssScoping:o});if(p[e]||a&&i){const t=p[e]||i;d(t)}else{if(h[e]){setTimeout((()=>g(t)),20);return}h[e]=true;fetch(e).then((t=>{if(!t.ok){throw Error(`Request for '${e}' returned ${t.status} (${t.statusText})`)}return t.text()})).then((t=>{const n=t.toLowerCase().trim();if(!(n.startsWith("<svg")||n.startsWith("<?xml"))){throw Error(`Resource '${e}' returned an invalid SVG file`)}if(a){u(e,t,r)}p[e]=t;d(t)})).catch((t=>{console.error(t)})).finally((()=>{delete h[e]}))}};const m=new IntersectionObserver((t=>{t.forEach((t=>{if(t.isIntersecting){g(t.target);m.unobserve(t.target)}}))}),{rootMargin:"1200px"});const y=[];function w(){Array.from(document.querySelectorAll("svg[data-src]:not([data-id])")).forEach((t=>{if(y.indexOf(t)!==-1){return}y.push(t);if(t.getAttribute("data-loading")==="lazy"){m.observe(t)}else{g(t)}}))}let v=false;const A=()=>{if(v){return}v=true;const t=new MutationObserver((t=>{const e=t.some((t=>Array.from(t.addedNodes).some((t=>t.nodeType===Node.ELEMENT_NODE&&(t.getAttribute("data-src")&&!t.getAttribute("data-id")||t.querySelector("svg[data-src]:not([data-id])"))))));if(e){w()}t.forEach((t=>{if(t.type==="attributes"){g(t.target)}}))}));t.observe(document.documentElement,{attributeFilter:["data-src"],attributes:true,childList:true,subtree:true})};const S=setInterval((()=>{w()}),100);window.addEventListener("DOMContentLoaded",(()=>{clearInterval(S);w();A()}))},{"./lib/counter":1,"./lib/scope-css":2,"idb-keyval":3}]},{},[4]);