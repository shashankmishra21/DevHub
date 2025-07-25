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
}

export default function RepoList({ repos }: { repos: GitHubRepo[] }) {
  const [sortBy, setSortBy] = useState<'stars' | 'name' | 'updated'>('updated')
  const [filterLang, setFilterLang] = useState<string>('All')

  // Get unique languages from repo list
  const languages = useMemo(() => {
    const langs = repos.map((r) => r.language).filter(Boolean)
    return ['All', ...Array.from(new Set(langs))]
  }, [repos])

  // Filter + Sort Logic
  const displayedRepos = useMemo(() => {
    let filtered = filterLang === 'All'
      ? repos
      : repos.filter((repo) => repo.language === filterLang)

    let sorted = [...filtered]
    if (sortBy === 'stars') {
      sorted.sort((a, b) => b.stargazers_count - a.stargazers_count)
    } else if (sortBy === 'name') {
      sorted.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy === 'updated') {
      sorted.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    }

    return sorted
  }, [repos, sortBy, filterLang])

  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-6">
        <div>
          <label className="text-sm font-semibold">Sort By:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="ml-2 px-2 py-1 border rounded"
          >
            <option value="updated">🕒 Last Updated</option>
            <option value="stars">⭐ Stars</option>
            <option value="name">📛 Name</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-semibold">Filter By Language:</label>
          <select
            value={filterLang}
            onChange={(e) => setFilterLang(e.target.value)}
            className="ml-2 px-2 py-1 border rounded"
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayedRepos.map((repo) => (
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
    </div>
  )
}
