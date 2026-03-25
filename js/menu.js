/* menu.js — filter tabs */
document.querySelectorAll('.ftab').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.ftab').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.cat;
    document.querySelectorAll('.menu-card').forEach(card=>{
      if(cat==='all' || card.dataset.cat===cat){
        card.classList.remove('hidden');
        card.style.opacity='0'; card.style.transform='translateY(20px)';
        setTimeout(()=>{ card.style.opacity='1'; card.style.transform=''; },50);
      } else {
        card.classList.add('hidden');
      }
    });
  });
});
