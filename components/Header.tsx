'use client';

export function Header() {
  return (
    <header className="border-b border-purple-300/20 bg-slate-900/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">🧬</div>
            <div>
              <h1 className="text-xl font-bold text-white">SynthLab</h1>
              <p className="text-xs text-purple-300">Powered by Claude AI</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-purple-200 hover:text-white transition text-sm">
              Pricing
            </a>
            <a href="#" className="text-purple-200 hover:text-white transition text-sm">
              Docs
            </a>
            <a href="#" className="text-purple-200 hover:text-white transition text-sm">
              API
            </a>
            <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition">
              Sign In
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
