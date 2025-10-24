'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Github, Search, ArrowRight, Code2, Star, Users, TrendingUp, GitBranch, Zap } from 'lucide-react'

export default function Home() {
  const [username, setUsername] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const router = useRouter()

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
    <div className="min-h-screen bg-white">
      {/* Minimal Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-black rounded-md flex items-center justify-center">
                <Github className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-medium text-gray-900">DevHub</span>
            </div>
            <div className="hidden md:flex items-center gap-10">
              <a href="#features" className="text-[15px] text-gray-600 hover:text-gray-900 transition-colors">Features</a>
              <a href="#explore" className="text-[15px] text-gray-600 hover:text-gray-900 transition-colors">Explore</a>
              <button className="px-5 py-2 text-[15px] text-white bg-black rounded-md hover:bg-gray-800 transition-all">
                Start Free
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Split Screen Style */}
      <section className="min-h-screen flex items-center pt-20">
        <div className="w-full max-w-[1400px] mx-auto px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content - Ultra Minimal */}
            <div className="max-w-xl">
              <div className="mb-8">
                <h1 className="text-[64px] lg:text-[72px] font-bold text-gray-900 leading-[1.1] mb-6">
                  Explore
                  <br />
                  <span className="text-gray-400">GitHub</span>
                  <br />
                  Profiles
                </h1>
                <p className="text-[19px] text-gray-500 leading-relaxed">
                  Discover developer journeys, analyze repositories, and explore coding patterns across the GitHub ecosystem.
                </p>
              </div>

              {/* Minimal Search */}
              <form onSubmit={handleSubmit} className="mb-8">
                <div className="relative group">
                  <div className="flex items-stretch border-2 border-gray-900 rounded-xl overflow-hidden transition-all hover:shadow-lg">
                    <div className="flex items-center px-5 bg-white">
                      <Search className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Enter username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      disabled={isLoading}
                      className="flex-1 px-5 py-5 text-[17px] bg-white text-gray-900 placeholder-gray-400 focus:outline-none disabled:opacity-50"
                    />
                    <button
                      type="submit"
                      disabled={isLoading || !username.trim()}
                      className="px-8 bg-gray-900 text-white font-medium hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <>
                          Search
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>

              {/* Recent Searches - Ultra Minimal */}
              {recentSearches.length > 0 && !isLoading && (
                <div className="flex items-center gap-3 flex-wrap text-[15px]">
                  <span className="text-gray-400">Recent:</span>
                  {recentSearches.slice(0, 4).map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleRecentSearch(search)}
                      className="text-gray-600 hover:text-gray-900 underline underline-offset-4 transition-colors"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              )}

              {/* Minimal Stats */}
              <div className="mt-16 flex items-center gap-12">
                <div>
                  <div className="text-3xl font-bold text-gray-900">100M+</div>
                  <div className="text-[15px] text-gray-500 mt-1">Users</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">420M+</div>
                  <div className="text-[15px] text-gray-500 mt-1">Repos</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">Free</div>
                  <div className="text-[15px] text-gray-500 mt-1">Forever</div>
                </div>
              </div>
            </div>

            {/* Right - Minimal Visual */}
            <div className="relative hidden lg:block h-[600px]">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Large Centered Card */}
                <div className="relative w-full max-w-md">
                  <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200">
                    {/* Profile Header */}
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl"></div>
                      <div className="flex-1 pt-1">
                        <div className="h-4 w-32 bg-gray-300 rounded mb-2"></div>
                        <div className="h-3 w-24 bg-gray-200 rounded"></div>
                      </div>
                    </div>

                    {/* Stats Row */}
                    <div className="flex gap-6 mb-6">
                      <div>
                        <div className="text-xl font-bold text-gray-900 mb-1">2.4k</div>
                        <div className="text-sm text-gray-500">Repos</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold text-gray-900 mb-1">45k</div>
                        <div className="text-sm text-gray-500">Followers</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold text-gray-900 mb-1">128</div>
                        <div className="text-sm text-gray-500">Following</div>
                      </div>
                    </div>

                    {/* Repo Cards */}
                    <div className="space-y-3">
                      <div className="bg-white rounded-xl p-4 border border-gray-200">
                        <div className="flex items-start justify-between mb-2">
                          <div className="h-3 w-28 bg-gray-900 rounded"></div>
                          <Star className="w-4 h-4 text-gray-400" />
                        </div>
                        <div className="h-2 w-full bg-gray-100 rounded mb-2"></div>
                        <div className="h-2 w-3/4 bg-gray-100 rounded"></div>
                      </div>

                      <div className="bg-white rounded-xl p-4 border border-gray-200">
                        <div className="flex items-start justify-between mb-2">
                          <div className="h-3 w-32 bg-gray-900 rounded"></div>
                          <Star className="w-4 h-4 text-gray-400" />
                        </div>
                        <div className="h-2 w-full bg-gray-100 rounded mb-2"></div>
                        <div className="h-2 w-2/3 bg-gray-100 rounded"></div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Language Badge */}
                  <div className="absolute -right-8 top-20 bg-white rounded-xl px-4 py-3 shadow-lg border border-gray-200">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm font-medium">TypeScript</span>
                      <span className="text-sm text-gray-400">42%</span>
                    </div>
                  </div>

                  {/* Floating Star Badge */}
                  <div className="absolute -left-8 bottom-32 bg-white rounded-xl px-4 py-3 shadow-lg border border-gray-200">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-medium">1.2k stars</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features - Minimal Grid */}
      <section className="py-32 bg-gray-50" id="features">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
          <div className="max-w-2xl mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Everything you need
            </h2>
            <p className="text-[19px] text-gray-500">
              Comprehensive tools to analyze and explore GitHub profiles
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              {
                icon: <Users className="w-6 h-6" />,
                title: 'Profile Analysis',
                description: 'Complete developer profiles with activity, contributions, and bio information'
              },
              {
                icon: <Code2 className="w-6 h-6" />,
                title: 'Repository Explorer',
                description: 'Browse all repositories with detailed stats and language breakdowns'
              },
              {
                icon: <TrendingUp className="w-6 h-6" />,
                title: 'Language Stats',
                description: 'Visual analytics of programming languages and technology usage'
              },
              {
                icon: <Star className="w-6 h-6" />,
                title: 'Top Projects',
                description: 'Most starred repositories and trending projects at a glance'
              },
              {
                icon: <GitBranch className="w-6 h-6" />,
                title: 'Contribution History',
                description: 'Track coding activity patterns and contribution graphs'
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: 'Instant Search',
                description: 'Lightning-fast profile lookup with real-time data fetching'
              }
            ].map((feature, index) => (
              <div key={index} className="group">
                <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-[17px] text-gray-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Section - Clean */}
      <section className="py-32 bg-white" id="explore">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Try these profiles
            </h2>
            <p className="text-[19px] text-gray-500 mb-12">
              Explore popular developers to see DevHub in action
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              {['torvalds', 'gaearon', 'sindresorhus', 'tj', 'addyosmani', 'kentcdodds', 'wesbos', 'mjackson'].map((example) => (
                <button
                  key={example}
                  onClick={() => handleRecentSearch(example)}
                  className="px-6 py-3 text-[15px] text-gray-600 bg-white border-2 border-gray-200 rounded-xl hover:border-gray-900 hover:text-gray-900 transition-all"
                >
                  @{example}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section - Minimal */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
          <div className="max-w-2xl mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              How it works
            </h2>
            <p className="text-[19px] text-gray-500">
              Three simple steps to explore any GitHub profile
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-16">
            {[
              {
                number: '01',
                title: 'Enter username',
                description: 'Type any GitHub username into the search field'
              },
              {
                number: '02',
                title: 'Instant fetch',
                description: 'Real-time data retrieval and profile analysis'
              },
              {
                number: '03',
                title: 'Explore data',
                description: 'View repositories, stats, and contribution history'
              }
            ].map((step, index) => (
              <div key={index}>
                <div className="text-6xl font-bold text-gray-200 mb-6">
                  {step.number}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-[17px] text-gray-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Minimal Black */}
      <section className="py-32 bg-gray-900">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12 text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Start exploring today
          </h2>
          <p className="text-[19px] text-gray-400 mb-10 max-w-2xl mx-auto">
            Discover GitHub profiles, analyze repositories, and explore developer journeys—completely free
          </p>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="inline-flex items-center gap-3 px-8 py-4 text-[17px] bg-white text-gray-900 font-medium rounded-xl hover:shadow-2xl transform hover:scale-105 transition-all"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Footer - Ultra Minimal */}
      <footer className="py-12 bg-white border-t border-gray-200">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-black rounded-md flex items-center justify-center">
                <Github className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-medium text-gray-900">DevHub</span>
            </div>
            <p className="text-[15px] text-gray-500">
              © 2025 DevHub. Built with Next.js & Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
