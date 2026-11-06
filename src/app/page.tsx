import Link from "next/link";
import { ArrowUpRight, Brain, MessageCircle, Timer, Leaf, Users, ShieldCheck } from "lucide-react";

const features = [
  { href: "/doubts", icon: MessageCircle, title: "Mentorship that moves you forward", text: "Ask thoughtful questions and get guidance from mentors who understand the journey." },
  { href: "/focus-room", icon: Timer, title: "A space to do your best work", text: "Build a steady study rhythm with immersive focus environments and session tracking." },
  { href: "/meditation", icon: Leaf, title: "Make room for wellbeing", text: "Reset with guided breathing, mindfulness and a calmer approach to ambitious goals." },
  { href: "/community", icon: Users, title: "Grow together", text: "Learn alongside a community of students who are working towards meaningful goals." },
  { href: "/iq-tools", icon: Brain, title: "Tools for curious minds", text: "Keep useful academic tools and resources close to your everyday workflow." },
  { href: "/mentors", icon: ShieldCheck, title: "A thoughtful learning space", text: "Designed around student privacy, responsible moderation and trusted mentorship." }
];

export default function Home() {
  return <main className="shell">
    <section className="container hero">
      <div>
        <div className="eyebrow">Your journey, with direction</div>
        <h1>Make your ambition a <span style={{color:"#2e7054"}}>daily practice.</span></h1>
        <p>A thoughtful space for students to find mentorship, build focus, ask better questions and make progress — one day at a time.</p>
        <div style={{display:"flex",gap:12,marginTop:28,flexWrap:"wrap"}}>
          <Link href="/signup" className="btn btn-primary">Start your journey <ArrowUpRight size={17}/></Link>
          <Link href="/signin" className="btn btn-ghost">I already have an account</Link>
        </div>
        <div style={{display:"flex",gap:18,marginTop:30,color:"#718078",fontSize:13,flexWrap:"wrap"}}>
          <span>✦ Student-first experience</span><span>✦ Mentorship-led learning</span><span>✦ Focus & wellbeing</span>
        </div>
      </div>
      <div className="hero-art">
        <div style={{position:"relative",zIndex:1}}>
          <div className="pill" style={{background:"#ffffff25",color:"white"}}>A little progress, every day</div>
          <div style={{fontSize:28,fontWeight:700,maxWidth:280,lineHeight:1.2,marginTop:24}}>Find your rhythm. Keep your momentum.</div>
          <div style={{position:"absolute",right:4,top:120,fontSize:86,opacity:.2}}>✳</div>
        </div>
        <div className="art-card">
          <small>YOUR DAILY INTENTION</small>
          <div style={{fontSize:20,fontWeight:700,marginTop:8}}>Show up. Stay curious.</div>
          <div className="art-stat"><span className="pill">Focus session</span><strong>25:00</strong></div>
          <div style={{height:5,background:"#e8eee9",borderRadius:8,marginTop:14}}><div style={{width:"42%",height:5,background:"#2e7054",borderRadius:8}}/></div>
        </div>
      </div>
    </section>
    <section id="experience" style={{background:"#eef3ee",padding:"34px 0"}}>
      <div className="container" style={{display:"flex",justifyContent:"space-between",gap:24,alignItems:"center",flexWrap:"wrap"}}>
        <div><div className="eyebrow">More than a study app</div><h2 style={{fontSize:26,margin:"8px 0"}}>A better environment for becoming.</h2></div>
        <p className="section-sub" style={{maxWidth:480,margin:0}}>Bring your questions, your goals and your everyday routines into one connected student experience.</p>
      </div>
    </section>
    <section id="features" className="container section">
      <div className="eyebrow">Everything in one place</div><h2>Built around the way students grow.</h2>
      <p className="section-sub">A connected set of experiences for learning deeply, finding support and taking care of your energy.</p>
      <div className="feature-grid">{features.map(({href,icon:Icon,title,text})=><Link href={href} className="feature" key={title}><div className="feature-icon"><Icon size={20}/></div><h3>{title}</h3><p>{text}</p><span className="feature-cta">Explore feature ↗</span></Link>)}</div>
    </section>
    <section className="container section" style={{paddingTop:15}}>
      <div style={{background:"#183f32",color:"white",borderRadius:24,padding:"42px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:25,flexWrap:"wrap"}}>
        <div><div style={{color:"#b7d5c2",fontSize:11,letterSpacing:2,fontWeight:800}}>START WHERE YOU ARE</div><h2 style={{fontSize:32,margin:"12px 0"}}>Your next chapter starts here.</h2><p style={{color:"#d2e0d6",margin:0}}>Make space for focused, supported progress.</p></div>
        <Link href="/signup" className="btn" style={{background:"white",color:"#183f32"}}>Create your account <ArrowUpRight size={16}/></Link>
      </div>
    </section>
    <footer className="footer"><div className="container" style={{display:"flex",justifyContent:"space-between",gap:16,flexWrap:"wrap"}}><span>© 2026 IQ Aspirants</span><span>Learn with direction. Grow with purpose.</span></div></footer>
  </main>;
}