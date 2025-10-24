import Image from 'next/image'
import ErrorCard from '@/components/ErrorCard'
import RepoList from '@/components/RepoList'
import LanguagePieChart from '@/components/LanguagePieChart'
import ProfileActions from '@/components/ProfileActions'
import { Suspense } from 'react'

interface ProfilePageProps {
    params: Promise<{  // Changed: params is now a Promise
        username: string
    }>
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
    created_at: string
    company: string
    blog: string
    twitter_username: string
    email: string
}

interface GitHubRepo {
  id: number
  name: string
  description: string
  html_url: string
  stargazers_count: number
  language: string
  updated_at: string
  forks_count: number
  topics: string[]
  watchers_count: number
  size: number
}

export default async function ProfilePage({ params }: ProfilePageProps) {
    const { username } = await params
    
    try {
        const userRes = await fetch(`https://api.github.com/users/${username}`, {
            next: { revalidate: 300 }
        })

        if (!userRes.ok) {
            return <ErrorCard username={username} />
        }

        const user: GitHubUser = await userRes.json()

        // Fixed: Use the awaited username variable instead of params.username
        const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=12&type=public`, {
            next: { revalidate: 300 }
        })
        
        if (!reposRes.ok) {
            throw new Error('Failed to fetch repositories')
        }

        const repos: GitHubRepo[] = await reposRes.json()

        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-white bg-opacity-5 blur-3xl"></div>
                    <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-white bg-opacity-5 blur-3xl"></div>
                    <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-yellow-300 bg-opacity-5 blur-2xl"></div>
                </div>

                {/* Navigation Header */}
                <div className="relative z-10 bg-white/10 backdrop-blur-md border-b border-white/20">
                    <div className="max-w-7xl mx-auto px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <a 
                                    href="/" 
                                    className="flex items-center space-x-2 text-white hover:text-yellow-300 transition-colors"
                                >
                                    <span className="text-2xl">🚀</span>
                                    <span className="text-xl font-bold">DevHub</span>
                                </a>
                                <span className="text-white/50">/</span>
                                <span className="text-white/90">{user.login}</span>
                            </div>
                            <a
                                href="/"
                                className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all border border-white/30"
                            >
                                ← New Search
                            </a>
                        </div>
                    </div>
                </div>

                <main className="relative z-10">
                    {/* Hero Section */}
                    <div className="bg-white/10 backdrop-blur-md border-b border-white/20">
                        <div className="max-w-7xl mx-auto px-6 py-12">
                            <div className="flex flex-col lg:flex-row items-center gap-12">
                                {/* Avatar Section */}
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-400 rounded-full blur-lg opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                                    <div className="relative">
                                        <Image
                                            src={user.avatar_url}
                                            alt={`${user.login}'s avatar`}
                                            width={200}
                                            height={200}
                                            className="rounded-full border-4 border-white/30 shadow-2xl"
                                            priority
                                        />
                                        <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                                            <span className="text-white text-sm font-bold">✓</span>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* User Info */}
                                <div className="text-center lg:text-left flex-1">
                                    <div className="mb-6">
                                        <h1 className="text-5xl font-bold text-white mb-3 drop-shadow-lg">
                                            {user.name || user.login}
                                        </h1>
                                        <p className="text-2xl text-blue-200 mb-4">@{user.login}</p>
                                        
                                        {user.bio && (
                                            <p className="text-lg text-white/90 mb-6 max-w-2xl leading-relaxed">
                                                {user.bio}
                                            </p>
                                        )}
                                    </div>
                                    
                                    {/* User Details */}
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-white/90 mb-8">
                                        {user.location && (
                                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20">
                                                <span>📍</span>
                                                <span className="text-sm">{user.location}</span>
                                            </div>
                                        )}
                                        {user.company && (
                                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20">
                                                <span>🏢</span>
                                                <span className="text-sm">{user.company}</span>
                                            </div>
                                        )}
                                        {user.blog && (
                                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20">
                                                <span>🌐</span>
                                                <a href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`} 
                                                   target="_blank" 
                                                   rel="noopener noreferrer"
                                                   className="text-sm hover:text-yellow-300 transition-colors">
                                                    Website
                                                </a>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20">
                                            <span>📅</span>
                                            <span className="text-sm">
                                                {new Date(user.created_at).getFullYear()}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Stats */}
                                    <div className="flex flex-wrap justify-center lg:justify-start gap-8 mb-8">
                                        <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/20 hover:bg-white/15 transition-all">
                                            <div className="text-3xl font-bold text-yellow-300">{user.followers.toLocaleString()}</div>
                                            <div className="text-sm text-white/70">Followers</div>
                                        </div>
                                        <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/20 hover:bg-white/15 transition-all">
                                            <div className="text-3xl font-bold text-green-300">{user.following.toLocaleString()}</div>
                                            <div className="text-sm text-white/70">Following</div>
                                        </div>
                                        <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/20 hover:bg-white/15 transition-all">
                                            <div className="text-3xl font-bold text-purple-300">{user.public_repos.toLocaleString()}</div>
                                            <div className="text-sm text-white/70">Public Repos</div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <ProfileActions 
                                        githubUrl={user.html_url}
                                        userName={user.name || user.login}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="max-w-7xl mx-auto px-6 py-12">
                        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                            {/* Repositories Section */}
                            <div className="xl:col-span-3">
                                <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-8">
                                    <div className="flex items-center justify-between mb-8">
                                        <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                                            📦 Latest Repositories
                                            <span className="text-lg font-normal text-white/70 bg-white/10 px-3 py-1 rounded-full">
                                                {repos.length}
                                            </span>
                                        </h2>
                                        <div className="text-white/60 text-sm">
                                            Updated recently
                                        </div>
                                    </div>
                                    <Suspense fallback={
                                        <div className="space-y-4">
                                            {[...Array(6)].map((_, i) => (
                                                <div key={i} className="bg-white/5 rounded-xl p-6 animate-pulse">
                                                    <div className="h-6 bg-white/10 rounded mb-3"></div>
                                                    <div className="h-4 bg-white/10 rounded mb-2 w-3/4"></div>
                                                    <div className="h-4 bg-white/10 rounded w-1/2"></div>
                                                </div>
                                            ))}
                                        </div>
                                    }>
                                        <RepoList repos={repos} />
                                    </Suspense>
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className="xl:col-span-1 space-y-6">
                                {/* Language Chart */}
                                <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6">
                                    <Suspense fallback={
                                        <div className="animate-pulse">
                                            <div className="h-6 bg-white/10 rounded mb-4"></div>
                                            <div className="h-64 bg-white/10 rounded"></div>
                                        </div>
                                    }>
                                        <LanguagePieChart repos={repos} />
                                    </Suspense>
                                </div>

                                {/* Quick Stats */}
                                <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6">
                                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                        📊 Quick Stats
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center text-white/90">
                                            <span>Total Stars</span>
                                            <span className="font-semibold text-yellow-300">
                                                {repos.reduce((sum, repo) => sum + repo.stargazers_count, 0).toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center text-white/90">
                                            <span>Total Forks</span>
                                            <span className="font-semibold text-green-300">
                                                {repos.reduce((sum, repo) => sum + repo.forks_count, 0).toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center text-white/90">
                                            <span>Languages</span>
                                            <span className="font-semibold text-purple-300">
                                                {new Set(repos.map(r => r.language).filter(Boolean)).size}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center text-white/90">
                                            <span>Avg Stars/Repo</span>
                                            <span className="font-semibold text-blue-300">
                                                {repos.length ? Math.round(repos.reduce((sum, repo) => sum + repo.stargazers_count, 0) / repos.length) : 0}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Recent Activity */}
                                <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6">
                                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                        ⚡ Recent Activity
                                    </h3>
                                    <div className="space-y-3">
                                        {repos.slice(0, 3).map((repo) => (
                                            <div key={repo.id} className="text-sm">
                                                <div className="text-white/90 font-medium truncate">
                                                    {repo.name}
                                                </div>
                                                <div className="text-white/60 text-xs">
                                                    Updated {new Date(repo.updated_at).toLocaleDateString()}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        )
    } catch (error) {
        // username is already available from the await at the top
        return <ErrorCard username={username} />
    }
}
