import { Search, Plus, Filter, MessageSquare, Video, Youtube, MapPin } from "lucide-react";

export default function Dashboard() {
  const mockDoubts = [
    { id: 1, title: 'Calculus: Integration by Parts', subject: 'Mathematics', status: 'open', type: 'video', time: '2m ago' },
    { id: 2, title: 'Organic Chemistry: SN2 Reactions', subject: 'Chemistry', status: 'accepted', type: 'chat', time: '5m ago' },
    { id: 3, title: 'Physics: Newton\'s Second Law', subject: 'Physics', status: 'open', type: 'text', time: '10m ago' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      {/* Search Header */}
      <header className="sticky top-0 z-20 flex items-center justify-between px-8 py-4 border-b bg-card glass">
        <div className="flex items-center gap-6">
          <h2 className="text-2xl font-black text-accent">Solver.</h2>
          <div className="relative flex items-center w-96 h-10 px-4 transition-all border rounded-full border-border bg-background focus-within:ring-2 focus-within:ring-accent/50 focus-within:w-[480px]">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input type="text" placeholder="Search for doubts by subject or topic..." className="w-full px-2 text-sm bg-transparent border-none outline-none" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-6 py-2.5 font-bold transition-all bg-accent text-accent-foreground rounded-full hover:opacity-90 shadow-lg shadow-accent/20">
            <Plus className="w-5 h-5" />
            Post Doubt
          </button>
          <div className="w-10 h-10 bg-indigo-500 rounded-full cursor-pointer hover:ring-4 hover:ring-indigo-500/20" />
        </div>
      </header>

      {/* Main Feed */}
      <main className="flex w-full max-w-7xl mx-auto p-8 gap-8">
        {/* Left Sidebar Filters */}
        <aside className="hidden w-64 md:block space-y-8">
          <div>
            <h4 className="flex items-center gap-2 mb-4 font-bold text-muted-foreground uppercase text-xs tracking-widest px-2">
              <Filter className="w-3.5 h-3.5" /> Filter by Subject
            </h4>
            <div className="flex flex-col gap-2">
              {['Mathematics', 'Physics', 'Chemistry', 'Biology', 'History', 'Other'].map((subject) => (
                <button key={subject} className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all rounded-xl hover:bg-card hover:text-accent group">
                  <div className="w-1.5 h-1.5 bg-border rounded-full group-hover:bg-accent" /> {subject}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Real-time Listing */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-black opacity-80">🔥 Latest Doubts</h3>
            <span className="text-xs font-bold text-muted-foreground">32 New Doubts Today</span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {mockDoubts.map((doubt) => (
              <div key={doubt.id} className="card-premium group hover:ring-1 hover:ring-accent/20">
                <div className="flex justify-between mb-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                    <span className="px-2.5 py-1 rounded-md bg-muted text-accent">{doubt.subject}</span>
                    <span>• {doubt.time}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {doubt.type === 'video' && <Video className="w-4 h-4 text-purple-500" />}
                    {doubt.type === 'chat' && <MessageSquare className="w-4 h-4 text-indigo-500" />}
                    <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-tighter rounded-full ${doubt.status === 'open' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'}`}>
                      {doubt.status}
                    </span>
                  </div>
                </div>
                <h4 className="mb-2 text-xl font-bold group-hover:text-accent transition-colors">{doubt.title}</h4>
                <p className="mb-6 text-sm text-muted-foreground line-clamp-2">How can I apply integration by parts to this specific function? I'm getting stuck at the second step which involves u-substitution.</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200" />
                    <div>
                      <p className="text-xs font-bold">John Doe</p>
                      <p className="text-[10px] text-muted-foreground">Reputation: 450</p>
                    </div>
                  </div>
                  <button className="px-5 py-2 text-sm font-bold transition-all bg-foreground text-background rounded-xl hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed">
                    {doubt.status === 'open' ? 'Accept Now' : 'In Session'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar - Statistics/Leaderboard */}
        <aside className="hidden w-72 lg:block space-y-6">
          <div className="p-6 border rounded-2xl bg-card border-border border-dashed">
            <h4 className="mb-2 font-bold flex items-center gap-2 tracking-wide"><ShieldCheck className="w-4 h-4 text-emerald-500" /> Verified Solvers</h4>
            <p className="text-xs text-muted-foreground">Connect with teachers who have a verified badge for high accuracy.</p>
          </div>
          
          <div className="p-6 border rounded-2xl bg-gradient-to-br from-indigo-500/5 to-purple-500/5 border-border">
             <h4 className="flex items-center gap-2 mb-4 font-bold text-sm tracking-widest uppercase">🏆 Top Solvers</h4>
             <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-600 text-xs">{i}</div>
                       <span className="text-sm font-bold">Tutor {i}</span>
                    </div>
                    <span className="text-xs text-muted-foreground font-black">+420 pts</span>
                  </div>
                ))}
             </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
