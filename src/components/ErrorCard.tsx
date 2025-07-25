'use client'

import { useRouter } from 'next/navigation'

export default function ErrorCard({ username }: { username: string }) {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-4">
      <h1 className="text-3xl font-bold text-red-600 mb-4">User “{username}” Not Found</h1>
      <p className="text-gray-700 mb-6">
        We couldn’t find a GitHub profile for that username. Please try again.
      </p>
      <button
        onClick={() => router.push('/')}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        ← Go Back Home
      </button>
    </div>
  )
}
