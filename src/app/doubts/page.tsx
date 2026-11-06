 "use client";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
export default function Doubts(){const [title,setTitle]=useState("");const [subject,setSubject]=useState("Mathematics");const [topic,setTopic]=useState("");const [description,setDescription]=useState("");const [sent,setSent]=useState(false);
 return <AppShell active="/doubts"><div className="page-heading doubt-page-heading"><div><div className="eyebrow">Ask. Understand. Grow.</div><h1>Ask a doubt</h1><p className="muted">Share the part you're stuck on. Clear questions lead to better answers.</p></div></div>
 <div className="panel doubt-form-panel"><form onSubmit={e=>{e.preventDefault();setSent(true);}}><div className="field"><label>Doubt title</label><input required value={title} onChange={e=>setTitle(e.target.value)} placeholder="Summarise your question in one line"/></div>
 <div className="field"><label>Subject</label><select value={subject} onChange={e=>setSubject(e.target.value)}>{["Mathematics","Physics","Chemistry","Biology","Computer Science","Other"].map(s=><option key={s}>{s}</option>)}</select></div>
 <div className="field"><label>Topic</label><input value={topic} onChange={e=>setTopic(e.target.value)} placeholder="e.g. Integration, Newton's laws"/></div>
 <div className="field"><label>Explain your doubt</label><textarea required rows={7} value={description} onChange={e=>setDescription(e.target.value)} placeholder="Include what you tried and exactly where you got stuck."/></div>
 <div className="quote" style={{fontSize:13,marginBottom:18}}>This starter form is a UI preview. Database submission and moderation will be connected after your existing Supabase schema and policies are inspected.</div>
 <div className="doubt-submit-wrap"><button className="btn btn-primary">Preview submission</button></div>{sent&&<p style={{color:"#23734e",fontSize:13}}>Your draft is ready. It has not been submitted to the database yet.</p>}</form></div></AppShell>;
}