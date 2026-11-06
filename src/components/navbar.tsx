"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function Navbar() {
  const [user, setUser] = useState<{ id: string } | null>(null);
  const [ready, setReady] = useState(false);
  const router = useRouter();
  useEffect(() => {
    let active = true;
    let supabase: ReturnType<typeof createClient>;
    try {
      supabase = createClient();
      supabase.auth.getUser().then(({ data }) => { if (active) { setUser(data.user ? { id: data.user.id } : null); setReady(true); } });
      const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
        if (active) { setUser(session?.user ? { id: session.user.id } : null); setReady(true); }
      });
      return () => { active = false; listener.subscription.unsubscribe(); };
    } catch { setReady(true); return () => { active = false; }; }
  }, []);
  async function signOut() {
    try { await createClient().auth.signOut(); } finally { setUser(null); router.push("/"); router.refresh(); }
  }
  return <header className="navbar">
    <Link href="/" className="brand"><span className="brand-mark">IQ</span><span>aspirants<span style={{color:"#2e7054"}}>.</span></span></Link>
    <nav className="nav-links">
      <Link href="/#experience">Experience</Link><Link href="/#features">Features</Link>
      {ready && (user ? <button type="button" className="btn btn-ghost nav-auth" onClick={signOut}><LogOut size={15}/> Sign out</button> : <Link href="/signin" className="btn btn-ghost nav-auth">Sign in</Link>)}
      <Link href={user ? "/dashboard" : "/signup"} className="btn btn-primary">{user ? "My workspace" : "Get started"} <BookOpen size={15}/></Link>
    </nav>
  </header>;
}
