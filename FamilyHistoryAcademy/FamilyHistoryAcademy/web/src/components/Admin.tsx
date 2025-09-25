import { useState } from 'react';
import { Link } from 'react-router-dom';

// Role definitions
type UserRole = 'student' | 'admin' | 'super_admin';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

// Course and Badge definitions
interface CourseContent {
  id: string;
  type: 'video' | 'reading' | 'question' | 'quiz';
  title: string;
  content: string;
  videoUrl?: string;
  questions?: {
    question: string;
    options: string[];
    correctAnswer: number;
  }[];
  required: boolean;
}

interface Course {
  id: string;
  title: string;
  description: string;
  content: CourseContent[];
  createdBy: string;
  createdAt: string;
  status: 'draft' | 'published';
  estimatedDuration: number; // in minutes
}

interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  courseIds: string[];
  createdBy: string;
  createdAt: string;
  status: 'draft' | 'published';
  studentsEarned: number;
}

// Simulate current user - in real app this would come from auth context
const currentUser: AdminUser = {
  id: '1',
  name: 'Super Admin User',
  email: 'superadmin@example.com',
  role: 'super_admin' // Change this to 'admin' or 'student' to test different permission levels
};

// Permission helper functions
const canManageAdmins = (role: UserRole) => role === 'super_admin';
const canManageContent = (role: UserRole) => role === 'super_admin' || role === 'admin';
const canViewStudentData = (role: UserRole) => role === 'super_admin' || role === 'admin';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('users');
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [showBadgeForm, setShowBadgeForm] = useState(false);
  const [notifications] = useState([
    { id: '1', message: 'John Smith completed "Intermediate User Badge"', time: '2 hours ago', type: 'badge_completed' },
    { id: '2', message: 'New course "Advanced Research" was published', time: '1 day ago', type: 'course_published' }
  ]);

  // Course form state
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseDuration, setCourseDuration] = useState('');
  const [courseContent, setCourseContent] = useState<CourseContent[]>([]);
  const [showContentTypeSelector, setShowContentTypeSelector] = useState(false);

  // Helper functions for course content management
  const addContentItem = (type: 'video' | 'reading' | 'quiz') => {
    const newContent: CourseContent = {
      id: Date.now().toString(),
      type,
      title: '',
      content: '',
      required: true,
      ...(type === 'video' && { videoUrl: '' }),
      ...(type === 'quiz' && { questions: [] })
    };
    setCourseContent([...courseContent, newContent]);
    setShowContentTypeSelector(false);
  };

  const updateContentItem = (id: string, updates: Partial<CourseContent>) => {
    setCourseContent(courseContent.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const removeContentItem = (id: string) => {
    setCourseContent(courseContent.filter(item => item.id !== id));
  };

  const resetCourseForm = () => {
    setCourseTitle('');
    setCourseDescription('');
    setCourseDuration('');
    setCourseContent([]);
    setShowCourseForm(false);
    setShowContentTypeSelector(false);
  };
  
  // Sample courses data
  const [courses, setCourses] = useState<Course[]>([
    {
      id: '1',
      title: 'FamilySearch Memories',
      description: 'Learn to upload and manage family photos and stories',
      content: [
        { id: '1', type: 'video', title: 'Introduction to Memories', content: 'Overview video', videoUrl: 'https://example.com/video1', required: true },
        { id: '2', type: 'reading', title: 'Best Practices', content: 'How to organize your memories effectively...', required: true },
        { id: '3', type: 'quiz', title: 'Knowledge Check', content: 'Test your understanding', questions: [{ question: 'What file formats are supported?', options: ['JPG', 'PNG', 'Both'], correctAnswer: 2 }], required: true }
      ],
      createdBy: currentUser.id,
      createdAt: '2024-01-15',
      status: 'published',
      estimatedDuration: 30
    },
    {
      id: '2',
      title: 'SourceLinker Basics',
      description: 'Master the art of linking historical sources to people',
      content: [
        { id: '4', type: 'video', title: 'SourceLinker Overview', content: 'Introduction to SourceLinker', videoUrl: 'https://example.com/video2', required: true },
        { id: '5', type: 'reading', title: 'Source Evaluation', content: 'How to evaluate source quality...', required: true }
      ],
      createdBy: currentUser.id,
      createdAt: '2024-01-10',
      status: 'published',
      estimatedDuration: 45
    },
    {
      id: '3',
      title: 'Reverse Indexing Techniques',
      description: 'Advanced research methods using reverse indexing',
      content: [
        { id: '6', type: 'video', title: 'Understanding Indexes', content: 'What are indexes and how to use them', videoUrl: 'https://example.com/video3', required: true }
      ],
      createdBy: currentUser.id,
      createdAt: '2024-01-05',
      status: 'draft',
      estimatedDuration: 60
    }
  ]);
  
  // Sample badges data
  const [badges, setBadges] = useState<Badge[]>([
    {
      id: '1',
      title: 'Intermediate User Badge',
      description: 'Master core FamilySearch features',
      icon: '🏆',
      color: 'from-blue-500 to-blue-600',
      courseIds: ['1', '2'],
      createdBy: currentUser.id,
      createdAt: '2024-01-20',
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
      createdBy: currentUser.id,
      createdAt: '2024-01-18',
      status: 'draft',
      studentsEarned: 0
    }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Family History Academy</h1>
                  <p className="text-xs text-white/70">Admin Dashboard</p>
                </div>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <button className="p-2 text-white/80 hover:text-white transition-colors duration-200">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-3-3V9a6 6 0 10-12 0v5l-3 3h13z M19 17v1a2 2 0 01-2 2H7a2 2 0 01-2-2v-1" />
                  </svg>
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {notifications.length}
                    </span>
                  )}
                </button>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentUser.role === 'super_admin' 
                    ? 'bg-gradient-to-r from-purple-500 to-purple-600' 
                    : currentUser.role === 'admin'
                    ? 'bg-gradient-to-r from-red-500 to-red-600'
                    : 'bg-gradient-to-r from-blue-500 to-blue-600'
                }`}>
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="text-left">
                  <span className="text-white font-medium block">{currentUser.name}</span>
                  <span className={`text-xs font-medium ${
                    currentUser.role === 'super_admin' 
                      ? 'text-purple-300' 
                      : currentUser.role === 'admin'
                      ? 'text-red-300'
                      : 'text-blue-300'
                  }`}>
                    {currentUser.role === 'super_admin' ? 'Super Admin' : 
                     currentUser.role === 'admin' ? 'Admin' : 'Student'}
                  </span>
                </div>
              </div>
              <Link 
                to="/" 
                className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all duration-200"
              >
                Back to Site
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-white/80 text-lg">Manage users, courses, and badges for Family History Academy</p>
        </div>

        {/* Tab Navigation - Only show tabs based on permissions */}
        {canViewStudentData(currentUser.role) && (
          <div className="mb-8">
            <div className="flex space-x-1 bg-white/10 backdrop-blur-sm rounded-xl p-1">
              {canViewStudentData(currentUser.role) && (
                <button
                  onClick={() => setActiveTab('users')}
                  className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === 'users'
                      ? 'bg-white text-slate-900 shadow-lg'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                  User Management
                </button>
              )}
              {canManageContent(currentUser.role) && (
                <button
                  onClick={() => setActiveTab('courses')}
                  className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === 'courses'
                      ? 'bg-white text-slate-900 shadow-lg'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Course Management
                </button>
              )}
              {canManageContent(currentUser.role) && (
                <button
                  onClick={() => setActiveTab('badges')}
                  className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === 'badges'
                      ? 'bg-white text-slate-900 shadow-lg'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  Badge Management
                </button>
              )}
            </div>
          </div>
        )}

        {/* Tab Content */}
        {canViewStudentData(currentUser.role) ? (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            {activeTab === 'users' && canViewStudentData(currentUser.role) && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white">User Management</h2>
                    <p className="text-white/70 text-sm mt-1">
                      {canManageAdmins(currentUser.role) 
                        ? 'Manage all users and admin permissions' 
                        : 'View users and student data (admin promotion restricted)'}
                    </p>
                  </div>
                  {canManageAdmins(currentUser.role) && (
                    <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium rounded-xl hover:from-blue-700 hover:to-blue-600 transition-all duration-200 shadow-lg">
                      <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Add Admin User
                    </button>
                  )}
                </div>
              
              <div className="space-y-4">
                {/* Search Bar */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="w-full px-4 py-3 pl-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <svg className="w-5 h-5 text-white/60 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                {/* User List */}
                <div className="bg-white/5 rounded-xl border border-white/10">
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm font-medium text-white/80 mb-4">
                      <div>User</div>
                      <div>Email</div>
                      <div>Role</div>
                      <div>Actions</div>
                    </div>
                    
                    {/* Sample Users */}
                    {[
                      { id: '1', name: 'John Smith', email: 'john@example.com', role: 'student' as UserRole },
                      { id: '2', name: 'Jane Doe', email: 'jane@example.com', role: 'admin' as UserRole },
                      { id: '3', name: 'Mike Johnson', email: 'mike@example.com', role: 'student' as UserRole },
                      { id: '4', name: 'Sarah Wilson', email: 'sarah@example.com', role: 'super_admin' as UserRole },
                      { id: '5', name: 'Tom Brown', email: 'tom@example.com', role: 'admin' as UserRole }
                    ].map((user, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 py-3 border-t border-white/10 first:border-t-0 items-center">
                        <div className="text-white font-medium">{user.name}</div>
                        <div className="text-white/80">{user.email}</div>
                        <div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            user.role === 'super_admin' 
                              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                              : user.role === 'admin' 
                              ? 'bg-red-500/20 text-red-300 border border-red-500/30' 
                              : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                          }`}>
                            {user.role === 'super_admin' ? 'Super Admin' : 
                             user.role === 'admin' ? 'Admin' : 'Student'}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          {canManageAdmins(currentUser.role) ? (
                            <>
                              {user.role === 'student' && (
                                <select className="px-2 py-1 bg-slate-700 text-white text-xs rounded border border-white/20">
                                  <option value="">Promote to...</option>
                                  <option value="admin">Admin</option>
                                  <option value="super_admin">Super Admin</option>
                                </select>
                              )}
                              {user.role !== 'student' && user.id !== currentUser.id && (
                                <button className="px-3 py-1 bg-orange-600 hover:bg-orange-700 text-white text-xs rounded-lg transition-colors duration-200">
                                  Demote
                                </button>
                              )}
                              {user.id !== currentUser.id && (
                                <button className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded-lg transition-colors duration-200">
                                  Remove
                                </button>
                              )}
                              {user.id === currentUser.id && (
                                <span className="px-3 py-1 bg-white/10 text-white/60 text-xs rounded-lg">
                                  You
                                </span>
                              )}
                            </>
                          ) : (
                            <span className="px-3 py-1 bg-white/10 text-white/60 text-xs rounded-lg">
                              View Only
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'courses' && canManageContent(currentUser.role) && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">Course Management</h2>
                  <p className="text-white/70 text-sm mt-1">Create courses with videos, readings, questions, and quizzes</p>
                </div>
                <button 
                  onClick={() => setShowCourseForm(true)}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-medium rounded-xl hover:from-emerald-700 hover:to-emerald-600 transition-all duration-200 shadow-lg"
                >
                  <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Create New Course
                </button>
              </div>
              
              {showCourseForm && (
                <div className="mb-8 bg-white/5 rounded-xl border border-white/10 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-white">Create New Course</h3>
                    <button 
                      onClick={resetCourseForm}
                      className="text-white/60 hover:text-white"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Course Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input 
                      type="text" 
                      placeholder="Course Title" 
                      value={courseTitle}
                      onChange={(e) => setCourseTitle(e.target.value)}
                      className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <input 
                      type="number" 
                      placeholder="Duration (minutes)" 
                      value={courseDuration}
                      onChange={(e) => setCourseDuration(e.target.value)}
                      className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <textarea 
                    placeholder="Course Description" 
                    rows={3}
                    value={courseDescription}
                    onChange={(e) => setCourseDescription(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-6"
                  />
                  
                  {/* Course Content Builder */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-white font-medium">Course Content</h4>
                      <button 
                        onClick={() => setShowContentTypeSelector(!showContentTypeSelector)}
                        className="flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm rounded-lg transition-colors duration-200"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add Content
                      </button>
                    </div>
                    
                    {/* Content Type Selector */}
                    {showContentTypeSelector && (
                      <div className="mb-4 p-4 bg-white/5 rounded-xl border border-white/10">
                        <p className="text-white/80 text-sm mb-3">Choose content type to add:</p>
                        <div className="flex flex-wrap gap-3">
                          <button
                            onClick={() => addContentItem('video')}
                            className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors duration-200"
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            📹 Video
                          </button>
                          <button
                            onClick={() => addContentItem('reading')}
                            className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors duration-200"
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            📖 Text/Reading
                          </button>
                          <button
                            onClick={() => addContentItem('quiz')}
                            className="flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg transition-colors duration-200"
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            📝 Quiz
                          </button>
                        </div>
                      </div>
                    )}
                    
                    {/* Content Items */}
                    <div className="space-y-4">
                      {courseContent.map((item, index) => (
                        <div key={item.id} className="bg-white/5 rounded-xl border border-white/10 p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <span className="text-white/60 text-sm">#{index + 1}</span>
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                item.type === 'video' ? 'bg-blue-500/20 text-blue-300' :
                                item.type === 'reading' ? 'bg-green-500/20 text-green-300' :
                                'bg-purple-500/20 text-purple-300'
                              }`}>
                                {item.type === 'video' ? '📹 Video' : 
                                 item.type === 'reading' ? '📖 Reading' : '📝 Quiz'}
                              </span>
                            </div>
                            <button
                              onClick={() => removeContentItem(item.id)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                          
                          <input
                            type="text"
                            placeholder="Content Title"
                            value={item.title}
                            onChange={(e) => updateContentItem(item.id, { title: e.target.value })}
                            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-3"
                          />
                          
                          {item.type === 'video' && (
                            <input
                              type="url"
                              placeholder="Video URL"
                              value={item.videoUrl || ''}
                              onChange={(e) => updateContentItem(item.id, { videoUrl: e.target.value })}
                              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-3"
                            />
                          )}
                          
                          <textarea
                            placeholder={
                              item.type === 'video' ? 'Video description...' :
                              item.type === 'reading' ? 'Reading content...' :
                              'Quiz instructions...'
                            }
                            rows={3}
                            value={item.content}
                            onChange={(e) => updateContentItem(item.id, { content: e.target.value })}
                            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-3"
                          />
                          
                          {item.type === 'quiz' && (
                            <div className="mt-3 p-3 bg-white/5 rounded-lg border border-white/10">
                              <p className="text-white/80 text-sm mb-2">Quiz Questions (coming soon)</p>
                              <button className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-xs rounded">
                                Add Question
                              </button>
                            </div>
                          )}
                          
                          <div className="flex items-center mt-3">
                            <label className="flex items-center text-white/80 text-sm">
                              <input
                                type="checkbox"
                                checked={item.required}
                                onChange={(e) => updateContentItem(item.id, { required: e.target.checked })}
                                className="mr-2 rounded"
                              />
                              Required to complete course
                            </label>
                          </div>
                        </div>
                      ))}
                      
                      {courseContent.length === 0 && (
                        <div className="text-center py-8 text-white/60">
                          <svg className="w-12 h-12 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          <p>No content added yet. Click "Add Content" to get started.</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button 
                      disabled={!courseTitle || !courseDescription || courseContent.length === 0}
                      className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors duration-200"
                    >
                      Create Course
                    </button>
                    <button 
                      onClick={resetCourseForm}
                      className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-colors duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <div key={course.id} className="bg-white/5 rounded-xl border border-white/10 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-bold text-white">{course.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        course.status === 'published' 
                          ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                          : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                      }`}>
                        {course.status === 'published' ? 'Published' : 'Draft'}
                      </span>
                    </div>
                    <p className="text-white/70 text-sm mb-4">{course.description}</p>
                    <div className="space-y-2 mb-4 text-white/80">
                      <div className="flex items-center text-sm">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {course.estimatedDuration} minutes
                      </div>
                      <div className="flex items-center text-sm">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        {course.content.length} content items
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors duration-200">
                        Edit
                      </button>
                      <button className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors duration-200">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'badges' && canManageContent(currentUser.role) && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">Badge Management</h2>
                  <p className="text-white/70 text-sm mt-1">Create badges by bundling courses together</p>
                </div>
                <button 
                  onClick={() => setShowBadgeForm(true)}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-medium rounded-xl hover:from-purple-700 hover:to-purple-600 transition-all duration-200 shadow-lg"
                >
                  <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Create New Badge
                </button>
              </div>
              
              {showBadgeForm && (
                <div className="mb-8 bg-white/5 rounded-xl border border-white/10 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white">Create New Badge</h3>
                    <button 
                      onClick={() => setShowBadgeForm(false)}
                      className="text-white/60 hover:text-white"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input 
                      type="text" 
                      placeholder="Badge Title" 
                      className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <div className="flex space-x-2">
                      <input 
                        type="text" 
                        placeholder="Badge Icon (emoji)" 
                        className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 w-24"
                      />
                      <select className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                        <option value="from-blue-500 to-blue-600">Blue</option>
                        <option value="from-emerald-500 to-emerald-600">Green</option>
                        <option value="from-purple-500 to-purple-600">Purple</option>
                        <option value="from-orange-500 to-orange-600">Orange</option>
                        <option value="from-red-500 to-red-600">Red</option>
                      </select>
                    </div>
                  </div>
                  
                  <textarea 
                    placeholder="Badge Description" 
                    rows={3}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-6"
                  />
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Available Courses */}
                    <div>
                      <h4 className="text-white font-medium mb-3 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        Available Courses
                      </h4>
                      <div className="space-y-2 bg-white/5 rounded-xl p-4 border border-white/10 min-h-[200px]">
                        {courses.filter(course => course.status === 'published').map((course) => (
                          <div 
                            key={course.id}
                            className="p-3 bg-white/10 rounded-lg border border-white/20 cursor-move hover:bg-white/20 transition-colors duration-200"
                            draggable
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <h5 className="text-white font-medium text-sm">{course.title}</h5>
                                <p className="text-white/60 text-xs">{course.estimatedDuration} min</p>
                              </div>
                              <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                              </svg>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Badge Courses */}
                    <div>
                      <h4 className="text-white font-medium mb-3 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                        Badge Courses <span className="text-white/60 text-sm ml-2">(Drag courses here)</span>
                      </h4>
                      <div className="bg-white/5 rounded-xl p-4 border-2 border-dashed border-white/20 min-h-[200px] flex items-center justify-center">
                        <div className="text-center text-white/60">
                          <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          <p className="text-sm">Drag courses here to add them to this badge</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl transition-colors duration-200">
                      Create Badge
                    </button>
                    <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl transition-colors duration-200">
                      Create & Publish
                    </button>
                    <button 
                      onClick={() => setShowBadgeForm(false)}
                      className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-colors duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {badges.map((badge) => (
                  <div key={badge.id} className="bg-white/5 rounded-xl border border-white/10 p-6 text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${badge.color} flex items-center justify-center text-2xl`}>
                      {badge.icon}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{badge.title}</h3>
                    <p className="text-white/70 text-sm mb-4">{badge.description}</p>
                    
                    <div className="mb-4">
                      <div className="text-white/80 text-sm mb-2">
                        <span className="font-medium">{badge.courseIds.length}</span> courses required
                      </div>
                      <div className="text-white/80 text-sm mb-2">
                        <span className="font-medium">{badge.studentsEarned}</span> students earned
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        badge.status === 'published' 
                          ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                          : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                      }`}>
                        {badge.status === 'published' ? 'Published' : 'Draft'}
                      </span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors duration-200">
                        Edit
                      </button>
                      {badge.status === 'draft' && (
                        <button className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors duration-200">
                          Publish
                        </button>
                      )}
                      <button className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors duration-200">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          </div>
        ) : (
          // Access denied for students
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.732 15.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Access Restricted</h2>
            <p className="text-white/80 mb-6">
              You don't have permission to access the admin dashboard. This area is restricted to administrators only.
            </p>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h3 className="text-white font-medium mb-2">Access Levels:</h3>
              <div className="space-y-2 text-sm text-white/70">
                <div className="flex items-center justify-between">
                  <span>👑 Super Admin:</span>
                  <span>Full access + user management</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>🛡️ Admin:</span>
                  <span>Course & badge management</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>🎓 Student:</span>
                  <span>Course access only</span>
                </div>
              </div>
            </div>
            <Link 
              to="/" 
              className="inline-flex items-center px-6 py-3 mt-6 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium rounded-xl hover:from-blue-700 hover:to-blue-600 transition-all duration-200 shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Return to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
