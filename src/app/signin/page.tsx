 "use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignIn() {
  const [email,setEmail]=useState(""); const [password,setPassword]=useState("");
  const [error,setError]=useState(""); const [loading,setLoading]=useState(false); const router=useRouter();
  async function submit(e:React.FormEvent){e.preventDefault();setError("");setLoading(true);
    try { const supabase=createClient(); const {error}=await supabase.auth.signInWithPassword({email,password}); if(error) throw error; const requested = new URLSearchParams(window.location.search).get("next"); const destination = requested && requested.startsWith("/") && !requested.startsWith("//") ? requested : "/dashboard"; router.push(destination); router.refresh(); }
    catch(err){setError(err instanceof Error?err.message:"Unable to sign in.");} finally{setLoading(false);}
  }
  return <main className="auth-wrap"><form className="auth-card" onSubmit={submit}>
    <div className="eyebrow">Welcome back</div><h1>Pick up where you left off.</h1><p className="muted">Sign in to your IQ Aspirants account.</p>
    <div className="field"><label>Email address</label><input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"/></div>
    <div className="field"><label>Password</label><input type="password" required value={password} onChange={e=>setPassword(e.target.value)} placeholder="Your password"/></div>
    {error&&<p style={{color:"#b42318",fontSize:13}}>{error}</p>}
    <button className="btn btn-primary" style={{width:"100%",marginTop:8}} disabled={loading}>{loading?"Signing in…":"Sign in"}</button>
    <p className="muted" style={{fontSize:13,textAlign:"center",marginTop:22}}>New here? <Link href="/signup" style={{color:"#2e7054",fontWeight:700}}>Create an account</Link></p>
  </form></main>;
}