(() => {
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');let interacted=false;
 const align=(hash,smooth=false)=>{let section;try{section=document.getElementById(decodeURIComponent(hash.slice(1)))}catch{return}if(!section)return;
  const title=section.querySelector('.eyebrow,h1,h2')||section,header=document.querySelector('.header');
  // Mede a posição de layout, sem o deslocamento temporário da animação de entrada.
  let layoutTop=0;for(let node=title;node;node=node.offsetParent)layoutTop+=node.offsetTop;
  scrollTo({top:Math.max(0,layoutTop-(header?.offsetHeight||0)-24),behavior:smooth&&!reduced.matches?'smooth':'instant'});
 };
 document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#"]');if(!a||a.getAttribute('href')==='#')return;e.preventDefault();const hash=a.getAttribute('href');history.pushState(null,'',hash);align(hash,true)});
 ['pointerdown','wheel','touchstart','keydown'].forEach(name=>addEventListener(name,()=>{interacted=true},{passive:true}));
 const initial=async()=>{if(!location.hash)return;const hash=location.hash;if(document.fonts)await document.fonts.ready;if(!interacted&&hash===location.hash)requestAnimationFrame(()=>align(hash))};
 addEventListener('popstate',()=>align(location.hash));addEventListener('hashchange',()=>align(location.hash));
 if(document.readyState==='complete')initial();else addEventListener('load',initial,{once:true});
})();