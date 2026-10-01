(function(){
  const esc=s=>String(s).replace(/[&<>\"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));
  const pill=(x)=>`<span class="vchip">${x}</span>`;
  const row=(items)=>`<div class="vrow">${items.map(x=>`<span class="vitem">${x}</span>`).join('')}</div>`;
  const svg=(body,w=320,h=130)=>`<svg class="vsvg" viewBox="0 0 ${w} ${h}" role="img" aria-label="Minh họa bài toán">${body}</svg>`;
  const rect=(x,y,w,h,fill='#fde68a',stroke='#64748b',sw=2,r=8)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
  const circle=(x,y,r,fill='#86efac',stroke='#64748b',sw=2)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
  const line=(x1,y1,x2,y2,stroke='#475467',sw=4)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round"/>`;
  const txt=(x,y,t,size=20,fill='#182033',weight=800,anchor='middle')=>`<text x="${x}" y="${y}" text-anchor="${anchor}" font-size="${size}" font-weight="${weight}" fill="${fill}" font-family="ui-rounded,system-ui,sans-serif">${esc(t)}</text>`;
  const clock=(hour,minute=0)=>{const a=(hour%12+minute/60)*30*Math.PI/180,b=(minute)*6*Math.PI/180;const cx=70,cy=70,r=48;return svg(circle(cx,cy,r,'#fff','#7c3aed',3)+[0,3,6,9].map(n=>txt(cx+Math.sin(n*Math.PI/6)*38,cy-Math.cos(n*Math.PI/6)*38,String(n||12),12,'#475467',800)).join('')+line(cx,cy,cx+Math.sin(a)*27,cy-Math.cos(a)*27,'#182033',5)+line(cx,cy,cx+Math.sin(b)*37,cy-Math.cos(b)*37,'#ec4899',4)+circle(cx,cy,4,'#7c3aed','#7c3aed',1),140,140)};
  const triangles=(n=4)=>{let s='';for(let i=0;i<n;i++){let x=35+i*58;s+=`<polygon points="${x},105 ${x+28},45 ${x+56},105" fill="${['#fde68a','#86efac','#93c5fd','#f9a8d4'][i%4]}" stroke="#64748b" stroke-width="2"/>`; }return svg(s,320,130)};
  const squares=(n=3)=>{let s='';for(let i=0;i<n;i++)s+=rect(35+i*72,40,58,58,['#fde68a','#93c5fd','#86efac'][i%3]);return svg(s,320,130)};
  const pencils=n=>row(Array.from({length:n},()=>'<span class="pencil">✏️</span>'));
  const bananas=n=>row(Array.from({length:n},()=>'<span>🍌</span>'));
  function visual(themeId,qi,qtext){
    const q=qtext.toLowerCase();
    if(themeId===1){
      const map={0:()=>`<div class="vbox">${pill('91')} ${pill('81')} ${pill('11')} ${pill('90')}</div>`,1:()=>`<div class="mathbig">49 − □5 = 24</div>`,2:()=>`<div class="vbox">${pencils(10)}</div>`,3:()=>`<div class="vbox">🐰🐰🐰🐰🐰　　🥕🥕🥕</div>`,4:()=>`<div class="mathbig">8 &lt; □ &lt; 10</div>`,5:()=>`<div class="mathbig">6　□　10</div>`,6:()=>svg(line(50,90,100,90,'#f97316',5)+line(100,90,100,40,'#f97316',5)+line(100,40,50,40,'#f97316',5)+line(50,40,50,65,'#f97316',5)+line(50,65,100,65,'#f97316',5)),7:()=>`<div class="numberline">□　2　3</div>`,8:()=>`<div class="mathbig">2 &lt; □</div>`,9:()=>`<div class="vbox">✏️　🧽🧽🧽</div>`,10:()=>`<div class="mathbig">79　→　?</div>`,11:()=>`<div class="mathbig">4 = □</div>`,12:()=>`<div class="mathbig">5 &lt; 🐷 &lt; 8</div>`,13:()=>svg(line(40,95,40,35,'#f97316',5)+line(40,35,95,35,'#f97316',5)+line(95,35,95,95,'#f97316',5)+line(40,95,95,95,'#f97316',5)+txt(155,70,'+','28','#7c3aed')+line(200,95,200,35,'#f97316',5)+line(200,35,250,35,'#f97316',5)+line(250,35,250,95,'#f97316',5)+line(200,95,250,95,'#f97316',5)),14:()=>`<div class="vbox">${bananas(4)}　　${bananas(4)}</div>`,15:()=>`<div class="mathbig">🦀 &gt; 7</div>`,16:()=>`<div class="mathbig">6　□　8</div>`,17:()=>triangles(3),18:()=>`<div class="vbox">🍌🍌🍌　　🍊🍊</div>`,19:()=>`<div class="mathbig">5 − 2 + 4 = □</div>`,20:()=>`<div class="mathbig">6 − 1 − 4　□　8 − 3 − 4</div>`,21:()=>triangles(6),22:()=>svg(txt(80,50,'1',22,'#f97316')+line(60,65,60,105,'#f97316',5)+line(60,65,115,65,'#f97316',5)+line(115,65,115,105,'#f97316',5)+line(60,105,115,105,'#f97316',5)+txt(145,90,'→ 3','24','#182033','900','start')),23:()=>`<div class="vbox">🍬🍬🍬🍬🍬🍬🍬🍬🍬<br><small>5 viên đã được gạch bỏ</small></div>`,24:()=>svg(line(50,35,50,100,'#f97316',5)+line(50,35,105,35,'#f97316',5)+line(105,35,105,100,'#f97316',5)+line(50,68,105,68,'#f97316',5))}; if(map[qi]) return `<div class="visual-code">${map[qi]()}</div>`;
    }
    if(themeId===2){
      if(qi===0)return `<div class="visual-code">${svg(rect(25,45,55,45,'#38bdf8')+rect(95,35,55,55,'#fde047')+`<polygon points="215,30 270,67 215,104 160,67" fill="#4ade80" stroke="#64748b" stroke-width="2"/>`,300,130)}</div>`;
      if([1,23].includes(qi))return `<div class="visual-code">${svg(rect(45,30,70,70,'#fde68a')+rect(95,50,70,70,'#93c5fd')+txt(230,72,'A','28','#7c3aed'))}</div>`;
      if(qi===2)return `<div class="visual-code">${triangles(3)}</div>`;
      if(qi===3)return `<div class="visual-code">${svg(rect(105,22,100,95,'#dbeafe','#64748b',2,10)+rect(118,35,74,30,'#bfdbfe','#64748b',1,5))}</div>`;
      if(qi===4)return `<div class="visual-code">${squares(4)}</div>`;
      if(qi===5)return `<div class="visual-code">${svg(rect(45,45,95,55,'#d6d3d1')+rect(65,25,95,55,'#d6d3d1'))}</div>`;
      if([6,8].includes(qi))return `<div class="visual-code">${triangles(qi===6?4:3)}</div>`;
      if([7,9].includes(qi))return `<div class="visual-code">${squares(qi===7?2:4)}</div>`;
      if(qi===10)return `<div class="visual-code">${row(['🐻🐻','🦊🦊🦊🦊','🐰🐰🐰'])}</div>`;
      if(qi===11)return `<div class="visual-code">${svg(rect(30,30,80,70,'#fef3c7')+rect(125,30,80,70,'#dcfce7')+rect(220,30,60,70,'#dbeafe'),310,130)}</div>`;
      if(qi===12)return `<div class="visual-code">${svg(circle(120,55,32,'#22c55e','#166534',2)+rect(110,80,20,45,'#92400e','#78350f',1))}</div>`;
      if(qi===13)return `<div class="visual-code">${svg(rect(35,50,50,25,'#86efac')+rect(100,35,50,40,'#fde047')+`<polygon points="185,75 215,35 245,75" fill="#f97316"/>`+rect(265,40,20,55,'#fca5a5'),310,130)}</div>`;
      if(qi===14)return `<div class="visual-code">${svg(rect(30,45,50,25,'#38bdf8')+rect(95,45,50,25,'#fde047')+`<polygon points="190,72 220,35 250,72" fill="#4ade80"/>`,280,120)}</div>`;
      if(qi===15)return `<div class="visual-code">${svg(rect(45,80,35,35,'#22c55e')+rect(105,60,35,55,'#60a5fa')+rect(165,35,35,80,'#f59e0b')+txt(220,110,'đồ vật nhiều nhất','16','#475467','700','start'),300,130)}</div>`;
      if(qi===16)return `<div class="visual-code">${svg(circle(110,65,48,'#dcfce7','#16a34a',2)+circle(180,65,48,'#dbeafe','#2563eb',2)+txt(110,68,'🐟🐙','18')+txt(180,68,'🐱🐶','18'),300,130)}</div>`;
      if(qi===17)return `<div class="visual-code">${svg(rect(25,45,35,55,'#22c55e')+rect(75,30,35,70,'#22c55e')+rect(125,55,35,45,'#60a5fa')+rect(175,20,35,80,'#60a5fa')+rect(225,65,35,35,'#f59e0b'),290,130)}</div>`;
      if(qi===18)return `<div class="visual-code">${row(['🐟','🐙','🦎','🐸'])}</div>`;
      if(qi===19)return `<div class="visual-code">${svg(circle(95,65,42,'#fef3c7','#d97706',2)+circle(185,65,42,'#dcfce7','#16a34a',2)+txt(95,70,'🍎🍌','17')+txt(185,70,'🌱🌷','17'),280,130)}</div>`;
      if(qi===20)return `<div class="visual-code">${svg(circle(105,65,45,'#fff','#7c3aed',2)+txt(105,55,'2 4 6 8','15','#2563eb')+txt(105,82,'1 3 5 7','15','#f97316'),280,130)}</div>`;
      if(qi===21)return `<div class="visual-code">${svg(circle(100,65,48,'#dcfce7','#16a34a',2)+circle(180,65,48,'#dbeafe','#2563eb',2)+txt(100,50,'5','26','#16a34a')+txt(180,50,'5','26','#2563eb')+txt(140,100,'8 tổng cộng','16','#475467'),300,130)}</div>`;
      if(qi===22)return `<div class="visual-code">${svg(rect(45,50,55,55,'#fde68a')+rect(125,50,55,55,'#fde68a')+rect(205,50,55,55,'#fde68a')+txt(100,35,'5 phút / bạn','16','#475467'),300,130)}</div>`;
      if(qi===24)return `<div class="visual-code">${svg(txt(70,65,'3 trang',24,'#2563eb')+txt(160,65,'×',26,'#7c3aed')+txt(230,65,'4 ngày',24,'#16a34a'),300,130)}</div>`;
    }
    if(themeId===3){
      if(qi===0)return `<div class="visual-code">${row(['🥄','🥄🥄','🥄🥄🥄'])}</div>`;
      if(qi===1)return `<div class="visual-code">${svg(rect(35,55,60,18,'#f9a8d4')+rect(95,55,60,18,'#f9a8d4')+rect(155,55,60,18,'#f9a8d4')+rect(215,55,60,18,'#f9a8d4')+txt(150,100,'6 cm','18','#475467'),310,130)}</div>`;
      if(qi===5)return `<div class="visual-code">${row(['🍓 = ?'])}</div>`;
      if(qi===6)return `<div class="visual-code"><div class="mathbig">16 cm + 4 cm　□　28 cm − 10 cm</div></div>`;
      if(qi===7)return `<div class="visual-code">${row(['🍎','⚖️','🍎'])}</div>`;
      if(qi>=9&&qi<=19)return `<div class="visual-code">${clock((qi%5)+1,qi%2?30:0)}</div>`;
      if(qi===20)return `<div class="visual-code">${row(['Thứ Ba','14','← hôm qua'])}</div>`;
      if(qi===21)return `<div class="visual-code">${row(['🌸','🌸','🌸','🌸','🌸','🌸'])}</div>`;
      if(qi===22)return `<div class="visual-code">${row(['🚧','🚧','🚧','🚧','🚧','🚧','🚧','🚧'])}</div>`;
      if(qi===23)return `<div class="visual-code">${row(['🌳','🌳','🌳','🌳','🌳'])}<div class="mathbig">1 m giữa mỗi cây</div></div>`;
      if(qi===24)return `<div class="visual-code">${row(['🌳','🌳','🌳','🌳'])}<div class="mathbig">4 m giữa mỗi cây</div></div>`;
    }
    if(themeId===4){
      if(q.includes('hình')||q.includes('quy luật')) return `<div class="visual-code">${row(['🔵','🔵🔵','🔵🔵🔵','❓'])}</div>`;
      if(qi===13)return `<div class="visual-code">${row(Array.from({length:20},(_,i)=>i===5?'👦':'•'))}</div>`;
      if(qi===15)return `<div class="visual-code">${row(['🏠','🏠','🏠','🏠','🏠','🏠','🏠','A','🏠','🏠','🏠','🏠','N'])}</div>`;
      if(qi>=16&&qi<=20)return `<div class="visual-code">${row(['🐦','🐦','🐦','🐦','🐦'])}</div>`;
      if(qi>=21)return `<div class="visual-code">${row(['🔺','🔵','🟨','🔺','❓'])}</div>`;
    }
    if(themeId===5){
      if(qi===0)return `<div class="visual-code">${row(['🐝','🐝'])}</div>`;
      if(qi<=13)return `<div class="visual-code"><div class="numberline">0　1　2　3　4　5　6　7　8　9　10</div></div>`;
      if(qi===14)return `<div class="visual-code">💰 10.000đ　−　5.000đ　−　2.000đ</div>`;
      if(qi===15)return `<div class="visual-code">🍎　❓</div>`;
      if(qi===17)return `<div class="visual-code">🐔🐔🐔🐔🐔　(1 🐔 mẹ)</div>`;
      if(qi>=18)return `<div class="visual-code">${row(['🔢','🔢','🔢','🔢'])}</div>`;
    }
    if(themeId===6){
      if(q.includes('bên phải')||q.includes('vị trí'))return `<div class="visual-code">${row(['🐶','🐱','🐷','🐔'])}</div>`;
      if(q.includes('khối')||q.includes('hộp'))return `<div class="visual-code">${svg(rect(45,45,70,55,'#bfdbfe')+rect(145,45,70,55,'#fde68a')+rect(95,20,70,55,'#bbf7d0'),270,130)}</div>`;
      if(q.includes('tam giác'))return `<div class="visual-code">${triangles(4)}</div>`;
      if(q.includes('hình tròn'))return `<div class="visual-code">${row(['⚪','⚪','⚪','⚪'])}</div>`;
      if(q.includes('hình vuông'))return `<div class="visual-code">${squares(4)}</div>`;
      return `<div class="visual-code">${row(['🔺','🟦','⚪','▭'])}</div>`;
    }
    if(themeId===7){
      if(q.includes('đồng hồ')||q.includes('mấy giờ'))return `<div class="visual-code">${clock((qi%10)+1,qi%2?30:0)}</div>`;
      if(q.includes('số')||q.includes('phép'))return `<div class="visual-code"><div class="numberline">10　11　12　13　14　15　16　17　18　19　20</div></div>`;
      return `<div class="visual-code">${row(['🧒','🕐','📚'])}</div>`;
    }
    if(themeId===8){
      if(q.includes('lịch')||q.includes('thứ'))return `<div class="visual-code">${svg(rect(45,25,210,85,'#fff','#7c3aed',2,8)+txt(150,50,'THÁNG','16','#7c3aed')+txt(80,80,'T2　T3　T4　T5　T6','14','#475467')+txt(150,103,'1　2　3　4　5　6','14','#182033'),300,130)}</div>`;
      if(q.includes('độ dài')||q.includes('cm')||q.includes('m'))return `<div class="visual-code">${svg(line(45,70,255,70,'#ec4899',8)+txt(150,45,'10 cm','18','#475467'),300,120)}</div>`;
      return `<div class="visual-code"><div class="numberline">10　20　30　40　50　60　70　80　90　100</div></div>`;
    }
    return '';
  }
  function install(){
    window.visual=function(qi){const qs=(window.MATH_QUESTIONS&&MATH_QUESTIONS[String(theme.id)])||[];const qtext=qs[qi]||'';return visual(theme.id,qi,qtext)||'<div class="visual-code"><div class="hint">Quan sát câu hỏi và chọn đáp án phù hợp.</div></div>';};
  }
  const style=document.createElement('style');style.textContent=`.visual-code{margin:8px 0 16px;padding:14px;border:1px solid #e4e7ec;border-radius:18px;background:#fbfcfe;display:flex;justify-content:center;align-items:center;min-height:86px}.vsvg{max-width:100%;height:auto}.vbox{font-size:32px;text-align:center;line-height:1.7}.vrow{display:flex;justify-content:center;align-items:center;gap:12px;flex-wrap:wrap;font-size:34px;line-height:1.2}.vitem{display:inline-flex;align-items:center;justify-content:center}.vchip{display:inline-flex;min-width:58px;padding:10px 15px;border-radius:14px;background:#f4f0ff;color:#6d28d9;font-size:26px;font-weight:900;margin:5px}.mathbig{font-size:25px;font-weight:900;text-align:center;line-height:1.5}.numberline{font-size:22px;font-weight:900;word-spacing:8px;line-height:1.8}.pencil{font-size:30px}`;document.head.appendChild(style);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();