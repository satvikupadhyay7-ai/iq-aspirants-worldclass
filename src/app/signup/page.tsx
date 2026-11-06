 "use client";
import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function SignUp() {
  const [name,setName]=useState(""); const [email,setEmail]=useState(""); const [password,setPassword]=useState("");
  const [confirm,setConfirm]=useState(""); const [message,setMessage]=useState(""); const [error,setError]=useState(""); const [loading,setLoading]=useState(false);
  async function submit(e:React.FormEvent){e.preventDefault();setError("");setMessage("");
    if(password.length<8){setError("Use a password with at least 8 characters.");return;}
    if(password!==confirm){setError("Passwords do not match.");return;}
    setLoading(true);
    try { const supabase=createClient(); const {error,data}=await supabase.auth.signUp({email,password,options:{data:{full_name:name,role:"student"}}}); if(error)throw error;
      if (data.session) { const requested = new URLSearchParams(window.location.search).get("next"); const destination = requested && requested.startsWith("/") && !requested.startsWith("//") ? requested : "/dashboard"; window.location.assign(destination); return; }
      setMessage("Account created. Check your email to verify your address, then sign in.");
    } catch(err){setError(err instanceof Error?err.message:"Unable to create account.");} finally{setLoading(false);}
  }
  return <main className="auth-wrap"><form className="auth-card" onSubmit={submit}>
    <div className="eyebrow">Create your account</div><h1>Your journey starts here.</h1><p className="muted">Join a space built for focused, supported growth.</p>
    <div className="field"><label>Full name</label><input required value={name} onChange={e=>setName(e.target.value)} placeholder="Your full name"/></div>
    <div className="field"><label>Email address</label><input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"/></div>
    <div className="field"><label>Password</label><input type="password" required value={password} onChange={e=>setPassword(e.target.value)} placeholder="At least 8 characters"/></div>
    <div className="field"><label>Confirm password</label><input type="password" required value={confirm} onChange={e=>setConfirm(e.target.value)} placeholder="Enter password again"/></div>
    {error&&<p style={{color:"#b42318",fontSize:13}}>{error}</p>}{message&&<p style={{color:"#23734e",fontSize:13}}>{message}</p>}
    <button className="btn btn-primary" style={{width:"100%",marginTop:8}} disabled={loading}>{loading?"Creating account…":"Create account"}</button>
    <p className="muted" style={{fontSize:13,textAlign:"center",marginTop:22}}>Already registered? <Link href="/signin" style={{color:"#2e7054",fontWeight:700}}>Sign in</Link></p>
  </form></main>;
}