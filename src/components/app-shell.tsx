"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Home, CircleHelp, Users, Timer, Flower2, UserRound, MessagesSquare, Wrench, LockKeyhole } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const studentLinks = [
  { href: "/dashboard", label: "Overview", icon: Home }, { href: "/doubts", label: "Ask Doubts", icon: CircleHelp },
  { href: "/mentors", label: "Mentors", icon: Users }, { href: "/focus-room", label: "Focus Room", icon: Timer },
  { href: "/meditation", label: "Meditation", icon: Flower2 }, { href: "/community", label: "Community", icon: MessagesSquare },
  { href: "/iq-tools", label: "IQ Tools", icon: Wrench }, { href: "/profile", label: "My Profile", icon: UserRound }
];
export function AppShell({ children, active }: { children: React.ReactNode; active: string }) {
  const [status, setStatus] = useState<"checking" | "allowed" | "blocked">("checking");
  const router = useRouter(); const pathname = usePathname();
  useEffect(() => {
    let alive = true;
    try {
      const supabase = createClient();
      supabase.auth.getUser().then(({ data }) => {
        if (!alive) return;
        if (data.user) {
          setStatus("allowed");
          // Record the first authenticated workspace visit for this local calendar.
          try {
            const now = new Date();
            const day = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}-${String(now.getDate()).padStart(2,"0")}`;
            const key = "iqaspirants-signin-days-v1";
            const existing = JSON.parse(localStorage.getItem(key) || "[]") as string[];
            if (!existing.includes(day)) localStorage.setItem(key, JSON.stringify([...existing, day].sort()));
          } catch { /* local activity tracking is optional */ }
        } else { setStatus("blocked"); router.replace(`/signin?next=${encodeURIComponent(pathname || active)}`); }
      }).catch(() => { if (alive) { setStatus("blocked"); router.replace(`/signin?next=${encodeURIComponent(pathname || active)}`); } });
    } catch { setStatus("blocked"); router.replace(`/signin?next=${encodeURIComponent(pathname || active)}`); }
    return () => { alive = false; };
  }, [active, pathname, router]);
  if (status !== "allowed") return <main className="auth-wrap"><div className="auth-card" style={{textAlign:"center"}}><LockKeyhole size={28} color="#2e7054"/><h2>{status === "checking" ? "Checking your session…" : "Sign in to continue"}</h2><p className="muted">Your student workspace is available after signing in.</p><Link className="btn btn-primary" href={`/signin?next=${encodeURIComponent(pathname || active)}`}>Sign in</Link><p className="muted" style={{fontSize:13}}>New here? <Link href={`/signup?next=${encodeURIComponent(pathname || active)}`} style={{color:"#2e7054",fontWeight:700}}>Create an account</Link></p></div></main>;
  return <div className="app-layout"><aside className="sidebar"><div className="side-label">YOUR WORKSPACE</div>{studentLinks.map(({href,label,icon:Icon}) => <Link key={href} href={href} className={`side-link ${active===href?"active":""}`}><Icon size={17}/>{label}</Link>)}</aside><main className="app-main">{children}</main></div>;
}
