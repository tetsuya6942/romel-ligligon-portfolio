import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Unlock, LogOut, ArrowRight, ShieldCheck, Database } from "lucide-react";
import PageTransition from "../components/PageTransition";
import { useToast } from "../hooks/useToast";

interface AdminPageProps {
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
}

export default function AdminPage({ isAdmin, setIsAdmin }: AdminPageProps) {
  const toast = useToast();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok && data.success) {
        localStorage.setItem("admin_token", data.token);
        setIsAdmin(true);
        setPassword("");
        toast.show("Administrative session successfully authenticated!", "success");
        navigate("/");
      } else {
        const errMsg = data.error || "Incorrect administrative credentials.";
        setError(errMsg);
        toast.show(errMsg, "error");
      }
    } catch (err) {
      setLoading(false);
      const netMsg = "Fatal network error connecting to admin service.";
      setError(netMsg);
      toast.show(netMsg, "error");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setIsAdmin(false);
    toast.show("Administrative session terminated successfully.", "success");
    navigate("/");
  };

  return (
    <PageTransition>
      <section className="min-h-screen flex items-center justify-center px-6 md:px-12 select-none py-32 max-w-7xl mx-auto">
        <div className="border border-black w-full max-w-md p-8 md:p-12 relative overflow-hidden bg-white">
          {/* Subtle line elements for Brutalist layout */}
          <div className="absolute top-0 left-0 w-full h-1 bg-black" />

          {isAdmin ? (
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-black/55 block">
                    SESSION STATUS // ACTIVE
                  </span>
                  <h2 className="text-3xl font-display font-bold uppercase tracking-tight text-black mt-1">
                    System Admin
                  </h2>
                </div>
                <div className="p-2 border border-black bg-black text-white">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              </div>

              <div className="h-px bg-black/10 my-2" />

              <p className="font-mono text-xs leading-relaxed text-black/75">
                You are currently logged in as **Romel Ligligon**. All administrative privileges are unlocked. You can now add and delete catalog project records dynamically.
              </p>

              <div className="flex flex-col gap-3 font-mono text-[10px] uppercase tracking-wider text-black/50 border border-black/10 p-4">
                <div className="flex items-center gap-2">
                  <Database className="w-3.5 h-3.5 text-black" />
                  <span>SUPABASE SYNC STATUS: CONNECTED</span>
                </div>
                <div>SECURE SESSION KEY INJECTED</div>
              </div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-widest bg-black text-white p-3 hover:bg-black/90 active:scale-98 transition-all cursor-pointer mt-4"
              >
                <LogOut className="w-4 h-4" />
                <span>TERMINATE SESSION [ LOGOUT ]</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="flex flex-col gap-6">
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-black/55 block">
                    SECURED PROTOCOL // AUTHENTICATION
                  </span>
                  <h2 className="text-3xl font-display font-bold uppercase tracking-tight text-black mt-1">
                    Admin Access
                  </h2>
                </div>
                <div className="p-2 border border-black text-black">
                  <Lock className="w-5 h-5" />
                </div>
              </div>

              <div className="h-px bg-black/10" />

              <p className="font-mono text-[11px] leading-relaxed text-black/60">
                Supply administrative token credentials to toggle active catalog manipulation access.
              </p>

              {error && (
                <div className="p-3 bg-black text-white font-mono text-[10px] uppercase tracking-wider text-center">
                  {error}
                </div>
              )}

              <div>
                <label className="block font-mono text-[9px] uppercase tracking-widest text-black/60 mb-2">
                  Administrator Token Key *
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter security key..."
                    className="w-full bg-white border border-black p-3 pr-10 font-mono text-xs focus:outline-none"
                    required
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-black/40">
                    <Unlock className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-widest bg-black text-white p-3.5 hover:bg-black/90 active:scale-98 transition-all cursor-pointer disabled:opacity-50 mt-2"
              >
                <span>{loading ? "VERIFYING KEY..." : "ENGAGE ACCESS"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
