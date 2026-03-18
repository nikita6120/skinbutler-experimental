import { useState, useEffect } from "react";

const F = "'DM Sans', system-ui, sans-serif";
const rad = 20;
const radSm = 14;

// ===== BRAND — Option C: Bold =====
const B = {
  grad: "linear-gradient(135deg, #1AAB9C 0%, #E8707A 100%)",
  teal: "#1AAB9C",
  blush: "#E8707A",
  tealBg: "#E2F7F4",
  blushBg: "#FDECEE",
  success: "#1AAB9C",
  warning: "#D08C1A",
  warningBg: "#FDF4E5",
  error: "#D85E5E",
  card: "#FAFAF9",
  glass: "rgba(255,255,255,0.5)",
  glassBorder: "rgba(255,255,255,0.65)",
  t900: "#2A2D2D", t700: "#4A4E4E", t500: "#7A7E7E",
  t400: "#9EA2A2", t300: "#C4C7C7", t200: "#E2E4E4", t100: "#F0F1F1",
  dBg: "#101313", dSurface: "#1C2121", dCard: "#2D3333",
  dCardHover: "#353C3C", dGlass: "rgba(45,51,51,0.75)",
  dBorder: "rgba(255,255,255,0.10)", dBorderLight: "rgba(255,255,255,0.14)",
  dText: "#E4E6E6", dTextSec: "#8A8F8F",
};

// ===== AMBIENT MOODS =====
const moods = {
  morning: { id:"morning", label:"Morning", icon:"sun", greeting:"Good morning", pageBg:"#F4F2ED", blob1:"rgba(208,140,26,0.08)", blob2:"rgba(26,171,156,0.05)", meta:"#D08C1A", metaLabel:"Morning", sub:"Warm golden light — energizing but gentle" },
  evening: { id:"evening", label:"Evening", icon:"moon", greeting:"Good evening", pageBg:"#EFF2F3", blob1:"rgba(26,171,156,0.08)", blob2:"rgba(100,120,170,0.06)", meta:"#6A8BA0", metaLabel:"Evening", sub:"Cool twilight calm — winding down" },
  positive: { id:"positive", label:"Positive", icon:"sparkle", greeting:"Great progress", pageBg:"#E8F6F4", blob1:"rgba(26,171,156,0.14)", blob2:"rgba(60,200,170,0.06)", meta:"#1AAB9C", metaLabel:"Improving", sub:"Teal-shifted atmosphere — skin is improving" },
  concern: { id:"concern", label:"Attention", icon:"alert", greeting:"Let's check in", pageBg:"#F5F1ED", blob1:"rgba(208,140,26,0.08)", blob2:"rgba(232,112,122,0.06)", meta:"#D08C1A", metaLabel:"Needs care", sub:"Warm amber — gentle attention, not alarm" },
};

// ===== ICONS =====
const Ic = ({d,size=20,color,sw=1.5}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color||B.t400} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"><path d={d}/></svg>;
const ic = {
  home:"M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z M9 21V12h6v9",
  scan:"M12 12m-3 0a3 3 0 106 0 3 3 0 10-6 0 M2 12h3 M19 12h3 M12 2v3 M12 19v3",
  heart:"M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z",
  journal:"M4 4h16v16H4z M8 2v4 M16 2v4 M4 10h16",
  user:"M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 3a4 4 0 100 8 4 4 0 000-8z",
  flame:"M12 22c-4-3-8-7-8-12a8 8 0 0116 0c0 5-4 9-8 12z M12 22c-1.5-1.5-3-3.5-3-6a3 3 0 016 0c0 2.5-1.5 4.5-3 6z",
  calendar:"M4 4h16v16H4z M16 2v4 M8 2v4 M4 10h16",
  sparkle:"M12 2l2.09 6.26L20 10.27l-4.91 3.82L16.18 22 12 18.27 7.82 22l1.09-7.91L4 10.27l5.91-1.01z",
  sun:"M12 17a5 5 0 100-10 5 5 0 000 10z M12 1v2 M12 21v2 M4.22 4.22l1.42 1.42 M18.36 18.36l1.42 1.42 M1 12h2 M21 12h2 M4.22 19.78l1.42-1.42 M18.36 5.64l1.42-1.42",
  moon:"M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z",
  check:"M20 6L9 17l-5-5", chevron:"M9 18l6-6-6-6",
  alert:"M12 12m-10 0a10 10 0 1020 0 10 10 0 10-20 0 M12 8v4 M12 16h.01",
  smile:"M12 12m-10 0a10 10 0 1020 0 10 10 0 10-20 0 M8 14s1.5 2 4 2 4-2 4-2 M9 9h.01 M15 9h.01",
  frown:"M12 12m-10 0a10 10 0 1020 0 10 10 0 10-20 0 M16 16s-1.5-2-4-2-4 2-4 2 M9 9h.01 M15 9h.01",
  droplet:"M12 2.69l5.66 5.66a8 8 0 11-11.31 0z",
  desert:"M2 20c2-4 4-6 6-6s4 4 6 4 4-6 6-6c2 0 3 2 4 4",
};

// ===== SHARED COMPONENTS =====
const Grain = () => <div style={{position:"absolute",inset:0,backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,backgroundRepeat:"repeat",backgroundSize:256,opacity:0.35,pointerEvents:"none",borderRadius:"inherit"}}/>;
const GT = ({children,style}) => <span style={{background:B.grad,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",...style}}>{children}</span>;
const Card = ({children,style,dk}) => <div style={{background:dk?B.dCard:B.card,borderRadius:rad,padding:20,border:`1px solid ${dk?B.dBorderLight:B.t100}`,...style}}>{children}</div>;
const Glass = ({children,style,dk}) => <div style={{background:dk?B.dGlass:B.glass,backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",borderRadius:rad,padding:20,border:`1px solid ${dk?B.dBorder:B.glassBorder}`,boxShadow:dk?"0 4px 24px rgba(0,0,0,0.2)":"0 4px 24px rgba(0,0,0,0.04)",...style}}>{children}</div>;
const Sec = ({title,sub,children}) => <div style={{marginBottom:36}}><h2 style={{fontFamily:F,fontSize:18,fontWeight:700,color:B.t900,margin:"0 0 2px",letterSpacing:-0.3}}>{title}</h2>{sub&&<p style={{fontFamily:F,fontSize:12,color:B.t400,margin:"0 0 14px"}}>{sub}</p>}{!sub&&<div style={{height:12}}/>}{children}</div>;
const Swatch = ({name,hex,border}) => <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}><div style={{width:40,height:40,borderRadius:10,background:hex,border:border?`1px solid ${B.t200}`:"none"}}/><div><div style={{fontFamily:F,fontSize:12,fontWeight:600,color:B.t900}}>{name}</div><div style={{fontFamily:F,fontSize:11,color:B.t400}}>{typeof hex==="string"&&hex.length<20?hex:""}</div></div></div>;

const Btn = ({label,v="primary",sz="md"}) => {
  const s={sm:{fontSize:13,padding:"9px 18px"},md:{fontSize:14,padding:"13px 26px"},lg:{fontSize:15,padding:"16px 0",width:"100%",textAlign:"center"}};
  const vars={primary:{background:B.grad,color:"#fff",boxShadow:`0 4px 16px rgba(26,171,156,0.22)`},soft:{background:B.tealBg,color:B.teal},secondary:{background:B.card,color:B.t700,border:`1.5px solid ${B.t200}`},ghost:{background:"transparent",color:B.t500}};
  return <button style={{fontFamily:F,fontWeight:600,border:"none",cursor:"pointer",borderRadius:radSm,transition:"all 0.25s ease",...s[sz],...vars[v]}}>{label}</button>;
};

const Ring = ({score,size=88,dk,delay=0}) => {
  const [s,setS]=useState(0);
  useEffect(()=>{setS(0);const t=setTimeout(()=>setS(score),150+delay);return()=>clearTimeout(t);},[score]);
  const r=(size-12)/2,c=2*Math.PI*r,o=c-(s/100)*c,uid=`r${score}${size}${delay}${Math.random().toString(36).slice(2,5)}`;
  return <div style={{position:"relative",width:size,height:size}}>
    <svg width={size} height={size} style={{transform:"rotate(-90deg)",position:"absolute"}}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={dk?"rgba(255,255,255,0.05)":`${B.teal}12`} strokeWidth={9}/>
      <defs><linearGradient id={uid} x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor={B.teal}/><stop offset="100%" stopColor={B.blush}/></linearGradient></defs>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={`url(#${uid})`} strokeWidth={9} strokeLinecap="round" strokeDasharray={c} strokeDashoffset={o} style={{transition:"stroke-dashoffset 1.4s cubic-bezier(0.25,0.46,0.45,0.94)"}}/>
    </svg>
    <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{fontFamily:F,fontSize:size*0.28,fontWeight:800,color:dk?B.dText:B.t900}}>{s}</span></div>
  </div>;
};

const MetricRow = ({name,score,trend,locked,dk}) => (
  <div style={{display:"flex",alignItems:"center",gap:10,padding:"12px 0",borderBottom:`1px solid ${dk?B.dBorder:B.t100}`}}>
    <div style={{flex:1,fontFamily:F,fontSize:13,fontWeight:500,color:locked?B.t400:(dk?B.dText:B.t700)}}>{name}</div>
    <div style={{width:80,height:5,borderRadius:3,background:dk?"rgba(255,255,255,0.05)":`${B.teal}12`,overflow:"hidden"}}>
      <div style={{width:`${score}%`,height:"100%",borderRadius:3,background:locked?(dk?"rgba(255,255,255,0.08)":B.t200):B.grad,filter:locked?"blur(3px)":"none",transition:"width 0.8s ease"}}/>
    </div>
    <span style={{fontFamily:F,fontSize:12,fontWeight:600,color:locked?B.t400:(dk?B.dText:B.t900),width:24,textAlign:"right",filter:locked?"blur(3px)":"none"}}>{locked?"??":score}</span>
    {!locked&&trend&&<span style={{fontSize:9,fontWeight:600,color:trend==="up"?B.teal:B.error,background:trend==="up"?B.tealBg:B.blushBg,padding:"2px 6px",borderRadius:6}}>{trend==="up"?"↑":"↓"}</span>}
    {locked&&<GT style={{fontFamily:F,fontSize:9,fontWeight:700}}>✦</GT>}
  </div>
);

const NavBar = ({active,setActive,dk}) => (
  <div style={{background:dk?"rgba(28,33,33,0.85)":B.glass,backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",borderRadius:999,padding:"5px",display:"flex",justifyContent:"center",alignItems:"center",gap:2,border:`1px solid ${dk?B.dBorder:B.glassBorder}`,boxShadow:dk?"0 4px 24px rgba(0,0,0,0.25)":"0 4px 20px rgba(0,0,0,0.04)",margin:"0 auto",maxWidth:300}}>
    {[{i:ic.home,l:"Home"},{i:ic.scan,l:"Scan"},{i:ic.heart,l:"Routine"},{i:ic.journal,l:"Journal"},{i:ic.user,l:"Profile"}].map(n=>{
      const a=active===n.l;
      return <div key={n.l} onClick={()=>setActive(n.l)} style={{display:"flex",alignItems:"center",gap:a?4:0,padding:a?"7px 14px":"7px 10px",borderRadius:999,background:a?B.grad:"transparent",cursor:"pointer",transition:"all 0.35s cubic-bezier(0.25,0.46,0.45,0.94)",overflow:"hidden",boxShadow:a?`0 2px 12px rgba(26,171,156,0.22)`:"none"}}>
        <span style={{display:"flex",flexShrink:0}}><Ic d={n.i} size={16} color={a?"#fff":(dk?B.dTextSec:B.t400)}/></span>
        <span style={{fontFamily:F,fontSize:10,fontWeight:700,color:"#fff",maxWidth:a?50:0,opacity:a?1:0,overflow:"hidden",whiteSpace:"nowrap",transition:"all 0.35s cubic-bezier(0.25,0.46,0.45,0.94)"}}>{n.l}</span>
      </div>;
    })}
  </div>
);

const Pill = ({label,iconD,active,onClick,dk}) => (
  <div onClick={onClick} style={{display:"inline-flex",alignItems:"center",gap:5,padding:"9px 16px",borderRadius:22,background:active?B.grad:(dk?B.dCard:B.card),border:`1.5px solid ${active?"transparent":(dk?B.dBorderLight:B.t200)}`,color:active?"#fff":(dk?B.dTextSec:B.t700),fontFamily:F,fontSize:13,fontWeight:active?600:400,    cursor:"pointer",transition:"all 0.25s ease",userSelect:"none",boxShadow:active?`0 2px 12px rgba(26,171,156,0.2)`:"none"}}>
    {iconD&&<span style={{display:"flex"}}><Ic d={iconD} size={14} color={active?"#fff":(dk?B.dTextSec:B.t400)}/></span>}{label}
  </div>
);

const StepCard = ({step,name,product,done,onToggle,dk}) => (
  <Card dk={dk} style={{padding:14,marginBottom:8,display:"flex",alignItems:"center",gap:12}}>
    <div onClick={onToggle} style={{width:28,height:28,borderRadius:9,flexShrink:0,cursor:"pointer",transition:"all 0.25s ease",background:done?B.grad:"transparent",border:done?"none":`2px solid ${dk?B.dBorderLight:B.t300}`,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:done?`0 2px 10px rgba(26,171,156,0.22)`:"none"}}>{done&&<Ic d={ic.check} size={14} color="#fff" sw={2.5}/>}</div>
    <div style={{flex:1}}>
      <div style={{fontFamily:F,fontSize:10,fontWeight:700,color:dk?B.dTextSec:B.t400,textTransform:"uppercase",letterSpacing:0.8,marginBottom:2}}>Step {step}</div>
      <div style={{fontFamily:F,fontSize:14,fontWeight:600,color:dk?B.dText:B.t900,opacity:done?0.35:1,textDecoration:done?"line-through":"none",transition:"all 0.25s ease"}}>{name}</div>
      <div style={{fontFamily:F,fontSize:12,color:dk?B.dTextSec:B.t400}}>{product}</div>
    </div>
    <Ic d={ic.chevron} size={16} color={dk?B.dTextSec:B.t300}/>
  </Card>
);

// ===== AMBIENT DASHBOARD =====
const AmbientDash = ({mood}) => {
  const m=moods[mood],dk=m.dark,sc=mood==="positive"?81:mood==="concern"?58:73;
  const delta=mood==="positive"?"↑ 12 pts":mood==="concern"?"↓ 3 pts":"↑ 9 pts";
  const [nav,setNav]=useState("Home");
  return <div style={{background:m.pageBg,borderRadius:rad+4,padding:20,position:"relative",overflow:"hidden",transition:"background 0.6s ease"}}>
    <Grain/><div style={{position:"absolute",top:-80,right:-60,width:220,height:220,borderRadius:"50%",background:m.blob1,filter:"blur(80px)",transition:"all 0.8s ease"}}/><div style={{position:"absolute",bottom:-60,left:-40,width:180,height:180,borderRadius:"50%",background:m.blob2,filter:"blur(70px)",transition:"all 0.8s ease"}}/>
    <div style={{position:"relative",zIndex:1}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <div><div style={{fontFamily:F,fontSize:12,color:dk?B.dTextSec:B.t500}}>{m.greeting}</div><div style={{fontFamily:F,fontSize:20,fontWeight:800,color:dk?B.dText:B.t900,letterSpacing:-0.5}}>Your Skin Today</div></div>
        <div style={{display:"flex",alignItems:"center",gap:5,padding:"5px 10px",borderRadius:18,background:`${m.meta}12`,border:`1px solid ${m.meta}22`}}><Ic d={ic[m.icon]} size={13} color={m.meta}/><span style={{fontFamily:F,fontSize:10,fontWeight:700,color:m.meta}}>{m.metaLabel}</span></div>
      </div>
      <Glass dk={dk} style={{marginBottom:10,padding:16,display:"flex",alignItems:"center",gap:16}}>
        <Ring score={sc} size={80} dk={dk}/><div><div style={{fontFamily:F,fontSize:15,fontWeight:700,color:dk?B.dText:B.t900}}>Skin Score</div><div style={{fontFamily:F,fontSize:12,color:mood==="concern"?B.blush:B.teal,fontWeight:600,marginTop:2}}>{delta}</div></div>
      </Glass>
      <div style={{display:"flex",gap:8,marginBottom:10}}>
        <Card dk={dk} style={{flex:1,padding:12,textAlign:"center"}}><div style={{display:"flex",justifyContent:"center",marginBottom:2}}><Ic d={ic.flame} size={16} color={B.teal}/></div><GT style={{fontFamily:F,fontSize:17,fontWeight:800}}>12</GT><div style={{fontFamily:F,fontSize:10,color:dk?B.dTextSec:B.t400}}>Streak</div></Card>
        <Card dk={dk} style={{flex:1,padding:12,textAlign:"center"}}><div style={{display:"flex",justifyContent:"center",marginBottom:2}}><Ic d={ic.calendar} size={16} color={dk?B.dTextSec:B.t400}/></div><div style={{fontFamily:F,fontSize:13,fontWeight:700,color:dk?B.dText:B.t900,marginTop:2}}>Week 2</div><div style={{fontFamily:F,fontSize:10,color:dk?B.dTextSec:B.t400}}>Plan</div></Card>
      </div>
      <NavBar active={nav} setActive={setNav} dk={dk}/>
    </div>
  </div>;
};

// ===== MAIN =====
export default function Kit() {
  const [tab,setTab]=useState("light");
  const [journal,setJournal]=useState("Good");
  const [steps,setSteps]=useState([false,false,false]);
  const [nav,setNav]=useState("Home");
  const [navDk,setNavDk]=useState("Home");
  const [mood,setMood]=useState("morning");
  const toggle=i=>{const n=[...steps];n[i]=!n[i];setSteps(n);};
  const isDk=tab==="dark";

  return <div style={{fontFamily:F,background:isDk?"#0C0E0E":"#EEEDEA",minHeight:"100vh",padding:16,transition:"background 0.5s ease"}}>
    <div style={{maxWidth:440,margin:"0 auto"}}>

      {/* Header */}
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}>
        <div style={{width:38,height:38,borderRadius:12,background:B.grad,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 4px 16px rgba(26,171,156,0.22)`}}><span style={{color:"#fff",fontSize:14,fontWeight:800}}>SB</span></div>
        <div><div style={{fontSize:17,fontWeight:800,color:isDk?B.dText:B.t900,letterSpacing:-0.3}}>SkinButler UI Kit</div><div style={{fontSize:11,color:B.t400}}>v5 · Bold · Complete System</div></div>
      </div>

      {/* Tabs */}
      <div style={{background:isDk?B.dSurface:B.card,borderRadius:radSm,padding:3,marginBottom:28,display:"flex",gap:3,border:`1px solid ${isDk?B.dBorder:B.t100}`}}>
        {["light","dark","ambient","tokens","principles"].map(t=>(
          <div key={t} onClick={()=>setTab(t)} style={{flex:1,padding:"8px 0",textAlign:"center",borderRadius:11,cursor:"pointer",transition:"all 0.25s ease",fontFamily:F,fontSize:11,fontWeight:tab===t?700:400,textTransform:"capitalize",background:tab===t?(isDk?B.dCard:"#fff"):"transparent",color:tab===t?(isDk?B.dText:B.t900):B.t400,boxShadow:tab===t?"0 1px 4px rgba(0,0,0,0.06)":"none"}}>{t}</div>
        ))}
      </div>

      {/* ===== LIGHT ===== */}
      {tab==="light"&&<>
        <Sec title="Dashboard" sub="Glass hero, solid cards, vibrant gradient accents">
          <div style={{background:"#F3F3F1",borderRadius:rad+4,padding:24,position:"relative",overflow:"hidden"}}>
            <Grain/><div style={{position:"absolute",top:-80,right:-60,width:220,height:220,borderRadius:"50%",background:`${B.teal}0A`,filter:"blur(80px)"}}/><div style={{position:"absolute",bottom:-60,left:-40,width:180,height:180,borderRadius:"50%",background:`${B.blush}08`,filter:"blur(70px)"}}/>
            <div style={{position:"relative",zIndex:1}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
                <div><div style={{fontFamily:F,fontSize:13,color:B.t400}}>Good morning</div><div style={{fontFamily:F,fontSize:22,fontWeight:800,color:B.t900,letterSpacing:-0.5}}>Your Skin Today</div></div>
                <div style={{width:40,height:40,borderRadius:14,background:B.glass,backdropFilter:"blur(8px)",border:`1px solid ${B.glassBorder}`,display:"flex",alignItems:"center",justifyContent:"center"}}><Ic d={ic.user} size={18} color={B.t400}/></div>
              </div>
              <Glass><div style={{display:"flex",alignItems:"center",gap:18}}><Ring score={73} size={96}/><div><div style={{fontFamily:F,fontSize:16,fontWeight:700,color:B.t900}}>Skin Score</div><div style={{fontFamily:F,fontSize:13,color:B.teal,fontWeight:600,marginTop:2}}>↑ 9 pts from last scan</div><div style={{fontFamily:F,fontSize:12,color:B.t400,marginTop:4}}>Next check-in in 8 days</div></div></div></Glass>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:10}}>
                <Card style={{padding:14,textAlign:"center"}}><div style={{display:"flex",justifyContent:"center",marginBottom:4}}><Ic d={ic.flame} size={20} color={B.teal}/></div><GT style={{fontFamily:F,fontSize:20,fontWeight:800}}>12</GT><div style={{fontFamily:F,fontSize:11,color:B.t400}}>Day Streak</div></Card>
                <Card style={{padding:14,textAlign:"center"}}><div style={{display:"flex",justifyContent:"center",marginBottom:4}}><Ic d={ic.calendar} size={20} color={B.t400}/></div><div style={{fontFamily:F,fontSize:14,fontWeight:700,color:B.t900,marginTop:2}}>Week 2</div><div style={{fontFamily:F,fontSize:11,color:B.t400}}>Starter Plan</div></Card>
              </div>
            </div>
          </div>
        </Sec>

        <Sec title="Scan Results" sub="Gradient score rings with metric rows">
          <div style={{background:"#F3F3F1",borderRadius:rad+4,padding:24,position:"relative",overflow:"hidden"}}><Grain/><div style={{position:"relative",zIndex:1}}>
            <Glass style={{marginBottom:12}}><div style={{display:"flex",justifyContent:"center",gap:16}}><Ring score={73} size={72} delay={0}/><Ring score={82} size={72} delay={100}/><Ring score={45} size={72} delay={200}/></div></Glass>
            <Card><div style={{fontFamily:F,fontSize:10,fontWeight:700,color:B.t400,textTransform:"uppercase",letterSpacing:0.8,marginBottom:8}}>Your Metrics</div>
              <MetricRow name="Hydration" score={73} trend="up"/><MetricRow name="Redness" score={42} trend="down"/><MetricRow name="Firmness" score={82} trend="up"/><MetricRow name="Texture" score={58} locked/><MetricRow name="Dark Spots" score={65} locked/><MetricRow name="Pore Size" score={44} locked/>
              <div style={{textAlign:"center",marginTop:14}}><GT style={{fontFamily:F,fontSize:13,fontWeight:500,cursor:"pointer"}}>See your full skin profile →</GT></div>
            </Card>
          </div></div>
        </Sec>

        <Sec title="Daily Journal" sub="Gradient pills with icon consistency">
          <div style={{background:"#F3F3F1",borderRadius:rad+4,padding:24,position:"relative",overflow:"hidden"}}><Grain/><div style={{position:"relative",zIndex:1}}>
            <div style={{fontFamily:F,fontSize:15,fontWeight:700,color:B.t900,marginBottom:2}}>How does your skin feel?</div>
            <div style={{fontFamily:F,fontSize:12,color:B.t400,marginBottom:14}}>Tap to log</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
              {[{l:"Great",d:ic.sparkle},{l:"Good",d:ic.smile},{l:"Oily",d:ic.droplet},{l:"Dry",d:ic.desert},{l:"Irritated",d:ic.alert},{l:"Breaking out",d:ic.frown}].map(p=><Pill key={p.l} label={p.l} iconD={p.d} active={journal===p.l} onClick={()=>setJournal(p.l)}/>)}
            </div>
          </div></div>
        </Sec>

        <Sec title="Morning Routine" sub="Gradient checkboxes, chevron detail arrows">
          <div style={{background:"#F3F3F1",borderRadius:rad+4,padding:24,position:"relative",overflow:"hidden"}}><Grain/><div style={{position:"relative",zIndex:1}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8}}><Ic d={ic.sun} size={18} color={B.warning}/><span style={{fontFamily:F,fontSize:15,fontWeight:700,color:B.t900}}>Morning</span></div><span style={{fontFamily:F,fontSize:12,color:steps.filter(Boolean).length===3?B.teal:B.t400,fontWeight:600}}>{steps.filter(Boolean).length}/3</span></div>
            <StepCard step={1} name="Cleanse" product="CeraVe Hydrating Cleanser" done={steps[0]} onToggle={()=>toggle(0)}/>
            <StepCard step={2} name="Treat" product="The Ordinary Niacinamide 10%" done={steps[1]} onToggle={()=>toggle(1)}/>
            <StepCard step={3} name="Protect" product="La Roche-Posay SPF 50+" done={steps[2]} onToggle={()=>toggle(2)}/>
            {steps.every(Boolean)&&<div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6,marginTop:12}}><Ic d={ic.check} size={16} color={B.teal} sw={2}/><span style={{fontFamily:F,fontSize:13,color:B.teal,fontWeight:600}}>All done — streak +1</span></div>}
          </div></div>
        </Sec>

        <Sec title="Conversion Moments" sub="Amber nudges, teal celebrations">
          <Card style={{borderLeft:`3px solid ${B.warning}`,background:B.warningBg,marginBottom:10}}>
            <div style={{fontFamily:F,fontSize:14,fontWeight:700,color:B.t900,marginBottom:4}}>Your skin has felt dry for 5 days</div>
            <div style={{fontFamily:F,fontSize:13,color:B.t700,lineHeight:1.6,marginBottom:8}}>Your scan showed concerns not in your current plan. Your routine isn't the cause.</div>
            <GT style={{fontFamily:F,fontSize:13,fontWeight:500,cursor:"pointer"}}>Explore your full scan results →</GT>
          </Card>
          <Card style={{borderLeft:`3px solid ${B.teal}`,background:B.tealBg}}>
            <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}><Ic d={ic.sparkle} size={16} color={B.teal}/><span style={{fontFamily:F,fontSize:14,fontWeight:700,color:B.t900}}>Your skin is glowing</span></div>
            <div style={{fontFamily:F,fontSize:13,color:B.t700,lineHeight:1.6}}>12-day streak and your routine is working. Keep it up.</div>
          </Card>
        </Sec>

        <Sec title="Premium Locked" sub="Blur + gradient ✦ badge">
          <Card><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}><div style={{fontFamily:F,fontSize:16,fontWeight:700,color:B.t900}}>Your Skin Plan</div><GT style={{fontFamily:F,fontSize:10,fontWeight:700}}>✦ Premium</GT></div>
            <div style={{fontFamily:F,fontSize:13,color:B.t500,marginBottom:12}}>Personalized 8-week plan based on your scan</div>
            <div style={{filter:"blur(3px)",pointerEvents:"none",opacity:0.6}}><div style={{fontFamily:F,fontSize:13,color:B.t700,marginBottom:6}}>Week 1: Focus on hydration barrier</div><div style={{fontFamily:F,fontSize:13,color:B.t700,marginBottom:6}}>Week 3: Check-in scan</div><div style={{fontFamily:F,fontSize:13,color:B.t700}}>Week 6: Adjust routine</div></div>
            <div style={{marginTop:14}}><GT style={{fontFamily:F,fontSize:13,fontWeight:500,cursor:"pointer"}}>See your full plan →</GT></div>
          </Card>
        </Sec>

        <Sec title="Bottom Sheet Paywall" sub="Glass overlay on dimmed content">
          <div style={{background:B.dBg,borderRadius:rad,overflow:"hidden"}}><div style={{padding:16,opacity:0.2}}><div style={{height:120,borderRadius:radSm,background:"#F3F3F1"}}/></div>
            <div style={{background:"rgba(255,255,255,0.9)",backdropFilter:"blur(24px)",borderRadius:`${rad}px ${rad}px ${radSm}px ${radSm}px`,padding:24,marginTop:-16}}>
              <div style={{width:36,height:4,borderRadius:2,background:B.t300,margin:"0 auto 18px"}}/>
              <div style={{fontFamily:F,fontSize:17,fontWeight:700,color:B.t900,marginBottom:4}}>Texture Analysis</div>
              <div style={{fontFamily:F,fontSize:13,color:B.t500,lineHeight:1.6,marginBottom:18}}>Measures skin smoothness and how products absorb. Your scan analyzed this area.</div>
              <Btn label="See Your Full Metrics" v="primary" sz="lg"/>
              <div style={{fontFamily:F,fontSize:13,color:B.t400,textAlign:"center",marginTop:12,cursor:"pointer"}}>Not now</div>
            </div>
          </div>
        </Sec>

        <Sec title="Buttons" sub="Gradient primary with teal glow shadow">
          <div style={{display:"flex",flexWrap:"wrap",gap:8}}><Btn label="Start Free Trial"/><Btn label="Learn More" v="soft"/><Btn label="Settings" v="secondary"/><Btn label="Not now" v="ghost"/></div>
        </Sec>

        <Sec title="Navigation" sub="Floating glass pill — gradient active state with glow">
          <div style={{background:"#F3F3F1",borderRadius:rad+4,padding:"40px 16px 16px",position:"relative",overflow:"hidden"}}><Grain/><div style={{position:"relative",zIndex:1}}><NavBar active={nav} setActive={setNav}/></div></div>
        </Sec>
      </>}

      {/* ===== DARK ===== */}
      {tab==="dark"&&<>
        <Sec title="Dark Mode" sub="Three-layer depth with vibrant gradient accents">
          <div style={{background:B.dBg,borderRadius:rad+4,padding:20,position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",top:-80,right:-60,width:200,height:200,borderRadius:"50%",background:`${B.teal}06`,filter:"blur(80px)"}}/><div style={{position:"absolute",bottom:-40,left:-30,width:160,height:160,borderRadius:"50%",background:`${B.blush}04`,filter:"blur(60px)"}}/>
            <div style={{position:"relative",zIndex:1}}>
              <div style={{fontFamily:F,fontSize:13,color:B.dTextSec,marginBottom:2}}>Good evening</div>
              <div style={{fontFamily:F,fontSize:22,fontWeight:800,color:B.dText,letterSpacing:-0.5,marginBottom:18}}>Your Skin Today</div>

              <div style={{background:B.dSurface,borderRadius:rad,padding:4,marginBottom:10,border:`1px solid ${B.dBorderLight}`}}>
                <Glass dk style={{padding:16,display:"flex",alignItems:"center",gap:16}}><Ring score={73} size={80} dk/><div><div style={{fontFamily:F,fontSize:15,fontWeight:700,color:B.dText}}>Skin Score</div><GT style={{fontFamily:F,fontSize:12,fontWeight:600}}>↑ 9 pts improved</GT><div style={{fontFamily:F,fontSize:11,color:B.dTextSec,marginTop:3}}>Next check-in: 8 days</div></div></Glass>
              </div>

              <div style={{display:"flex",gap:8,marginBottom:10}}>
                <Card dk style={{flex:1,padding:14,textAlign:"center"}}><div style={{display:"flex",justifyContent:"center",marginBottom:2}}><Ic d={ic.flame} size={18} color={B.teal}/></div><GT style={{fontFamily:F,fontSize:18,fontWeight:800}}>12</GT><div style={{fontFamily:F,fontSize:10,color:B.dTextSec}}>Streak</div></Card>
                <Card dk style={{flex:1,padding:14,textAlign:"center"}}><div style={{display:"flex",justifyContent:"center",marginBottom:2}}><Ic d={ic.calendar} size={18} color={B.dTextSec}/></div><div style={{fontFamily:F,fontSize:13,fontWeight:700,color:B.dText,marginTop:4}}>Week 2</div><div style={{fontFamily:F,fontSize:10,color:B.dTextSec}}>Plan</div></Card>
              </div>

              <div style={{background:B.dSurface,borderRadius:rad,padding:14,border:`1px solid ${B.dBorderLight}`,marginBottom:10}}>
                <div style={{fontFamily:F,fontSize:10,fontWeight:700,color:B.dTextSec,textTransform:"uppercase",letterSpacing:0.8,marginBottom:8}}>Metrics</div>
                <MetricRow name="Hydration" score={73} trend="up" dk/><MetricRow name="Redness" score={42} trend="down" dk/><MetricRow name="Firmness" score={82} trend="up" dk/><MetricRow name="Texture" score={58} locked dk/>
                <div style={{textAlign:"center",marginTop:12}}><GT style={{fontFamily:F,fontSize:12,fontWeight:500,cursor:"pointer"}}>See full profile →</GT></div>
              </div>

              <div style={{fontFamily:F,fontSize:13,fontWeight:700,color:B.dText,marginBottom:8}}>How does your skin feel?</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:10}}>
                {["Great","Good","Oily","Dry","Irritated"].map(l=><Pill key={l} label={l} active={l==="Good"} dk/>)}
              </div>

              <StepCard step={1} name="Cleanse" product="CeraVe Cleanser" done={true} onToggle={()=>{}} dk/>
              <StepCard step={2} name="Treat" product="Niacinamide 10%" done={false} onToggle={()=>{}} dk/>

              <div style={{marginTop:8}}><NavBar active={navDk} setActive={setNavDk} dk/></div>
            </div>
          </div>
        </Sec>

        <Sec title="Dark Depth Layers">
          <div style={{display:"flex",gap:8}}>
            {[{n:"Background",c:B.dBg,h:"#101313"},{n:"Surface",c:B.dSurface,h:"#1C2121"},{n:"Card",c:B.dCard,h:"#2D3333"},{n:"Hover",c:B.dCardHover,h:"#353C3C"}].map(l=>(
              <div key={l.n} style={{flex:1,textAlign:"center"}}><div style={{width:"100%",height:48,borderRadius:12,background:l.c,border:`1px solid ${B.dBorderLight}`,marginBottom:6}}/><div style={{fontFamily:F,fontSize:10,fontWeight:600,color:B.t900}}>{l.n}</div><div style={{fontFamily:F,fontSize:9,color:B.t400}}>{l.h}</div></div>
            ))}
          </div>
        </Sec>
      </>}

      {/* ===== AMBIENT ===== */}
      {tab==="ambient"&&<>
        <Sec title="Ambient Color System" sub="Same brand — atmosphere shifts per context">
          <div style={{display:"flex",gap:4,marginBottom:16,overflowX:"auto",paddingBottom:4}}>
            {Object.values(moods).map(m=>(
              <div key={m.id} onClick={()=>setMood(m.id)} style={{padding:"7px 12px",borderRadius:14,cursor:"pointer",background:mood===m.id?B.grad:B.card,border:`1.5px solid ${mood===m.id?"transparent":B.t200}`,display:"flex",alignItems:"center",gap:4,flexShrink:0,transition:"all 0.25s ease",boxShadow:mood===m.id?`0 2px 12px rgba(26,171,156,0.2)`:"none"}}>
                <Ic d={ic[m.icon]} size={13} color={mood===m.id?"#fff":B.t400}/><span style={{fontFamily:F,fontSize:11,fontWeight:mood===m.id?700:400,color:mood===m.id?"#fff":B.t500,whiteSpace:"nowrap"}}>{m.label}</span>
              </div>
            ))}
          </div>
          <AmbientDash mood={mood}/>
          <Card style={{marginTop:12,padding:14}}><div style={{fontFamily:F,fontSize:14,fontWeight:700,color:B.t900,marginBottom:2}}>{moods[mood].label}</div><div style={{fontFamily:F,fontSize:12,color:B.t500,lineHeight:1.6}}>{moods[mood].sub}</div></Card>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginTop:10}}>
            <Card style={{padding:14}}><div style={{fontFamily:F,fontSize:10,fontWeight:700,color:B.teal,textTransform:"uppercase",letterSpacing:0.8,marginBottom:8}}>Shifts</div>{["Page background","Ambient blobs","Greeting text","Context badge","Score values"].map(i=><div key={i} style={{display:"flex",alignItems:"center",gap:5,marginBottom:4}}><div style={{width:4,height:4,borderRadius:2,background:B.teal}}/><span style={{fontFamily:F,fontSize:11,color:B.t700}}>{i}</span></div>)}</Card>
            <Card style={{padding:14}}><div style={{fontFamily:F,fontSize:10,fontWeight:700,color:B.blush,textTransform:"uppercase",letterSpacing:0.8,marginBottom:8}}>Fixed</div>{["Brand gradient","Buttons","Cards","Typography","Nav bar","Icons","Spacing"].map(i=><div key={i} style={{display:"flex",alignItems:"center",gap:5,marginBottom:4}}><div style={{width:4,height:4,borderRadius:2,background:B.blush}}/><span style={{fontFamily:F,fontSize:11,color:B.t700}}>{i}</span></div>)}</Card>
          </div>
        </Sec>
      </>}

      {/* ===== TOKENS ===== */}
      {tab==="tokens"&&<>
        <Sec title="Brand Gradient — Option C: Bold"><Card><div style={{height:48,borderRadius:14,background:B.grad,marginBottom:14,boxShadow:`0 4px 20px rgba(26,171,156,0.22)`}}/><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}><Swatch name="Dopamine Teal" hex="#1AAB9C"/><Swatch name="Coral Rose" hex="#E8707A"/></div><div style={{marginTop:10}}><Swatch name="Teal BG" hex="#E2F7F4"/><Swatch name="Blush BG" hex="#FDECEE"/></div></Card></Sec>
        <Sec title="Semantic"><Card><Swatch name="Success" hex="#1AAB9C"/><Swatch name="Warning" hex="#D08C1A"/><Swatch name="Error" hex="#D85E5E"/></Card></Sec>
        <Sec title="Light Surfaces"><Card><Swatch name="Page BG" hex="#F3F3F1"/><Swatch name="Card" hex="#FAFAF9" border/><Swatch name="Glass" hex="rgba(255,255,255,0.5)" border/></Card></Sec>
        <Sec title="Dark Surfaces"><Card><Swatch name="Background" hex="#101313"/><Swatch name="Surface" hex="#1C2121"/><Swatch name="Card" hex="#2D3333"/><Swatch name="Card Hover" hex="#353C3C"/></Card></Sec>
        <Sec title="Typography"><Card><div style={{display:"flex",flexDirection:"column",gap:12}}>
          <div><span style={{fontFamily:F,fontSize:22,fontWeight:800,color:B.t900}}>H1 Title</span><span style={{fontFamily:F,fontSize:11,color:B.t400,marginLeft:8}}>22px 800</span></div>
          <div><span style={{fontFamily:F,fontSize:17,fontWeight:700,color:B.t900}}>H2 Section</span><span style={{fontFamily:F,fontSize:11,color:B.t400,marginLeft:8}}>17px 700</span></div>
          <div><span style={{fontFamily:F,fontSize:15,fontWeight:700,color:B.t900}}>H3 Card</span><span style={{fontFamily:F,fontSize:11,color:B.t400,marginLeft:8}}>15px 700</span></div>
          <div><span style={{fontFamily:F,fontSize:14,fontWeight:400,color:B.t700}}>Body text descriptions</span><span style={{fontFamily:F,fontSize:11,color:B.t400,marginLeft:8}}>14px 400</span></div>
          <div><span style={{fontFamily:F,fontSize:13,fontWeight:400,color:B.t500}}>Small secondary</span><span style={{fontFamily:F,fontSize:11,color:B.t400,marginLeft:8}}>13px 400</span></div>
          <div><span style={{fontFamily:F,fontSize:10,fontWeight:700,color:B.t400,textTransform:"uppercase",letterSpacing:0.8}}>Caption</span><span style={{fontFamily:F,fontSize:11,color:B.t400,marginLeft:8}}>10px 700</span></div>
        </div></Card></Sec>
      </>}

      {/* ===== PRINCIPLES ===== */}
      {tab==="principles"&&<>
        <Sec title="Design Principles" sub="Complete design system — Bold">
          {[
            {t:"Bold gradient signature",d:"Teal #1AAB9C → Coral Rose #E8707A. High saturation that stops the scroll. This is 'dopamine teal' meeting warm coral — vivid enough to feel exciting on TikTok, distinct enough to own in the skincare space. The gradient glow shadow (22% opacity) adds physical presence to every active element."},
            {t:"Calm surfaces, bold accents",d:"Backgrounds #F3F3F1 and cards #FAFAF9 stay warm and neutral. The gradient lives only on interactive elements — buttons, active pills, rings, checkboxes, links. The contrast between quiet surfaces and vivid accents is what makes it feel premium, not chaotic."},
            {t:"Glass reserved for heroes",d:"One frosted glass element per screen plus overlays. Everything else solid. Glass moments feel premium because they're rare."},
            {t:"Three-layer dark depth",d:"Background #101313 → Surface #1C2121 → Card #2D3333. Each clearly distinct. Borders at 10-14% white. The gradient becomes more luminous against dark surfaces."},
            {t:"Ambient mood system",d:"Five contexts (morning, evening, positive, concern, scanner) shift only the atmosphere — page tint, blobs, greeting, badge. Brand identity stays locked."},
            {t:"Line icon consistency",d:"1.5px stroke, round caps, 16-20px. No emojis ever. Monochrome gray inactive, white on gradient active."},
            {t:"Grain for humanity",d:"Subtle noise texture on surfaces prevents sterility. Barely visible but felt."},
            {t:"Breathing animations",d:"Rings: 1.4s ease-out. Nav: 350ms. Cards: 250ms. No bouncing. Calm rhythm."},
            {t:"Blur = curiosity",d:"Locked content: 3-4px blur, labels visible, ✦ in gradient text. No padlocks, no counters."},
            {t:"Data is the design",d:"Score rings, metric bars, and streaks are the most refined visual elements. They reward engagement visually."},
          ].map((p,i)=><Card key={i} style={{marginBottom:8}}><div style={{fontFamily:F,fontSize:14,fontWeight:700,color:B.t900,marginBottom:3}}>{p.t}</div><div style={{fontFamily:F,fontSize:12,color:B.t500,lineHeight:1.6}}>{p.d}</div></Card>)}
        </Sec>
      </>}

    </div>
  </div>;
}
