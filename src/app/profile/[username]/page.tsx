import Image from 'next/image'

interface ProfilePageProps {
  params: {
    username: string
  }
}

interface GitHubUser {
  login: string
  name: string
  avatar_url: string
  bio: string
  location: string
  public_repos: number
  followers: number
  following: number
  html_url: string
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const res = await fetch(`https://api.github.com/users/${params.username}`, {
    next: { revalidate: 60 } // cache for 60 seconds
  })

  if (!res.ok) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-xl text-red-600 font-semibold">User not found ❌</h1>
      </div>
    )
  }

  const user: GitHubUser = await res.json()

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white p-8">
      <h1 className="text-3xl font-bold text-blue-800 mb-4">{user.name || user.login}</h1>
      <Image
        src={user.avatar_url}
        alt={user.login}
        width={150}
        height={150}
        className="rounded-full"
      />
      <p className="text-gray-700 mt-2">{user.bio}</p>
      <p className="text-sm text-gray-500">📍 {user.location || 'Unknown'}</p>
      <div className="flex gap-4 mt-4 text-sm text-gray-600">
        <p>👥 Followers: {user.followers}</p>
        <p>📦 Repos: {user.public_repos}</p>
        <p>🔁 Following: {user.following}</p>
      </div>
      <a
        href={user.html_url}
        target="_blank"
        className="mt-4 text-blue-600 underline"
        rel="noopener noreferrer"
      >
        View on GitHub
      </a>
    </main>
  )
}
