// Minimal interactivity: nav toggle, smooth scroll, contact form stub
document.addEventListener('DOMContentLoaded',function(){
  const navToggle=document.getElementById('nav-toggle');
  const nav=document.getElementById('nav');
  if(navToggle){
    navToggle.setAttribute('aria-expanded','false');
    navToggle.addEventListener('click',()=>{
      const open = nav.style.display!=='flex';
      nav.style.display = open ? 'flex' : 'none';
      navToggle.setAttribute('aria-expanded', String(open));
      if(open){
        const firstLink = nav.querySelector('a');
        firstLink && firstLink.focus();
      }
    });
  }

  // smooth scroll for anchor links, respecting reduced motion
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const t=a.getAttribute('href');
      if(t && t.length>1 && document.querySelector(t)){
        e.preventDefault();
        const el=document.querySelector(t);
        el && el.scrollIntoView({behavior: reduced ? 'auto' : 'smooth', block:'start'});
        // for keyboard users, move focus to target
        el.setAttribute('tabindex','-1');
        el.focus({preventScroll:true});
        el.removeAttribute('tabindex');
      }
    });
  });

  // fill footer year
  const y=document.getElementById('year'); if(y) y.textContent=new Date().getFullYear();

  // contact form behavior (no backend) — show a friendly message and basic validation
  const form=document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit',e=>{
      e.preventDefault();
      const email = form.querySelector('input[name="email"]');
      const name = form.querySelector('input[name="name"]');
      const msgEl = document.getElementById('form-msg');
      if(!email.value || !name.value){
        msgEl.textContent = 'Please provide your name and work email.'; msgEl.style.color='crimson'; return;
      }
      msgEl.style.color='green';
      msgEl.textContent='Thanks — we received your request. We will follow up within 1 business day.';
      form.reset();
    });
  }
  // Scroll reveal animations using IntersectionObserver
  const reveals = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && reveals.length){
    const io = new IntersectionObserver((entries, obs)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          const el = entry.target;
          const delay = el.dataset.delay ? Number(el.dataset.delay) : 0;
          setTimeout(()=>{
            el.classList.add('show');
            // trigger counters inside
            el.querySelectorAll('.counter').forEach(runCounter);
          }, delay);
          obs.unobserve(el);
        }
      });
    },{threshold:0.12});
    reveals.forEach(r=>io.observe(r));
  } else {
    // fallback: show all
    reveals.forEach(r=>{r.classList.add('show'); r.querySelectorAll('.counter').forEach(runCounter)});
  }

  // animated number counters
  function runCounter(el){
    const target = Number(el.dataset.target || el.textContent || 0);
    if(isNaN(target)) return;
    let start = 0; const dur = Number(el.dataset.duration) || 1200; const startTs = performance.now();
    requestAnimationFrame(function tick(ts){
      const prog = Math.min(1, (ts - startTs) / dur);
      el.textContent = Math.floor(prog * target).toLocaleString();
      if(prog < 1) requestAnimationFrame(tick);
      else el.textContent = target.toLocaleString();
    });
  }

  // animated logo movement on scroll
  const brand = document.querySelector('.brand');
  if(brand){
    let lastScroll = window.scrollY;
    let ticking = false;
    const updateLogo = () => {
      const offset = Math.min(10, window.scrollY / 20);
      const wobble = Math.sin(window.scrollY / 30) * 2;
      brand.style.transform = `translateY(${offset}px)`;
      const mark = brand.querySelector('.brand-mark');
      if(mark){
        mark.style.transform = `translate(${wobble}px, ${offset}px) rotate(${offset*2}deg)`;
      }
      ticking = false;
    };
    window.addEventListener('scroll', ()=>{
      lastScroll = window.scrollY;
      if(!ticking){
        requestAnimationFrame(updateLogo);
        ticking = true;
      }
    });
  }

  // subtle card parallax on pointermove for non-touch
  if(window.matchMedia && !window.matchMedia('(pointer: coarse)').matches){
    document.querySelectorAll('.card').forEach(card=>{
      card.addEventListener('pointermove', e=>{
        const rect = card.getBoundingClientRect();
        const dx = (e.clientX - (rect.left + rect.width/2)) / rect.width;
        const dy = (e.clientY - (rect.top + rect.height/2)) / rect.height;
        card.style.transform = `translateY(-6px) scale(1.01) rotateX(${(-dy*3).toFixed(2)}deg) rotateY(${(dx*3).toFixed(2)}deg)`;
      });
      card.addEventListener('pointerleave', ()=>{card.style.transform = ''});
    });
  }
});
