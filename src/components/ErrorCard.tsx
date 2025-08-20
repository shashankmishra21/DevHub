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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-pink-50 px-4">
      <div className="text-center max-w-md mx-auto">
        {/* Error Icon */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
            <span className="text-4xl">😕</span>
          </div>
        </div>

        {/* Error Message */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            User Not Found
          </h1>
          <div className="bg-red-50 rounded-lg p-4 mb-6">
            <p className="text-red-800 font-mono text-sm">
              "{username}"
            </p>
          </div>
          <p className="text-gray-700 mb-6">
            We couldn't find a GitHub profile with this username. Please check the spelling and try again.
          </p>
          
          {/* Suggestions */}
          <div className="text-left bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">💡 Suggestions:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Check the username spelling</li>
              <li>• Try without special characters</li>
              <li>• Make sure the user has a public profile</li>
              <li>• Try popular usernames like "octocat"</li>
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <button
            onClick={handleGoBack}
            disabled={isGoingBack}
            className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all shadow-md disabled:opacity-50 disabled:hover:scale-100"
          >
            {isGoingBack ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Going back...
              </span>
            ) : (
              '← Back to Search'
            )}
          </button>
          
          <button
            onClick={() => router.push('/profile/octocat')}
            className="w-full px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-all"
          >
            Try Example: octocat
          </button>
        </div>
      </div>
    </div>
  )
}
