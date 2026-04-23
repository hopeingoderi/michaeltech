(function(){const s=window.localStorage;function applyLanguage(lang){const
d=(window.MTA_TRANSLATIONS||{})[lang];if(!d)return;document.documentElement.lang=lang;document.querySelectorAll('[data-i18n]').forEach(el=>{const
k=el.getAttribute('data-i18n');if(d[k])el.textContent=d[k];});s.setItem('mtaLanguage',lang);}const
sw=document.getElementById('languageSwitcher');if(sw){const
saved=s.getItem('mtaLanguage')||'en';sw.value=saved;applyLanguage(saved);sw.addEventListener('change',e=>applyLanguage(e.target.value));}const
reg=document.getElementById('registerForm');if(reg){reg.addEventListener('submit',e=>{e.preventDefault();alert('Demo
registration submitted. Connect this form to the backend API for live student
accounts.');window.location.href='student-dashboard.html';});}const
login=document.getElementById('loginForm');if(login){login.addEventListener('submit',e=>{e.preventDefault();window.location.href='student-dashboard.html';});}const
exam=document.getElementById('examForm');if(exam){exam.addEventListener('submit',e=>{e.preventDefault();const
r=document.getElementById('examResult');const data=new FormData(exam);let
score=0;['q1','q2','q3'].forEach(k=>score+=Number(data.get(k)||0));if(score>=2){r.textContent=`Passed!
Your score: ${score}/3. Certificate
unlocked.`;r.classList.add('pass');}else{r.textContent=`Not passed yet. Your
score: ${score}/3. Review the lessons and try
again.`;r.classList.remove('pass');}});}})();
