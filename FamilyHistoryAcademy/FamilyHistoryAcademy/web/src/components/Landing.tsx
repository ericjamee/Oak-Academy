import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <main className="relative w-full">
      {/* Background */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"></div>
      
      {/* Hero Section */}
      <section className="relative z-10 flex items-center justify-center min-h-screen py-20 w-full">
        <div className="container mx-auto px-6 text-center w-full">
          <div className="max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-sm font-medium mb-8 backdrop-blur-sm">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
              For BYU Pathway Students
            </div>
            
            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
              <span className="block bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                Master FamilySearch
              </span>
              <span className="block bg-gradient-to-r from-blue-200 via-white to-blue-200 bg-clip-text text-transparent">
                & Genealogy Tools
              </span>
              <span className="block bg-gradient-to-r from-blue-200 via-white to-blue-200 bg-clip-text text-transparent">
                
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-12">
              Learn essential FamilySearch features and genealogy software through hands-on tutorials. 
              Master the tools you need for your BYU Pathway coursework and beyond.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link 
                className="group inline-flex items-center px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold text-lg shadow-2xl hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300"
                to="/app/courses"
              >
                <svg className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                Start Course
              </Link>
              <Link 
                className="group inline-flex items-center px-8 py-4 rounded-2xl border-2 border-white/30 text-white font-semibold text-lg hover:bg-white/10 transition-all duration-300"
                to="#features"
              >
                <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Course Overview
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-24 bg-white/5 backdrop-blur-sm w-full">
        <div className="container mx-auto px-6 w-full">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Master the Tools You Need
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Comprehensive training on FamilySearch, genealogy software, and research techniques designed for BYU Pathway students.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <div className="group p-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">FamilySearch Mastery</h3>
              <p className="text-white/80 leading-relaxed">Learn to navigate FamilySearch effectively, from basic searches to advanced source linking and tree management.</p>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Hands-On Practice</h3>
              <p className="text-white/80 leading-relaxed">Interactive tutorials with real examples to practice genealogy software features and research workflows.</p>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z M12 14v6.5" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Course Credit Ready</h3>
              <p className="text-white/80 leading-relaxed">Designed specifically for BYU Pathway coursework with assessments and progress tracking for academic success.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
