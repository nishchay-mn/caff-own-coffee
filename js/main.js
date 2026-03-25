/* ═══════════════════════════════════════
   CAFF OWN COFFEE — main.js (shared)
   ═══════════════════════════════════════ */

/* ── LOADER ── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const l = document.querySelector('.loader');
    if (l) { l.classList.add('out'); document.body.classList.remove('noscroll'); }
  }, 1900);
});

/* ── CURSOR ── */
const cur  = document.getElementById('cur');
const ring = document.getElementById('ring');
if (cur && ring) {
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove', e => {
    mx=e.clientX; my=e.clientY;
    cur.style.left=mx+'px'; cur.style.top=my+'px';
  });
  (function anim(){
    rx+=(mx-rx)*.1; ry+=(my-ry)*.1;
    ring.style.left=rx+'px'; ring.style.top=ry+'px';
    requestAnimationFrame(anim);
  })();
  document.querySelectorAll('a,button,.menu-card,.rev-card,.g-item,.info-row').forEach(el=>{
    el.addEventListener('mouseenter',()=>ring.classList.add('big'));
    el.addEventListener('mouseleave',()=>ring.classList.remove('big'));
  });
}

/* ── NAVBAR SCROLL ── */
const nav = document.querySelector('.navbar');
if (nav) {
  window.addEventListener('scroll', ()=>{
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }, {passive:true});
}

/* ── ACTIVE NAV LINK ── */
const page = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a=>{
  const href = a.getAttribute('href');
  if (href === page || (page==='' && href==='index.html')) a.classList.add('active');
});

/* ── MOBILE MENU ── */
const ham   = document.getElementById('ham');
const mobOv = document.getElementById('mobOv');
const mobCl = document.getElementById('mobCl');
if (ham && mobOv) {
  ham.addEventListener('click', ()=>{ ham.classList.add('open'); mobOv.classList.add('open'); document.body.classList.add('noscroll'); });
  if(mobCl) mobCl.addEventListener('click', closeM);
  document.querySelectorAll('.mob-link').forEach(l=>l.addEventListener('click', closeM));
  function closeM(){ ham.classList.remove('open'); mobOv.classList.remove('open'); document.body.classList.remove('noscroll'); }
}

/* ── SCROLL REVEAL ── */
const revObs = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const d = parseInt(e.target.dataset.delay)||0;
      setTimeout(()=>e.target.classList.add('vis'), d);
      revObs.unobserve(e.target);
    }
  });
},{threshold:.1, rootMargin:'0px 0px -30px 0px'});
document.querySelectorAll('.reveal').forEach(el=>revObs.observe(el));

/* ── COUNT-UP ── */
function countUp(el, target, dur=1600){
  const dec = target%1!==0;
  const t0  = performance.now();
  (function upd(now){
    const p = Math.min((now-t0)/dur,1);
    const e = 1-Math.pow(1-p,3);
    const v = e*target;
    el.textContent = dec ? v.toFixed(1) : Math.floor(v)+(p<1?'':'+');
    if(p<1) requestAnimationFrame(upd);
    else el.textContent = dec ? target.toFixed(1) : target+'+';
  })(t0);
}
const cntObs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const n = e.target.querySelector('[data-count]');
      if(n) countUp(n, parseFloat(n.dataset.count));
      cntObs.unobserve(e.target);
    }
  });
},{threshold:.5});
document.querySelectorAll('.stat-box').forEach(s=>cntObs.observe(s));

/* ── MARQUEE PAUSE ── */
const mt = document.querySelector('.marquee-track');
if(mt){
  mt.addEventListener('mouseenter',()=>mt.style.animationPlayState='paused');
  mt.addEventListener('mouseleave',()=>mt.style.animationPlayState='running');
}

/* ── CARD TILT ── */
document.querySelectorAll('.menu-card').forEach(c=>{
  c.addEventListener('mousemove',e=>{
    const r=c.getBoundingClientRect();
    const x=((e.clientX-r.left)/r.width-.5)*10;
    const y=((e.clientY-r.top)/r.height-.5)*10;
    c.style.transform=`perspective(700px) rotateY(${x}deg) rotateX(${-y}deg) translateZ(8px)`;
  });
  c.addEventListener('mouseleave',()=>c.style.transform='');
});

/* ── REVIEW SPOTLIGHT ── */
document.querySelectorAll('.rev-card').forEach(c=>{
  c.addEventListener('mousemove',e=>{
    const r=c.getBoundingClientRect();
    c.style.background=`radial-gradient(circle at ${e.clientX-r.left}px ${e.clientY-r.top}px, #241508 0%, var(--card) 65%)`;
  });
  c.addEventListener('mouseleave',()=>c.style.background='');
});
