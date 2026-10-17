document.querySelector('#language').addEventListener('change',e=>{const en=e.target.value==='en';document.documentElement.lang=en?'en':'hi';document.querySelectorAll('[data-en]').forEach(el=>{if(!el.dataset.hi)el.dataset.hi=el.innerHTML;el.innerHTML=en?el.dataset.en:el.dataset.hi;});});
const assistantToggle=document.querySelector('.assistant-toggle'),assistantPanel=document.querySelector('#assistant-panel');function toggleAssistant(open){assistantPanel.hidden=!open;assistantToggle.setAttribute('aria-expanded',String(open));if(open)assistantPanel.querySelector('button').focus();else assistantToggle.focus();}assistantToggle.addEventListener('click',()=>toggleAssistant(assistantPanel.hidden));document.querySelector('.close-assistant').addEventListener('click',()=>toggleAssistant(false));document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!assistantPanel.hidden)toggleAssistant(false);});



const menuToggle=document.querySelector('.menu-toggle');const primaryNav=document.querySelector('#primary-navigation');function setMenu(open){menuToggle.setAttribute('aria-expanded',String(open));primaryNav.classList.toggle('is-open',open);}menuToggle.addEventListener('click',()=>setMenu(menuToggle.getAttribute('aria-expanded')!=='true'));primaryNav.addEventListener('click',e=>{if(e.target.closest('a'))setMenu(false);});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menuToggle.getAttribute('aria-expanded')==='true'){setMenu(false);menuToggle.focus();}});

// Automatic crossfade; retain the existing hero dimensions and identical copy.
const heroCarousel=document.querySelector('.hero-carousel');
const heroSlides=[...heroCarousel.querySelectorAll('.hero-slide')];
const motionPreference=matchMedia('(prefers-reduced-motion: reduce)');
let heroIndex=0,heroTimer=null;
function showHero(index){
 heroIndex=index;
 heroSlides.forEach((slide,i)=>{const active=i===index;slide.classList.toggle('is-active',active);slide.setAttribute('aria-hidden',String(!active));slide.inert=!active;});
}
function scheduleHero(){
 clearInterval(heroTimer);
 if(!motionPreference.matches&&!document.hidden&&!heroCarousel.matches(':hover')&&!heroCarousel.contains(document.activeElement))heroTimer=setInterval(()=>showHero((heroIndex+1)%heroSlides.length),6500);
}
heroCarousel.addEventListener('mouseenter',()=>clearInterval(heroTimer));
heroCarousel.addEventListener('mouseleave',scheduleHero);
heroCarousel.addEventListener('focusin',()=>clearInterval(heroTimer));
heroCarousel.addEventListener('focusout',()=>setTimeout(scheduleHero,0));
document.addEventListener('visibilitychange',scheduleHero);
motionPreference.addEventListener('change',scheduleHero);
scheduleHero();
