const cars=[{"id": "solaris-black", "name": "Hyundai Solaris", "variant": "Чёрный хэтчбек", "type": "hatchback", "mileage": "317 963", "photos": ["assets-cars-solaris-black-01.webp", "assets-cars-solaris-black-02.webp", "assets-cars-solaris-black-03.webp", "assets-cars-solaris-black-04.webp", "assets-cars-solaris-black-05.webp", "assets-cars-solaris-black-06.webp", "assets-cars-solaris-black-07.webp", "assets-cars-solaris-black-08.webp", "assets-cars-solaris-black-09.webp", "assets-cars-solaris-black-10.webp"], "year": 2016, "engine": "1,6 л", "advertisedMileage": "317 963", "rates": [2900, 2200, 1900, 1700, 1500]}, {"id": "kia-picanto", "name": "Kia Picanto", "variant": "Жёлто-зелёный хэтчбек", "type": "hatchback", "mileage": "227 674", "photos": ["assets-cars-kia-picanto-01.webp", "assets-cars-kia-picanto-02.webp", "assets-cars-kia-picanto-03.webp", "assets-cars-kia-picanto-04.webp", "assets-cars-kia-picanto-05.webp", "assets-cars-kia-picanto-06.webp", "assets-cars-kia-picanto-07.webp", "assets-cars-kia-picanto-08.webp", "assets-cars-kia-picanto-09.webp", "assets-cars-kia-picanto-10.webp"], "year": 2018, "engine": "1,2 л", "advertisedMileage": "228 000", "rates": [2950, 2250, 1900, 1700, 1550]}, {"id": "solaris-silver", "name": "Hyundai Solaris", "variant": "Серебристый седан", "type": "sedan", "mileage": "211 940", "photos": ["assets-cars-solaris-silver-01.webp", "assets-cars-solaris-silver-02.webp", "assets-cars-solaris-silver-03.webp", "assets-cars-solaris-silver-04.webp", "assets-cars-solaris-silver-05.webp", "assets-cars-solaris-silver-06.webp", "assets-cars-solaris-silver-07.webp", "assets-cars-solaris-silver-08.webp", "assets-cars-solaris-silver-09.webp", "assets-cars-solaris-silver-10.webp"], "year": 2021, "engine": null, "advertisedMileage": "212 000", "rates": [4800, 3700, 3100, 2800, 2500]}, {"id": "solaris-red", "name": "Hyundai Solaris", "variant": "Красный седан", "type": "sedan", "mileage": "235 072", "photos": ["assets-cars-solaris-red-01.webp", "assets-cars-solaris-red-02.webp", "assets-cars-solaris-red-03.webp", "assets-cars-solaris-red-04.webp", "assets-cars-solaris-red-05.webp", "assets-cars-solaris-red-06.webp", "assets-cars-solaris-red-07.webp", "assets-cars-solaris-red-08.webp", "assets-cars-solaris-red-09.webp"], "year": 2015, "engine": "1,6 л", "advertisedMileage": "235 100", "rates": [2700, 2050, 1750, 1550, 1400]}];
const menu=document.querySelector('.menu');menu?.addEventListener('click',()=>{const nav=document.querySelector('.navlinks');const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});
document.querySelectorAll('.navlinks a').forEach(a=>a.addEventListener('click',()=>{document.querySelector('.navlinks').classList.remove('open');menu?.setAttribute('aria-expanded','false')}));
const list=document.querySelector('#car-list');
function renderCars(filter='all'){
 if(!list)return;
 list.innerHTML=cars.filter(c=>filter==='all'||c.type===filter).map(c=>`<article class="car-card real-car"><a href="${c.id}.html" aria-label="Посмотреть ${c.name}, ${c.variant}"><div class="car-picture"><img src="${c.photos[0]}" alt="${c.name}, ${c.variant}" width="1920" height="1080" loading="lazy"><span class="badge">${c.photos.length} фото</span></div></a><div class="car-info"><h3>${c.name}${c.year?" "+c.year:""}</h3><p class="car-variant">${c.variant}</p><div class="specs">Автомат · ${c.advertisedMileage||c.mileage} км${c.advertisedMileage?"":" на фото"}</div><div class="price"><div><small>Наличие уточняйте перед визитом</small><strong>Взнос от 50 000 ₽</strong><small>${c.rates?"От "+Math.min(...c.rates).toLocaleString("ru-RU")+" ₽/сутки при сроке 36 мес.":"Общий минимум · 12–36 месяцев"}</small></div></div><a class="btn light" href="${c.id}.html">Фото и условия</a></div></article>`).join('');
}renderCars();
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(x=>{x.classList.remove('active');x.setAttribute('aria-pressed','false')});b.classList.add('active');b.setAttribute('aria-pressed','true');renderCars(b.dataset.filter)}));
const calcButton=document.querySelector('#calc-cta');
function prepareCalculation(){const deposit=document.querySelector('#deposit');if(!deposit)return;const valid=deposit.validity.valid&&Number(deposit.value)>=50000;const car=document.querySelector('#calc-car').value.trim()||'Помогите выбрать автомобиль';const term=document.querySelector('#term').value;calcButton.href=valid?'https://wa.me/79652348484?text='+encodeURIComponent(`Здравствуйте! Интересует аренда с выкупом. Автомобиль: ${car}. Первый взнос: ${Number(deposit.value).toLocaleString('ru-RU')} ₽. Срок: ${term} мес. Прошу рассчитать ежемесячный платёж и полную сумму выплат.`):'#calculator';calcButton.setAttribute('aria-disabled',String(!valid));}
['deposit','calc-car','term'].forEach(id=>document.getElementById(id)?.addEventListener('input',prepareCalculation));
calcButton?.addEventListener('click',e=>{prepareCalculation();const deposit=document.querySelector('#deposit');if(!deposit.validity.valid||Number(deposit.value)<50000){e.preventDefault();document.querySelector('#calc-status').textContent='Первый взнос должен быть не менее 50 000 ₽. Укажите сумму с шагом 1 000 ₽.';deposit.reportValidity();}});prepareCalculation();
if(document.body.dataset.page==='car'){
 const id=new URLSearchParams(location.search).get('model');
 const car=cars.find(c=>c.id===id);
 if(car)location.replace(car.id+'.html');
}
document.querySelectorAll('[data-news]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-news]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});document.querySelector('#news-guides').hidden=button.dataset.news==='news';document.querySelector('#news-empty').hidden=button.dataset.news!=='news';}));

const dockToggle=document.querySelector('#contact-dock-toggle');
const dockLinks=document.querySelector('#contact-dock-links');
function closeContactDock(){if(!dockToggle)return;dockLinks.hidden=true;dockToggle.setAttribute('aria-expanded','false');dockToggle.setAttribute('aria-label','Открыть способы связи');}
dockToggle?.addEventListener('click',()=>{const open=dockToggle.getAttribute('aria-expanded')!=='true';dockLinks.hidden=!open;dockToggle.setAttribute('aria-expanded',String(open));dockToggle.setAttribute('aria-label',open?'Закрыть способы связи':'Открыть способы связи');});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&dockToggle?.getAttribute('aria-expanded')==='true'){closeContactDock();dockToggle.focus();}});
document.addEventListener('click',e=>{if(!e.target.closest('.contact-dock'))closeContactDock();});

// Align the effects with object-fit: cover, including responsive image cropping.
const heroPhoto=document.querySelector('.hero-image');
const ignitionStage=document.querySelector('.ignition-stage');
if(heroPhoto&&ignitionStage){
 const hero=heroPhoto.closest('.hero');
 const hit=ignitionStage.querySelector('.ignition-hit');
 const art=ignitionStage.querySelector('.ignition-art');
 let pinned=false;
 function setEngine(on){hero.classList.toggle('engine-on',on);hit.setAttribute('aria-pressed',String(on));hit.setAttribute('aria-label',on?'Выключить свет автомобиля':'Включить свет автомобиля');}
 function alignIgnition(){
  const box=heroPhoto.getBoundingClientRect(),parent=hero.getBoundingClientRect();
  const scale=Math.max(box.width/1536,box.height/1024);
  Object.assign(ignitionStage.style,{left:(box.left-parent.left)+'px',top:(box.top-parent.top)+'px',width:box.width+'px',height:box.height+'px'});
  for(const layer of [art,hit])Object.assign(layer.style,{width:(1536*scale)+'px',height:(1024*scale)+'px',left:((box.width-1536*scale)/2)+'px',top:((box.height-1024*scale)/2)+'px'});
 }
 hit.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')setEngine(true);});
 hit.addEventListener('pointerleave',()=>{if(!pinned)setEngine(false);});
 hit.addEventListener('click',()=>{pinned=!pinned;setEngine(pinned);});
 hit.addEventListener('keydown',e=>{if(e.key==='Escape'){pinned=false;setEngine(false);}});
 hit.addEventListener('blur',()=>{pinned=false;setEngine(false);});
 new ResizeObserver(alignIgnition).observe(heroPhoto);
 heroPhoto.addEventListener('load',alignIgnition);alignIgnition();
}

const gallery=document.querySelector('[data-gallery]');
if(gallery){
 const main=gallery.querySelector('.gallery-main img');
 const thumbs=[...gallery.querySelectorAll('.gallery-thumbs button')];
 const count=gallery.querySelector('.gallery-count');let current=0;
 function showPhoto(index){current=(index+thumbs.length)%thumbs.length;const thumb=thumbs[current];main.src=thumb.dataset.src;main.alt=thumb.querySelector('img').alt;thumbs.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===current)));count.textContent=(current+1)+' / '+thumbs.length;gallery.querySelector('.gallery-original').href=main.src;}
 thumbs.forEach((b,i)=>b.addEventListener('click',()=>showPhoto(i)));
 gallery.querySelector('[data-prev]').addEventListener('click',()=>showPhoto(current-1));
 gallery.querySelector('[data-next]').addEventListener('click',()=>showPhoto(current+1));
 gallery.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();showPhoto(current+1)}if(e.key==='ArrowLeft'){e.preventDefault();showPhoto(current-1)}});
}
