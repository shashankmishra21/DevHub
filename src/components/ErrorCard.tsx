'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function ErrorCard({ username }: { username: string }) {
  const router = useRouter()
  const [isGoingBack, setIsGoingBack] = useState(false)

  const handleGoBack = () => {
    setIsGoingBack(true)
    setTimeout(() => {
      router.push('/')
    }, 300)
  }

  const popularExamples = ['octocat', 'torvalds', 'gaearon', 'sindresorhus', 'addyosmani']

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-white bg-opacity-5 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-white bg-opacity-5 blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-red-400 bg-opacity-5 blur-2xl"></div>
      </div>

      {/* Error Content */}
      <div className="relative z-10 text-center max-w-lg mx-auto">
        {/* DevHub Logo */}
        <div className="mb-8">
          <a 
            href="/" 
            className="inline-flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
          >
            <span className="text-2xl">🚀</span>
            <span className="text-xl font-bold">DevHub</span>
          </a>
        </div>

        {/* Animated Error Icon */}
        <div className="mb-8">
          <div className="relative">
            <div className="w-32 h-32 mx-auto bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-6 border border-white/20 shadow-xl">
              <div className="animate-bounce">
                <span className="text-6xl">🔍</span>
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg animate-pulse">
              <span className="text-white text-xl">❌</span>
            </div>
          </div>
        </div>

        {/* Error Message Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-8 mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">
            User Not Found
          </h1>
          
          <div className="bg-red-500/20 backdrop-blur-sm rounded-xl p-4 mb-6 border border-red-400/30">
            <p className="text-red-200 font-mono text-lg break-all">
              "{username}"
            </p>
          </div>
          
          <p className="text-white/90 mb-6 leading-relaxed">
            We couldn't find a GitHub profile with this username. The user might not exist or their profile could be private.
          </p>
          
          {/* Enhanced Suggestions */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">💡</span>
              <h3 className="font-semibold text-white text-lg">Quick Tips</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-400 rounded-full flex-shrink-0"></span>
                <span>Check spelling carefully</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></span>
                <span>Try without special chars</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></span>
                <span>Ensure public profile</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></span>
                <span>Case sensitive usernames</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 mb-8">
          <button
            onClick={handleGoBack}
            disabled={isGoingBack}
            className="w-full px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold text-lg rounded-xl hover:from-yellow-500 hover:to-orange-600 transform hover:scale-105 transition-all shadow-xl disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
          >
            {isGoingBack ? (
              <span className="flex items-center justify-center gap-3">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Going back to search...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <span>←</span>
                <span>Back to Search</span>
              </span>
            )}
          </button>
          
          <button
            onClick={() => router.push('/profile/octocat')}
            disabled={isGoingBack}
            className="w-full px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/30 transition-all border border-white/30 disabled:opacity-50"
          >
            <span className="flex items-center justify-center gap-2">
              <span>🐱</span>
              <span>Try Example: octocat</span>
            </span>
          </button>
        </div>

        {/* Popular Examples */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <h3 className="text-white font-semibold mb-4 flex items-center justify-center gap-2">
            <span>⭐</span>
            <span>Popular Profiles to Try</span>
          </h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {popularExamples.map((example) => (
              <button
                key={example}
                onClick={() => router.push(`/profile/${example}`)}
                disabled={isGoingBack}
                className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white/90 rounded-lg hover:bg-white/20 hover:text-white hover:scale-105 transition-all border border-white/20 text-sm font-medium disabled:opacity-50"
              >
                {example}
              </button>
            ))}
          </div>
        </div>

        {/* Additional Help */}
        <div className="mt-8 text-center">
          <p className="text-white/60 text-sm">
            Need help? Try searching for developers you know or explore trending profiles.
          </p>
        </div>
      </div>
    </div>
  )
}
