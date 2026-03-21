import React from "react";
import { MessageSquare, Video, ShieldCheck, Sparkles, Youtube } from "lucide-react";

export default function HomePage() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen p-4 overflow-hidden bg-background">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 blur-[120px] bg-accent/20 rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-80 h-80 blur-[100px] bg-indigo-500/10 rounded-full translate-x-1/3 translate-y-1/3" />

      {/* Hero Section */}
      <section className="relative z-10 w-full max-w-6xl py-12 text-center text-foreground">
        <div className="flex items-center justify-center gap-2 mb-4 font-bold tracking-widest uppercase text-accent animate-bounce">
          <Sparkles className="w-5 h-5" />
          <span>Learn Faster, Together</span>
        </div>
        <h1 className="mb-6 text-6xl font-black md:text-8xl gradient-text animate-in fade-in slide-in-from-bottom-4">
          Master Any <br /> Academic Doubt
        </h1>
        <p className="max-w-2xl mx-auto mb-10 text-xl md:text-2xl text-muted-foreground opacity-90">
          Connect with expert teachers and top-performing peers instantly through
          text, images, or real-time HD video calls.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button className="px-8 py-4 font-bold transition-all bg-indigo-600 rounded-full hover:bg-indigo-700 shadow-xl shadow-indigo-500/20 text-white">
            Get Started Free
          </button>
          <button className="flex items-center gap-2 px-8 py-4 font-bold transition-all border rounded-full border-border bg-card/50 hover:bg-card">
            <Video className="w-5 h-5 text-indigo-500" />
            Watch Demo
          </button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 grid grid-cols-1 gap-8 mt-24 md:grid-cols-3 max-w-6xl">
        <article className="card-premium">
          <MessageSquare className="w-12 h-12 mb-4 text-indigo-500" />
          <h3 className="mb-3 text-2xl font-bold">Instant Resolution</h3>
          <p className="text-muted-foreground">Post your doubt and get solutions within minutes. No more waiting for tomorrow.</p>
        </article>

        <article className="card-premium">
          <Video className="w-12 h-12 mb-4 text-purple-500" />
          <h3 className="mb-3 text-2xl font-bold">Live Video Calls</h3>
          <p className="text-muted-foreground">Request a 1-on-1 video session with verified teachers for complex topics.</p>
        </article>

        <article className="card-premium">
          <Youtube className="w-12 h-12 mb-4 text-red-500" />
          <h3 className="mb-3 text-2xl font-bold">Smart Fallbacks</h3>
          <p className="text-muted-foreground">If no one accepts, our AI suggests relevant high-quality YouTube resources instantly.</p>
        </article>
      </section>

      {/* Stats Section */}
      <section className="flex flex-wrap justify-center gap-12 mt-32 text-center text-muted-foreground opacity-60">
        <div>
          <p className="text-4xl font-black text-foreground">10k+</p>
          <p>Active Students</p>
        </div>
        <div>
          <p className="text-4xl font-black text-foreground">500+</p>
          <p>Verified Teachers</p>
        </div>
        <div>
          <p className="text-4xl font-black text-foreground">1M+</p>
          <p>Doubts Solved</p>
        </div>
      </section>
    </main>
  );
}
