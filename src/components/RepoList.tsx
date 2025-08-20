'use client'

import { useState, useMemo } from 'react'

interface GitHubRepo {
  id: number
  name: string
  description: string
  html_url: string
  stargazers_count: number
  language: string
  updated_at: string
  forks_count: number
  topics?: string[]
}

export default function RepoList({ repos }: { repos: GitHubRepo[] }) {
  const [sortBy, setSortBy] = useState<'stars' | 'name' | 'updated' | 'forks'>('updated')
  const [filterLang, setFilterLang] = useState<string>('All')
  const [searchTerm, setSearchTerm] = useState('')

  const languages = useMemo(() => {
    const langs = repos.map((r) => r.language).filter(Boolean)
    return ['All', ...Array.from(new Set(langs)).sort()]
  }, [repos])

  const displayedRepos = useMemo(() => {
    let filtered = repos

    // Filter by language
    if (filterLang !== 'All') {
      filtered = filtered.filter((repo) => repo.language === filterLang)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((repo) => 
        repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (repo.description && repo.description.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Sort
    let sorted = [...filtered]
    switch (sortBy) {
      case 'stars':
        sorted.sort((a, b) => b.stargazers_count - a.stargazers_count)
        break
      case 'forks':
        sorted.sort((a, b) => b.forks_count - a.forks_count)
        break
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'updated':
      default:
        sorted.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
        break
    }

    return sorted
  }, [repos, sortBy, filterLang, searchTerm])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-50 rounded-lg">
        {/* Search */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search repositories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        {/* Sort */}
        <div className="flex gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="updated">🕒 Recently Updated</option>
            <option value="stars">⭐ Most Stars</option>
            <option value="forks">🍴 Most Forks</option>
            <option value="name">📛 Name A-Z</option>
          </select>

          <select
            value={filterLang}
            onChange={(e) => setFilterLang(e.target.value)}
            className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang === 'All' ? '🌐 All Languages' : lang}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>
          Showing {displayedRepos.length} of {repos.length} repositories
        </span>
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="text-blue-600 hover:underline"
          >
            Clear search
          </button>
        )}
      </div>

      {/* Repository Grid */}
      {displayedRepos.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">📭</div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No repositories found</h3>
          <p className="text-gray-600">
            {searchTerm ? 'Try adjusting your search terms' : 'No repositories match your current filters'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {displayedRepos.map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 border border-gray-200 rounded-xl hover:shadow-lg hover:border-blue-300 transition-all duration-200 bg-white"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-blue-700 group-hover:text-blue-800 truncate pr-2">
                  {repo.name}
                </h3>
                <div className="flex-shrink-0 text-gray-400 group-hover:text-blue-600 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                {repo.description || 'No description provided'}
              </p>

              {/* Topics */}
              {repo.topics && repo.topics.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {repo.topics.slice(0, 3).map((topic) => (
                    <span
                      key={topic}
                      className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                    >
                      {topic}
                    </span>
                  ))}
                  {repo.topics.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{repo.topics.length - 3}
                    </span>
                  )}
                </div>
              )}

              {/* Stats */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4 text-gray-500">
                  <div className="flex items-center gap-1">
                    <span>⭐</span>
                    <span>{repo.stargazers_count.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>🍴</span>
                    <span>{repo.forks_count.toLocaleString()}</span>
                  </div>
                  {repo.language && (
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span>{repo.language}</span>
                    </div>
                  )}
                </div>
                <span className="text-gray-400 text-xs">
                  {formatDate(repo.updated_at)}
                </span>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
