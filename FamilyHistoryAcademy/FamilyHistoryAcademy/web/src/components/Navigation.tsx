import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-6 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-emerald-400 animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Family History Academy</h1>
              <p className="text-xs text-white/70">For BYU Pathway Students</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link 
              className="hidden sm:block text-white/90 hover:text-white transition-colors duration-200 font-medium" 
              to="/auth/login"
            >
              Sign In
            </Link>
            <Link 
              className="inline-flex items-center px-6 py-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium hover:bg-white/20 transition-all duration-200 shadow-lg" 
              to="/auth/register"
            >
              Start Course
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
