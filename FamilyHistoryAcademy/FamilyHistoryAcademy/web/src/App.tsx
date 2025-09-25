import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, Link, useParams, useNavigate } from 'react-router-dom'
import Navigation from './components/Navigation'
import Landing from './components/Landing'
import Footer from './components/Footer'
import Admin from './components/Admin'
import './App.css'

function LandingPage() {
  return (
    <div className="relative w-full min-h-screen">
      <Navigation /> 
      <Landing />
      <Footer />
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
          <Route path="badges" element={<CoursesPage />} />
          <Route path="*" element={<Navigate to="courses" />} />
        </Routes>
      </main>
    </div>
  )
}

// Course and Badge data structures (matching admin system)
interface CourseContent {
  id: string;
  type: 'video' | 'reading' | 'quiz';
  title: string;
  content: string;
  videoUrl?: string;
  required: boolean;
}

interface Course {
  id: string;
  title: string;
  description: string;
  content: CourseContent[];
  estimatedDuration: number;
  status: 'draft' | 'published';
}

interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  courseIds: string[];
  status: 'draft' | 'published';
  studentsEarned: number;
}

// Sample data matching admin system
const courses: Course[] = [
  {
    id: '1',
    title: 'FamilySearch Memories',
    description: 'Learn to upload and manage family photos and stories',
    content: [
      { id: '1', type: 'video', title: 'Introduction to Memories', content: 'Overview video', videoUrl: 'https://example.com/video1', required: true },
      { id: '2', type: 'reading', title: 'Best Practices', content: 'How to organize your memories effectively...', required: true },
      { id: '3', type: 'quiz', title: 'Knowledge Check', content: 'Test your understanding', required: true }
    ],
    estimatedDuration: 30,
    status: 'published'
  },
  {
    id: '2',
    title: 'SourceLinker Basics',
    description: 'Master the art of linking historical sources to people',
    content: [
      { id: '4', type: 'video', title: 'SourceLinker Overview', content: 'Introduction to SourceLinker', videoUrl: 'https://example.com/video2', required: true },
      { id: '5', type: 'reading', title: 'Source Evaluation', content: 'How to evaluate source quality...', required: true }
    ],
    estimatedDuration: 45,
    status: 'published'
  },
  {
    id: '3',
    title: 'Reverse Indexing Techniques',
    description: 'Advanced research methods using reverse indexing',
    content: [
      { id: '6', type: 'video', title: 'Understanding Indexes', content: 'What are indexes and how to use them', videoUrl: 'https://example.com/video3', required: true }
    ],
    estimatedDuration: 60,
    status: 'published'
  }
];

const badges: Badge[] = [
  {
    id: '1',
    title: 'Intermediate User Badge',
    description: 'Master core FamilySearch features',
    icon: '🏆',
    color: 'from-blue-500 to-blue-600',
    courseIds: ['1', '2'],
    status: 'published',
    studentsEarned: 45
  },
  {
    id: '2',
    title: 'Research Expert Badge',
    description: 'Advanced research techniques and methods',
    icon: '🔍',
    color: 'from-emerald-500 to-emerald-600',
    courseIds: ['2', '3'],
    status: 'published',
    studentsEarned: 23
  }
];

function CoursesPage() {
  const [selectedBadge, setSelectedBadge] = useState<string>(badges[0]?.id ?? '')
  const [activeTab, setActiveTab] = useState<'badges' | 'courses'>('badges')
  const navigate = useNavigate()
  
  const currentBadge = badges.find((b) => b.id === selectedBadge) ?? badges[0]
  const badgeCourses = currentBadge ? courses.filter(c => currentBadge.courseIds.includes(c.id)) : []

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-xl bg-white shadow-sm ring-1 ring-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Learning Paths</h1>
            <p className="text-slate-600">Complete badge collections to master FamilySearch skills</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <span>0% Complete</span>
          </div>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-slate-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('badges')}
            className={`flex-1 px-4 py-2 rounded-md font-medium text-sm transition-colors ${
              activeTab === 'badges'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🏆 Badge Collections
          </button>
          <button
            onClick={() => setActiveTab('courses')}
            className={`flex-1 px-4 py-2 rounded-md font-medium text-sm transition-colors ${
              activeTab === 'courses'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            📚 Individual Courses
          </button>
        </div>
      </div>

      {activeTab === 'badges' && (
        <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
          {/* Badge Sidebar */}
          <aside>
            <div className="rounded-xl bg-white shadow-sm ring-1 ring-slate-200 sticky top-4">
              <div className="px-4 py-3 border-b text-xs font-semibold uppercase tracking-wide text-slate-500">
                Available Badges
              </div>
              <div className="p-2 space-y-2">
                {badges.map((badge) => (
                  <button
                    key={badge.id}
                    onClick={() => setSelectedBadge(badge.id)}
                    className={`w-full text-left rounded-lg p-3 transition-all ${
                      selectedBadge === badge.id 
                        ? 'bg-blue-50 border border-blue-200' 
                        : 'hover:bg-slate-50 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${badge.color} flex items-center justify-center text-lg`}>
                        {badge.icon}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-slate-900 text-sm">{badge.title}</div>
                        <div className="text-xs text-slate-500">{badge.courseIds.length} courses</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Badge Content */}
          <section>
            {currentBadge && (
              <>
                {/* Badge Header */}
                <div className="rounded-xl bg-white shadow-sm ring-1 ring-slate-200 p-6 mb-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${currentBadge.color} flex items-center justify-center text-2xl flex-shrink-0`}>
                      {currentBadge.icon}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-slate-900 mb-2">{currentBadge.title}</h2>
                      <p className="text-slate-600 mb-4">{currentBadge.description}</p>
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <span>{currentBadge.courseIds.length} courses required</span>
                        <span>•</span>
                        <span>{currentBadge.studentsEarned} students earned this badge</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-6">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-slate-600">Progress</span>
                      <span className="text-slate-900 font-medium">0 of {badgeCourses.length} completed</span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full">
                      <div className="h-2 bg-blue-600 rounded-full" style={{ width: '0%' }}></div>
                    </div>
                  </div>
                </div>

                {/* Courses in Badge */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900">Required Courses</h3>
                  {badgeCourses.map((course, index) => (
                    <div key={course.id} className="rounded-xl bg-white shadow-sm ring-1 ring-slate-200 p-5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-medium text-sm">
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-900">{course.title}</h4>
                            <p className="text-sm text-slate-600">{course.description}</p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                              <span>{course.estimatedDuration} minutes</span>
                              <span>•</span>
                              <span>{course.content.length} content items</span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => navigate(`/app/courses/${course.id}`)}
                          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white text-sm font-medium shadow hover:bg-blue-500 transition-colors"
                        >
                          Start Course
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </section>
        </div>
      )}

      {activeTab === 'courses' && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <div key={course.id} className="rounded-xl bg-white shadow-sm ring-1 ring-slate-200 p-6">
              <div className="mb-4">
                <h3 className="font-semibold text-slate-900 mb-2">{course.title}</h3>
                <p className="text-sm text-slate-600 mb-3">{course.description}</p>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span>{course.estimatedDuration} minutes</span>
                  <span>•</span>
                  <span>{course.content.length} items</span>
                </div>
              </div>
              <button
                onClick={() => navigate(`/app/courses/${course.id}`)}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white text-sm font-medium shadow hover:bg-blue-500 transition-colors"
              >
                Start Course
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function CourseDetailPage() {
  const { slug } = useParams()
  const course = courses.find((c) => c.id === slug)
  if (!course) return <div className="p-6 text-center">Course not found.</div>
  
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">{course.title}</h1>
          <p className="text-lg text-slate-600 mb-4">{course.description}</p>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span>⏱️ {course.estimatedDuration} minutes</span>
            <span>•</span>
            <span>📚 {course.content.length} content items</span>
          </div>
        </div>
        
        <div className="space-y-4">
          {course.content.map((content, i) => (
            <div key={content.id} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-medium text-sm">
                    {i + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-slate-900">{content.title}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        content.type === 'video' ? 'bg-blue-100 text-blue-700' :
                        content.type === 'reading' ? 'bg-green-100 text-green-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {content.type === 'video' ? '📹 Video' : 
                         content.type === 'reading' ? '📖 Reading' : '📝 Quiz'}
                      </span>
                      {content.required && (
                        <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-700">
                          Required
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white text-sm font-medium shadow hover:bg-blue-500 transition-colors">
                  {content.type === 'video' ? 'Watch' : content.type === 'reading' ? 'Read' : 'Take Quiz'}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              {content.videoUrl && (
                <div className="mb-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 text-sm text-blue-700">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>Video URL: {content.videoUrl}</span>
                  </div>
                </div>
              )}
              
              <p className="text-slate-600 leading-relaxed">{content.content}</p>
            </div>
          ))}
        </div>
      </div>
      
      <aside className="space-y-4">
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h4 className="font-semibold text-slate-900 mb-3">Your Progress</h4>
          <div className="mb-3">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-slate-600">Completion</span>
              <span className="text-slate-900 font-medium">0 of {course.content.length}</span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-200">
              <div className="h-2 w-0 rounded-full bg-blue-600" />
            </div>
          </div>
          <p className="text-sm text-slate-600">Complete all required content to finish this course.</p>
        </div>
        
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h4 className="font-semibold text-slate-900 mb-3">Course Contents</h4>
          <div className="space-y-2">
            {course.content.map((content, i) => (
              <div key={content.id} className="flex items-center gap-3 text-sm">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-600 font-medium text-xs">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="text-slate-900">{content.title}</div>
                  <div className="text-xs text-slate-500">
                    {content.type === 'video' ? '📹 Video' : 
                     content.type === 'reading' ? '📖 Reading' : '📝 Quiz'}
                    {content.required && ' • Required'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h4 className="font-semibold text-slate-900 mb-3">Course Info</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Duration:</span>
              <span className="text-slate-900">{course.estimatedDuration} minutes</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Content Items:</span>
              <span className="text-slate-900">{course.content.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Required Items:</span>
              <span className="text-slate-900">{course.content.filter(c => c.required).length}</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/login" element={<div className="p-6">Login form…</div>} />
        <Route path="/auth/register" element={<div className="p-6">Register form…</div>} />
        <Route path="/admin/login" element={<Admin />} />
        <Route path="/app/*" element={<AppShell />} />
      </Routes>
    </BrowserRouter>
  )
}