/* ════════════════════════════════════════════
   SOLTLESS — script.js (v2)
════════════════════════════════════════════ */

// ── COUNTDOWN ───────────────────────────────
(function(){
  const target = new Date();
  target.setDate(target.getDate() + 6);
  target.setHours(target.getHours() + 18);
  target.setMinutes(target.getMinutes() + 32);
  target.setSeconds(target.getSeconds() + 10);

  const pad = n => String(Math.max(0,n)).padStart(2,'0');

  function tick(){
    const diff = target - Date.now();
    if(diff <= 0){
      ['days','hours','minutes','seconds'].forEach(id => {
        const el = document.getElementById(id);
        if(el) el.textContent = '00';
      });
      return;
    }
    const d = Math.floor(diff/864e5);
    const h = Math.floor((diff%864e5)/36e5);
    const m = Math.floor((diff%36e5)/6e4);
    const s = Math.floor((diff%6e4)/1e3);
    const dEl = document.getElementById('days');
    const hEl = document.getElementById('hours');
    const mEl = document.getElementById('minutes');
    const sEl = document.getElementById('seconds');
    if(dEl) dEl.textContent = pad(d);
    if(hEl) hEl.textContent = pad(h);
    if(mEl) mEl.textContent = pad(m);
    if(sEl) sEl.textContent = pad(s);
  }
  tick();
  setInterval(tick, 1000);
})();

// ── NAVBAR SCROLL ────────────────────────────
(function(){
  const nav = document.getElementById('navbar');
  if(!nav) return;
  window.addEventListener('scroll', ()=>{
    nav.style.background = window.scrollY > 30
      ? 'rgba(6,8,16,0.98)'
      : 'rgba(6,8,16,0.85)';
  }, {passive:true});
})();

// ── MOBILE MENU ──────────────────────────────
(function(){
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('navLinks');
  if(!btn || !menu) return;

  // Inject mobile styles
  const s = document.createElement('style');
  s.textContent = `
    @media(max-width:768px){
      .nav-links.open{
        display:flex!important;
        flex-direction:column;
        position:fixed;
        top:60px;left:0;right:0;
        background:rgba(6,8,16,0.98);
        backdrop-filter:blur(16px);
        padding:28px 24px;
        gap:22px;
        border-bottom:1px solid rgba(59,130,246,0.15);
        z-index:998;
        animation:slideDown .3s ease;
      }
      .nav-links.open a{font-size:0.85rem;color:#fff;}
      @keyframes slideDown{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
      .hamburger.active span:first-child{transform:translateY(7px) rotate(45deg);}
      .hamburger.active span:nth-child(2){opacity:0;}
      .hamburger.active span:last-child{transform:translateY(-7px) rotate(-45deg);}
    }
  `;
  document.head.appendChild(s);

  btn.addEventListener('click', ()=>{
    const open = menu.classList.toggle('open');
    btn.classList.toggle('active', open);
  });
  menu.querySelectorAll('a').forEach(a=>{
    a.addEventListener('click',()=>{
      menu.classList.remove('open');
      btn.classList.remove('active');
    });
  });
})();

// ── SCROLL REVEAL ────────────────────────────
(function(){
  const selectors = [
    '.pcard',
    '.lcard',
    '.cbox',
    '.drop-left > *',
    '.drop-right',
    '.sobre-content > *',
  ];

  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.style.opacity = '1';
        e.target.style.transform = e.target._baseTransform || 'translateY(0)';
        obs.unobserve(e.target);
      }
    });
  },{threshold:0.1, rootMargin:'0px 0px -30px 0px'});

  selectors.forEach(sel=>{
    document.querySelectorAll(sel).forEach((el,i)=>{
      el.style.opacity = '0';
      el.style.transform = 'translateY(22px)';
      el._baseTransform = 'translateY(0)';
      el.style.transition = `opacity .65s ease ${i*0.07}s, transform .65s ease ${i*0.07}s`;
      obs.observe(el);
    });
  });
})();

// ── SATURN FLOAT ANIMATION ───────────────────
(function(){
  const scene = document.querySelector('.saturn-scene');
  if(!scene) return;
  let y = 0, dir = 1, frame;
  function animate(){
    y += 0.018 * dir;
    if(Math.abs(y) > 1) dir *= -1;
    scene.style.transform = `translateY(calc(-50% + ${y}%))`;
    frame = requestAnimationFrame(animate);
  }
  animate();
  document.addEventListener('visibilitychange',()=>{
    if(document.hidden) cancelAnimationFrame(frame);
    else animate();
  });
})();

// ── SMOOTH SCROLL ────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  const href = a.getAttribute('href');
  if(!href || href === '#') return;
  a.addEventListener('click', e=>{
    const target = document.querySelector(href);
    target.scrollIntoView({behavior:'smooth', block:'start'});
  });
});

console.log('%c🪐 SOLTLESS — Vista Outro Mundo', 'font-family:monospace;font-size:13px;color:#3B82F6;background:#060810;padding:6px 14px;border-radius:4px;border-left:3px solid #F97316');

// ── SOBRE — REVEAL HISTÓRIA ──────────────────
(function(){
  const btn = document.getElementById('sobreRevealBtn');
  const wrap = document.getElementById('sobreHistoria');
  if(!btn || !wrap) return;
  btn.addEventListener('click', ()=>{
    const isOpen = wrap.classList.toggle('open');
    btn.textContent = isOpen ? 'FECHAR HISTÓRIA' : 'CONHECER NOSSA HISTÓRIA';
    if(isOpen){
      setTimeout(()=>{
        wrap.scrollIntoView({behavior:'smooth', block:'start'});
      }, 100);
    }
  });
})();
// ── PRODUCT MODAL ───────────────────────────
(function(){
  const modal = document.getElementById('product-modal');
  const modalProductName = document.getElementById('modal-product-name');
  const finalizeBtn = document.getElementById('finalize-purchase');
  const closeBtn = document.querySelector('.close');

  // Add click listeners to product cards
  document.querySelectorAll('.pcard').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      const productName = card.querySelector('h3').textContent;
      modalProductName.textContent = productName;
      modal.style.display = 'block';
    });
  });

  // Close modal
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });

  // Finalize purchase
  finalizeBtn.addEventListener('click', () => {
    const productName = modalProductName.textContent;
    const message = `Olá, gostaria de finalizar a compra do produto ${productName}.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/554599169464?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    modal.style.display = 'none';
  });
})();

// ── WHATSAPP CONTACT ────────────────────────
(function(){
  const whatsappLink = document.getElementById('whatsapp-contact');
  if(!whatsappLink) return;
  whatsappLink.addEventListener('click', () => {
    const message = 'Olá, gostaria de entrar em contato.';
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/554599169464?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  });
})();