/* home.js — hero canvas */
(function(){
  const canvas = document.getElementById('hCanvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  function resize(){ canvas.width=canvas.offsetWidth; canvas.height=canvas.offsetHeight; }
  resize();
  window.addEventListener('resize', resize);

  const P = Array.from({length:60}, ()=>({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    r: Math.random()*1.4+.3,
    vx:(Math.random()-.5)*.28,
    vy:(Math.random()-.5)*.28,
    a: Math.random()*.45+.1,
    p: Math.random()*Math.PI*2
  }));

  (function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    // glow
    const g=ctx.createRadialGradient(canvas.width/2,canvas.height/2,0,canvas.width/2,canvas.height/2,canvas.width*.55);
    g.addColorStop(0,'rgba(234,46,0,0.07)');
    g.addColorStop(1,'transparent');
    ctx.fillStyle=g; ctx.fillRect(0,0,canvas.width,canvas.height);

    P.forEach(p=>{
      p.p+=.016;
      const a=p.a*(0.65+.35*Math.sin(p.p));
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(234,46,0,${a})`; ctx.fill();
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0)p.x=canvas.width; if(p.x>canvas.width)p.x=0;
      if(p.y<0)p.y=canvas.height; if(p.y>canvas.height)p.y=0;
    });

    for(let i=0;i<P.length;i++) for(let j=i+1;j<P.length;j++){
      const dx=P[i].x-P[j].x, dy=P[i].y-P[j].y;
      const d=Math.sqrt(dx*dx+dy*dy);
      if(d<110){
        ctx.beginPath(); ctx.moveTo(P[i].x,P[i].y); ctx.lineTo(P[j].x,P[j].y);
        ctx.strokeStyle=`rgba(234,46,0,${.055*(1-d/110)})`; ctx.lineWidth=.5; ctx.stroke();
      }
    }
    requestAnimationFrame(draw);
  })();
})();
