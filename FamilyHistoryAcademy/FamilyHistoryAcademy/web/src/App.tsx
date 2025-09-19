import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, Link, useParams, useNavigate } from 'react-router-dom'

function Landing() {
  return (
    <div className="relative min-h-dvh overflow-hidden">
      {/* Background video layer */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] h-[100vh] md:w-[100vw] md:h-[56.25vw]">
          <iframe
            className="w-full h-full pointer-events-none"
            src={"https://www.youtube.com/embed/AGcTCvn-a6g?autoplay=1&mute=1&controls=0&rel=0&loop=1&playlist=AGcTCvn-a6g&modestbranding=1&playsinline=1&start=20&vq=hd1080"}
            title="Forest background"
            frameBorder="0"
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="absolute inset-0 bg-slate-900/40" />
      </div>

      <header className="relative container mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-blue-600" />
          <span className="font-semibold text-white drop-shadow">FamilyHistoryAcademy</span>
        </div>
        <div className="flex gap-3">
          <Link className="text-white/90 hover:text-white" to="/auth/login">Log In</Link>
          <Link className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white font-medium shadow hover:bg-blue-500" to="/auth/register">Create Account</Link>
        </div>
      </header>

      <main className="relative container mx-auto px-6 pt-6 pb-16">
        <section className="mx-auto max-w-3xl text-center text-white">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow">
            Discover your story. Honor your people.
          </h1>
          <p className="mt-5 text-lg text-white/90">
            Learn family history in focused, friendly steps. Build skills, capture memories,
            and connect generations—with simple lessons you can finish in minutes.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white shadow-lg hover:bg-blue-500" to="/app/courses">
              Start Free
            </Link>
            <Link className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-5 py-2.5 font-medium text-white hover:bg-white/10" to="/auth/login">
              Log In
            </Link>
          </div>
        </section>

        <section className="mx-auto mt-14 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-white/90 backdrop-blur p-6 shadow-sm ring-1 ring-white/30">
            <h3 className="text-base font-semibold text-slate-900">Bite‑size lessons</h3>
            <p className="mt-2 text-sm text-slate-700">Five minutes a day to build momentum and confidence.</p>
          </div>
          <div className="rounded-2xl bg-white/90 backdrop-blur p-6 shadow-sm ring-1 ring-white/30">
            <h3 className="text-base font-semibold text-slate-900">Guided path</h3>
            <p className="mt-2 text-sm text-slate-700">A clear sequence from first steps to research basics.</p>
          </div>
          <div className="rounded-2xl bg-white/90 backdrop-blur p-6 shadow-sm ring-1 ring-white/30">
            <h3 className="text-base font-semibold text-slate-900">Celebrate progress</h3>
            <p className="mt-2 text-sm text-slate-700">Simple milestones to keep you motivated as you learn.</p>
          </div>
        </section>

        <section className="mx-auto mt-14 max-w-3xl text-center text-white/90">
          <p>
            “Every name tells a story. We’ll help you find them, preserve them, and pass them on.”
          </p>
        </section>
      </main>
    </div>
  )
}

function AppShell() {
  return (
    <div className="min-h-dvh bg-slate-50">
      <nav className="bg-white border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Logo and main nav */}
            <div className="flex items-center gap-8">
              <Link to="/app/courses" className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">FH</span>
                </div>
                <span className="font-bold text-slate-900">FamilyHistoryAcademy</span>
              </Link>
              
              <div className="hidden md:flex items-center gap-6">
                <Link to="/app/courses" className="text-slate-700 hover:text-slate-900 font-medium">Courses</Link>
                <Link to="/app/progress" className="text-slate-600 hover:text-slate-900">Progress</Link>
                <Link to="/app/badges" className="text-slate-600 hover:text-slate-900">Badges</Link>
              </div>
            </div>

            {/* Right side - Search and profile */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:block">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search courses..." 
                    className="w-64 pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 text-sm text-slate-600">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span>0% Complete</span>
                </div>
                
                <div className="relative">
                  <button className="flex items-center gap-2 text-sm text-slate-700 hover:text-slate-900">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 font-medium text-sm">U</span>
                    </div>
                    <span className="hidden sm:block">User</span>
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-6 py-6">
        <Routes>
          <Route path="courses" element={<CoursesPage />} />
          <Route path="courses/:slug" element={<CourseDetailPage />} />
          <Route path="*" element={<Navigate to="courses" />} />
        </Routes>
      </main>
    </div>
  )
}

// Mock course data for now (ordered as requested)
type Course = { slug: string; title: string; summary: string; lessons: string[] }
const courses: Course[] = [
  {
    slug: 'source-linker',
    title: 'SourceLinker',
    summary: 'Learn to attach historical sources to the right people with confidence.',
    lessons: ['What is SourceLinker?', 'Attach a Source', 'Review & Save'],
  },
  {
    slug: 'making-memories',
    title: 'Memories',
    summary: 'Capture photos, stories, and audio so your family lives on.',
    lessons: ['Add a Photo', 'Write a Story', 'Tag Relatives'],
  },
  {
    slug: 'grow-your-tree',
    title: 'Grow Your Tree',
    summary: 'Add new relatives methodically and keep your tree healthy.',
    lessons: ['Find a Person', 'Add with Sources', 'Avoid Common Pitfalls'],
  },
  {
    slug: 'merging-records',
    title: 'Merging Records',
    summary: 'Recognize duplicates and merge them safely without losing data.',
    lessons: ['Spot Duplicates', 'Compare Records', 'Complete the Merge'],
  },
  {
    slug: 'reverse-indexing',
    title: 'Reverse Indexing',
    summary: 'Use registers and location hints to find people when names fail.',
    lessons: ['Understanding Indexes', 'Follow the Locality', 'Correlate Clues'],
  },
  {
    slug: 'research-log-basics',
    title: 'Research Log Basics',
    summary: 'Track what you searched, why, and what to try next.',
    lessons: ['Why Logs Matter', 'Make an Entry', 'Plan Next Steps'],
  },
]

function CoursesPage() {
  const [selected, setSelected] = useState<string>(courses[0]?.slug ?? '')
  const current = courses.find((c) => c.slug === selected) ?? courses[0]
  const navigate = useNavigate()
  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      {/* Sidebar */}
      <aside className="">
        <div className="rounded-xl bg-white shadow-sm ring-1 ring-slate-200 sticky top-4">
          <div className="px-4 py-3 border-b text-xs font-semibold uppercase tracking-wide text-slate-500">Course list</div>
          <ul className="p-2 max-h-[70vh] overflow-auto">
            {courses.map((c) => (
              <li key={c.slug}>
                <button
                  onClick={() => setSelected(c.slug)}
                  className={`w-full text-left rounded-lg px-3 py-2 text-sm transition flex items-center gap-2 ${
                    selected === c.slug ? 'bg-blue-50 text-blue-700' : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span className="h-2 w-2 rounded-full bg-blue-600" />
                  {c.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main content */}
      <section>
        {/* Header with progress */}
        <div className="rounded-xl bg-white shadow-sm ring-1 ring-slate-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-500">Unit</div>
              <h1 className="text-xl font-bold text-slate-900">{current.title}</h1>
            </div>
            <div className="text-xs text-slate-600">0/1500 mastery points</div>
          </div>
          <div className="mt-3 h-2 w-full rounded-full bg-slate-200">
            <div className="h-2 w-[30%] rounded-full bg-indigo-500" />
          </div>
        </div>

        {/* Cards */}
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl bg-white shadow-sm ring-1 ring-slate-200 p-5">
            <div className="text-sm font-semibold text-slate-900">Up next for you</div>
            <p className="mt-2 text-sm text-slate-600">Great work! You’ve mastered this intro. Continue with the next lesson to build momentum.</p>
            <div className="mt-4">
              <button
                onClick={() => navigate(`/app/courses/${current.slug}`)}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white shadow hover:bg-blue-500"
              >
                Go to unit
              </button>
            </div>
          </div>
          <div className="rounded-xl bg-white shadow-sm ring-1 ring-slate-200 p-5">
            <div className="text-sm font-semibold text-slate-900">About this unit</div>
            <p className="mt-2 text-sm text-slate-600">If time is useful, let’s see what we can do with two lines—sources and people. In this unit you’ll practice skills that connect evidence to your family tree with clarity and care.</p>
          </div>
        </div>

        {/* Lesson list */}
        <div className="mt-4">
          <div className="rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
            {current.lessons.map((l, i) => (
              <div key={i} className={`p-5 ${i !== 0 ? 'border-t' : ''}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
                    <div className="text-sm font-medium text-slate-900">Introduction to {l}</div>
                  </div>
                  <button
                    onClick={() => navigate(`/app/courses/${current.slug}`)}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
                  >
                    Get started
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

function CourseDetailPage() {
  const { slug } = useParams()
  const course = courses.find((c) => c.slug === slug)
  if (!course) return <div>Course not found.</div>
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <h1 className="text-3xl font-bold text-slate-900">{course.title}</h1>
        <p className="mt-2 text-slate-600">{course.summary}</p>
        <div className="mt-6 space-y-4">
          {course.lessons.map((l, i) => (
            <div key={i} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-900">Lesson {i + 1}: {l}</h3>
                <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white text-sm font-medium shadow hover:bg-blue-500">Mark Complete</button>
              </div>
              <p className="mt-2 text-sm text-slate-600">Short, friendly content goes here—examples, tips, and a quick practice. This is placeholder text for now.</p>
            </div>
          ))}
        </div>
      </div>
      <aside className="space-y-4">
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h4 className="font-semibold text-slate-900">Your Progress</h4>
          <div className="mt-3 h-2 w-full rounded-full bg-slate-200">
            <div className="h-2 w-1/5 rounded-full bg-blue-600" />
          </div>
          <p className="mt-2 text-sm text-slate-600">We’ll track completions once the backend is wired up.</p>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h4 className="font-semibold text-slate-900">What you’ll learn</h4>
          <ul className="mt-2 list-disc pl-5 text-sm text-slate-600 space-y-1">
            <li>Best practices and quick wins</li>
            <li>Hands-on, guided steps</li>
            <li>Confidence-building fundamentals</li>
          </ul>
        </div>
      </aside>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth/login" element={<div className="p-6">Login form…</div>} />
        <Route path="/auth/register" element={<div className="p-6">Register form…</div>} />
        <Route path="/app/*" element={<AppShell />} />
      </Routes>
    </BrowserRouter>
  )
}
