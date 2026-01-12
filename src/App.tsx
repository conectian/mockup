import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center p-6 font-sans selection:bg-cyan-500/30">
      {/* Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full" />
      </div>

      <main className="relative z-10 w-full max-w-2xl bg-slate-900/50 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-2xl space-y-8">
        <header className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold tracking-wide uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            Tailwind v4 Active
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-br from-white via-white to-slate-400 bg-clip-text text-transparent">
            Conectian Mockup
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-md mx-auto leading-relaxed">
            Explorando el futuro del desarrollo web con una estética premium y ultra rápida.
          </p>
        </header>

        <section className="flex flex-col items-center gap-6">
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
            <button
              onClick={() => setCount((c) => c + 1)}
              className="relative px-8 py-4 bg-slate-950 rounded-2xl leading-none flex items-center divide-x divide-slate-600 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <span className="flex items-center space-x-5 px-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-slate-100 font-medium">Incrementar contador</span>
              </span>
              <span className="pl-6 text-cyan-400 font-mono text-xl w-12 text-center">
                {count}
              </span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full pt-4">
            <div className="p-4 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-default group">
              <div className="h-2 w-2 rounded-full bg-green-400 mb-3 group-hover:animate-pulse" />
              <div className="text-sm font-semibold text-slate-200">Typography</div>
              <div className="text-xs text-slate-500 uppercase tracking-widest mt-1">Inter / Geist</div>
            </div>
            <div className="p-4 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-default group">
              <div className="h-2 w-2 rounded-full bg-blue-400 mb-3 group-hover:animate-pulse" />
              <div className="text-sm font-semibold text-slate-200">Colors</div>
              <div className="text-xs text-slate-500 uppercase tracking-widest mt-1">Slate / Cyan / Purple</div>
            </div>
          </div>
        </section>

        <footer className="text-center pt-4 border-t border-white/5">
          <p className="text-slate-500 text-sm">
            Presiona <kbd className="px-2 py-1 rounded bg-slate-800 text-slate-400 text-[10px] border border-slate-700">R</kbd> en la consola para recargar
          </p>
        </footer>
      </main>
    </div>
  )
}

export default App
