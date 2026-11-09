(() => {
  const root=document.documentElement,reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const selectors='.hero-copy>*,.hero-media,.section-head,.service-copy,.service-media,.treatment-list,.about-media,.section-copy,.testimonial-intro,.testimonial-card,.steps article,.location-copy,.location-photo,.faq-grid>div:first-child,.faq-list details,.final-cta .container>*,.footer-inner';
  const items=[...document.querySelectorAll(selectors)],sections=[...document.querySelectorAll('main>section')];
  const showAll=()=>{items.forEach(el=>el.classList.add('in-view'));sections.forEach(el=>el.classList.add('formed'));root.classList.add('motion-reduced')};
  if(reduced.matches||!('IntersectionObserver'in window)){showAll();return}
  items.forEach((el,index)=>{el.classList.add('reveal-item');el.style.setProperty('--reveal-delay',(el.closest('.hero-copy')?Math.min(index*65,325):0)+'ms')});
  root.classList.add('reveal-ready');
  const reveal=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(!entry.isIntersecting)return;entry.target.classList.add('in-view');reveal.unobserve(entry.target)})},{threshold:.04,rootMargin:'0px 0px 36px'});
  const form=new IntersectionObserver(entries=>{entries.forEach(entry=>{entry.target.classList.toggle('motion-active',entry.isIntersecting);if(entry.isIntersecting)entry.target.classList.add('formed')})},{threshold:0});
  items.forEach(el=>reveal.observe(el));sections.forEach(el=>form.observe(el));
  reduced.addEventListener('change',e=>{if(e.matches){showAll();reveal.disconnect();form.disconnect()}});
  const progress=document.createElement('span');progress.className='site-progress';progress.setAttribute('aria-hidden','true');document.body.prepend(progress);
  let ticking=false;const update=()=>{progress.style.transform='scaleX('+Math.min(1,scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight))+')';ticking=false};
  addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(update);ticking=true}},{passive:true});update();
})();

