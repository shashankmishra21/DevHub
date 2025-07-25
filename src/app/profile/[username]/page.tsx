import Image from 'next/image'
import ErrorCard from '@/components/ErrorCard'

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

interface GitHubRepo {
    id: number
    name: string
    description: string
    html_url: string
    stargazers_count: number
    language: string
}

export default async function ProfilePage({ params }: ProfilePageProps) {
    const userRes = await fetch(`https://api.github.com/users/${params.username}`, {
        next: { revalidate: 60 }
    })

    if (!userRes.ok) {
        return <ErrorCard username={params.username} />
    }


    const user: GitHubUser = await userRes.json()

    const reposRes = await fetch(`https://api.github.com/users/${params.username}/repos?sort=updated&per_page=10`)
    const repos: GitHubRepo[] = await reposRes.json()

    return (
        <main className="min-h-screen bg-white p-8">
            <div className="flex flex-col items-center mb-8">
                <h1 className="text-3xl font-bold text-blue-800">{user.name || user.login}</h1>
                <Image
                    src={user.avatar_url}
                    alt={user.login}
                    width={150}
                    height={150}
                    className="rounded-full mt-2"
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
                    View on GitHub ↗
                </a>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Latest Repositories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {repos.map((repo) => (
                    <a
                        key={repo.id}
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 border border-gray-200 rounded hover:shadow transition"
                    >
                        <h3 className="text-lg font-semibold text-blue-700">{repo.name}</h3>
                        <p className="text-sm text-gray-600">{repo.description || 'No description'}</p>
                        <div className="flex justify-between text-xs text-gray-500 mt-2">
                            <span>⭐ {repo.stargazers_count}</span>
                            <span>{repo.language || 'N/A'}</span>
                        </div>
                    </a>
                ))}
            </div>
        </main>
    )
}
