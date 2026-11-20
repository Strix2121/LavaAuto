const V='lava-v2',F=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(F)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);
if(r.method!=='GET'||/script\.google|googleusercontent/.test(u.hostname))return;
const put=n=>{const c=n.clone();caches.open(V).then(h=>h.put(r,c)).catch(()=>{});return n};
if(u.origin===location.origin){e.respondWith(fetch(r).then(put).catch(()=>caches.match(r).then(x=>x||caches.match('./index.html'))));return}
e.respondWith(caches.match(r).then(x=>x||fetch(r).then(put)))});
