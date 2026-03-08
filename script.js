// LOADER
window.addEventListener('load',()=>{setTimeout(()=>document.getElementById('loader').classList.add('hidden'),800);});

// NAVBAR + SCROLL TOP
window.addEventListener('scroll',()=>{
  document.getElementById('navbar').classList.toggle('scrolled',scrollY>50);
  document.getElementById('sttBtn').classList.toggle('show',scrollY>350);
});

// DRAWER (left side menu)
function openDrawer(){
  document.getElementById('drawer').classList.add('open');
  document.getElementById('drawerOverlay').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeDrawer(){
  document.getElementById('drawer').classList.remove('open');
  document.getElementById('drawerOverlay').classList.remove('open');
  document.body.style.overflow='';
}

// Single hero bg image - no slideshow needed



// SCROLL REVEAL
const revEls=document.querySelectorAll('.reveal,.reveal-l,.reveal-r');
new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');});
},{threshold:0.10}).observe&&revEls.forEach(r=>new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');});
},{threshold:0.10}).observe(r));

// COUNTERS
document.querySelectorAll('.ctr-num[data-target]').forEach(el=>{
  new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting && !el.dataset.done){
        el.dataset.done=1;
        const tgt=+el.dataset.target,sfx=el.dataset.suffix||'';
        let cur=0;const step=Math.ceil(tgt/68);
        const t=setInterval(()=>{cur=Math.min(cur+step,tgt);el.textContent=cur.toLocaleString()+sfx;if(cur>=tgt)clearInterval(t);},22);
      }
    });
  },{threshold:0.5}).observe(el);
});

// FACULTY TABS
function filterFac(cat,btn){
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.fac-card').forEach(c=>{const cats=(c.dataset.cat||'').split(' ');c.style.display=(cat==='all'||cats.includes(cat))?'':'none';});
}

// FACULTY MODAL DATA
const facData={
  rajeev:{name:'Rajeev Jain Sir',role:'Founder & CEO – Wizard of Accounts',img:'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&q=80',detail:'Rajeev Jain Sir, the "Wizard of Accounts", has transformed Commerce education for 15+ years. His unique methodology breaks complex Accountancy into simple, memorable frameworks. Under his leadership, Expert Coaching Centre became one of Delhi\'s most trusted coaching institutes.',badges:['Accountancy','Business Studies','15+ Years','Founder & CEO']},
  chetna:{name:'Chetna Didi',role:'Commerce Faculty – Business Studies',img:'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',detail:'Chetna Didi teaches Business Studies with clarity and enthusiasm. Her structured notes and exam-focused approach help students gain deep command over the subject, consistently delivering high board results.',badges:['Business Studies','Commerce','8+ Years']},
  pratham:{name:'Pratham Bhaiya',role:'Economics Faculty',img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',detail:'Pratham Bhaiya teaches Economics with a real-world approach, making macro and micro concepts relatable and easy to retain. His students score high in both board exams and competitive papers involving Economics.',badges:['Economics','Class 11–12','7+ Years']},
  rajan:{name:'Rajan Sir',role:'Director – Science, Maths & Polytechnic',img:'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',detail:'Rajan Sir is the Director of Expert Coaching Centre and leads the Science, Mathematics, and Polytechnic department. His deep conceptual approach in Physics, Chemistry and Maths has helped hundreds of students crack board exams and polytechnic entrance tests with top scores.',badges:['Physics','Chemistry','Mathematics','Polytechnic','12+ Years','Director']},
  rakesh:{name:'Rakesh Sir',role:'English Faculty',img:'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',detail:'Rakesh Sir builds strong English communication and grammar skills across all classes. His creative teaching — storytelling, debates, writing exercises — gives students real confidence in English.',badges:['English','Grammar','All Classes','9+ Years']},
  pinki:{name:'Pinki Jain Ma\'am',role:'Hindi Faculty',img:'https://images.unsplash.com/photo-1494790108755-2616b9e5e5c2?w=400&q=80',detail:'Pinki Jain Ma\'am is a dedicated Hindi teacher who makes the language accessible and interesting. Her methodical approach to grammar, comprehension and writing helps students excel in board examinations.',badges:['Hindi','Grammar','Literature','10+ Years']},
};
function openM(id){
  const d=facData[id];if(!d)return;
  document.getElementById('mPhoto').src=d.img;
  document.getElementById('mName').textContent=d.name;
  document.getElementById('mRole').textContent=d.role;
  document.getElementById('mDetail').textContent=d.detail;
  document.getElementById('mBadges').innerHTML=d.badges.map(b=>`<span class="m-badge">${b}</span>`).join('');
  document.getElementById('modalBg').classList.add('open');
}
function closeM(){document.getElementById('modalBg').classList.remove('open');}
function closeMO(e){if(e.target===document.getElementById('modalBg'))closeM();}

// FORM
function subForm(e){
  e.preventDefault();
  document.getElementById('admForm').style.display='none';
  document.getElementById('formOk').style.display='block';
}
// COURSE POPUP
let selectedCourse = '';
function openCoursePopup(){
  document.getElementById('coursePopup').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeCoursePopup(){
  document.getElementById('coursePopup').classList.remove('open');
  document.body.style.overflow='';
}
function closeCoursePopupOutside(e){
  if(e.target===document.getElementById('coursePopup')) closeCoursePopup();
}
function selectCourse(btn, name){
  document.querySelectorAll('.cpop-course-btn').forEach(b=>b.classList.remove('selected'));
  btn.classList.add('selected');
  selectedCourse = name;
  const lbl = document.getElementById('cpopSelectedLabel');
  lbl.textContent = '✦ Selected: ' + name;
  lbl.style.display = 'inline-block';
}
function submitCourseForm(){
  const name = document.getElementById('cpopName').value.trim();
  const phone = document.getElementById('cpopPhone').value.trim();
  if(!name){ alert('Please enter student name'); document.getElementById('cpopName').focus(); return; }
  if(!phone){ alert('Please enter WhatsApp number'); document.getElementById('cpopPhone').focus(); return; }
  document.getElementById('cpopMain').style.display='none';
  document.getElementById('cpopSuccess').style.display='block';
  // Reset after 4s if user reopens
  setTimeout(()=>{
    document.getElementById('cpopMain').style.display='';
    document.getElementById('cpopSuccess').style.display='none';
    document.getElementById('cpopName').value='';
    document.getElementById('cpopPhone').value='';
    document.getElementById('cpopClass').value='';
    document.getElementById('cpopBatch').value='';
    selectedCourse='';
    document.getElementById('cpopSelectedLabel').style.display='none';
    document.querySelectorAll('.cpop-course-btn').forEach(b=>b.classList.remove('selected'));
  }, 3000);
}