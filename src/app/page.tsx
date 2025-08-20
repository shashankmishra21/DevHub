'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [username, setUsername] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const router = useRouter()

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('devhub-recent-searches')
    if (saved) {
      setRecentSearches(JSON.parse(saved))
    }
  }, [])

  const saveToRecentSearches = (searchUsername: string) => {
    const updated = [searchUsername, ...recentSearches.filter(u => u !== searchUsername)].slice(0, 5)
    setRecentSearches(updated)
    localStorage.setItem('devhub-recent-searches', JSON.stringify(updated))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (username.trim() !== '') {
      setIsLoading(true)
      saveToRecentSearches(username.trim())
      
      // Add slight delay for better UX
      setTimeout(() => {
        router.push(`/profile/${username.trim()}`)
      }, 500)
    }
  }

  const handleRecentSearch = (searchUsername: string) => {
    setUsername(searchUsername)
    setIsLoading(true)
    setTimeout(() => {
      router.push(`/profile/${searchUsername}`)
    }, 300)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-white bg-opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-white bg-opacity-10 blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-6xl font-bold mb-4 text-white drop-shadow-lg">
            🚀 <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">DevHub</span>
          </h1>
          <p className="text-xl text-blue-100 mb-2">
            Discover GitHub profiles and repositories
          </p>
          <p className="text-sm text-blue-200">
            Search for any GitHub user to explore their coding journey
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="text"
              placeholder="Enter GitHub username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
              className="flex-1 px-6 py-4 text-lg rounded-full 
                        bg-white/20 backdrop-blur-md
                        border-2 border-white/30 
                        text-white placeholder-white/70
                        focus:outline-none focus:ring-4 focus:ring-white/40 focus:border-white/60
                        hover:bg-white/25 hover:border-white/40
                        transition-all duration-300 
                        disabled:opacity-50 disabled:cursor-not-allowed
                        shadow-lg"
            />
            <button
              type="submit"
              disabled={isLoading || !username.trim()}
              className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold text-lg rounded-full hover:from-yellow-500 hover:to-orange-600 transform hover:scale-105 transition-all shadow-xl disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Searching...
                </span>
              ) : (
                'Search'
              )}
            </button>
          </div>
        </form>

        {/* Recent Searches */}
        {recentSearches.length > 0 && !isLoading && (
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 max-w-md mx-auto border border-white/20 shadow-xl">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <span>🕒</span>
              Recent Searches
            </h3>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleRecentSearch(search)}
                  className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full 
                           hover:bg-white/30 hover:scale-105 
                           border border-white/20 hover:border-white/40
                           transition-all duration-200 shadow-md"
                >
                  {search}
                </button>
              ))}
            </div>
            <button
              onClick={() => {
                setRecentSearches([])
                localStorage.removeItem('devhub-recent-searches')
              }}
              className="text-white/70 hover:text-white text-xs mt-3 underline"
            >
              Clear history
            </button>
          </div>
        )}

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
          {[
            { icon: '👤', title: 'Profile Info', desc: 'View detailed GitHub profiles' },
            { icon: '📊', title: 'Repository Analysis', desc: 'Explore projects and languages' },
            { icon: '🔗', title: 'Direct Access', desc: 'Quick links to GitHub repos' }
          ].map((feature, index) => (
            <div key={index} className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-blue-100">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Popular Examples */}
        <div className="mt-8">
          <p className="text-blue-200 text-sm mb-3">Try these popular profiles:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {['octocat', 'torvalds', 'gaearon', 'sindresorhus', 'addyosmani'].map((example) => (
              <button
                key={example}
                onClick={() => handleRecentSearch(example)}
                className="px-3 py-1 text-sm bg-white/10 backdrop-blur-sm text-white/90 rounded-lg 
                         hover:bg-white/20 hover:text-white transition-all border border-white/20"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
