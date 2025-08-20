export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-white bg-opacity-10 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-white bg-opacity-10 blur-3xl animate-pulse [animation-delay:1s]"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full bg-yellow-300 bg-opacity-5 blur-2xl animate-pulse [animation-delay:2s]"></div>
      </div>

      {/* Main Loading Content */}
      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        {/* Logo */}
        <div className="mb-8 animate-bounce">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg mb-2">
            🚀 <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">DevHub</span>
          </h1>
        </div>

        {/* Main Loading Animation */}
        <div className="relative mb-8">
          {/* Outer Ring */}
          <div className="w-24 h-24 mx-auto relative">
            <div className="absolute inset-0 rounded-full border-4 border-white/20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-white border-r-white/50 border-b-white/20 border-l-white/20 animate-spin"></div>
            
            {/* Inner Ring */}
            <div className="absolute inset-2 rounded-full border-2 border-yellow-300/30"></div>
            <div className="absolute inset-2 rounded-full border-2 border-t-yellow-300 border-r-yellow-300/50 border-b-yellow-300/20 border-l-yellow-300/20 animate-spin [animation-direction:reverse] [animation-duration:1.5s]"></div>
            
            {/* Center Dot */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Orbiting Elements */}
          <div className="absolute inset-0 animate-spin [animation-duration:3s]">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
            </div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
              <div className="w-2 h-2 bg-orange-300 rounded-full"></div>
            </div>
            <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-2 h-2 bg-pink-300 rounded-full"></div>
            </div>
            <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2">
              <div className="w-2 h-2 bg-purple-300 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-3 mb-8">
          <h2 className="text-2xl font-semibold text-white">
            Loading GitHub Profile
          </h2>
          <p className="text-blue-200">
            Fetching user data and repositories...
          </p>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center space-x-2 mb-8">
          <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce [animation-delay:0.2s]"></div>
          <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce [animation-delay:0.4s]"></div>
          <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce [animation-delay:0.6s]"></div>
          <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce [animation-delay:0.8s]"></div>
        </div>

        {/* Loading Steps */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
          <div className="space-y-4 text-left">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <span className="text-white/90 text-sm">Connecting to GitHub API</span>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              </div>
              <span className="text-white/70 text-sm">Fetching user profile</span>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="w-6 h-6 border-2 border-white/20 rounded-full"></div>
              </div>
              <span className="text-white/50 text-sm">Loading repositories</span>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="w-6 h-6 border-2 border-white/20 rounded-full"></div>
              </div>
              <span className="text-white/50 text-sm">Analyzing languages</span>
            </div>
          </div>
        </div>

        {/* Fun Loading Messages */}
        <div className="mt-6">
          <div className="text-blue-200 text-sm">
            <div className="inline-block animate-pulse">
              Exploring the code universe...
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
