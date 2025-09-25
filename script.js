const JOBS = [
  { id: 'mcd', name: "McDonald's", category: 'Food', url: 'https://careers.mcdonalds.com/', dateAdded: '2025-09-10' },
  { id: 'starb', name: 'Starbucks', category: 'Food', url: 'https://careers.starbucks.com/', dateAdded: '2025-09-12' },
  { id: 'walmart', name: 'Walmart', category: 'Retail', url: 'https://careers.walmart.com/', dateAdded: '2025-09-04' }
];

const ICON_MAP = { 'Food':'icon-burger','Retail':'icon-cart','default':'icon-briefcase' };

const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

function isNew(iso, days=14){ return (new Date()-new Date(iso))/(1000*60*60*24) <= days; }

function renderGrid({search='', category='all'}={}){
  const grid = $('#grid'); grid.innerHTML='';
  const query = search.trim().toLowerCase();
  const filtered = JOBS.filter(j=>{
    if(category!=='all'&&j.category!==category)return false;
    if(!query)return true;
    return j.name.toLowerCase().includes(query)||j.category.toLowerCase().includes(query);
  });
  $('#jobCount').textContent=`${filtered.length} job${filtered.length===1?'':'s'}`;
  filtered.forEach(job=>{
    const a=document.createElement('a'); a.className='card'; a.href=job.url; a.target='_blank';
    const wrap=document.createElement('div'); wrap.className='icon-wrap';
    const svg=document.createElementNS('http://www.w3.org/2000/svg','svg'); svg.setAttribute('class','icon'); svg.setAttribute('width','30'); svg.setAttribute('height','30');
    svg.innerHTML=`<use href="#${ICON_MAP[job.category]||ICON_MAP['default']}"></use>`;
    wrap.appendChild(svg); a.appendChild(wrap);
    const title=document.createElement('div'); title.className='title'; title.textContent=job.name; a.appendChild(title);
    const meta=document.createElement('div'); meta.className='meta'; meta.textContent=job.category; a.appendChild(meta);
    if(isNew(job.dateAdded)){ const nb=document.createElement('div'); nb.className='new-badge'; nb.textContent='NEW'; a.appendChild(nb); }
    grid.appendChild(a);
  });
}

document.addEventListener('DOMContentLoaded',()=>{
  document.getElementById('year').textContent = new Date().getFullYear();
  let state={search:'',category:'all'};
  renderGrid(state);
  $('#searchInput').addEventListener('input',e=>{ state.search=e.target.value; renderGrid(state); });
  $$('.tab').forEach(btn=>btn.addEventListener('click',()=>{
    $$('.tab').forEach(t=>t.classList.remove('active')); btn.classList.add('active');
    state.category=btn.dataset.cat; renderGrid(state
