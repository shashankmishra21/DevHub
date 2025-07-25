'use client'

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface GitHubRepo {
  id: number
  language: string
}

const COLORS = [
  '#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1',
  '#a4de6c', '#d0ed57', '#d8854f', '#ffbb28', '#ff6666'
]

export default function LanguagePieChart({ repos }: { repos: GitHubRepo[] }) {
  // Count language usage
  const languageCount: Record<string, number> = {}

  repos.forEach((repo) => {
    const lang = repo.language || 'Unknown'
    languageCount[lang] = (languageCount[lang] || 0) + 1
  })

  const chartData = Object.entries(languageCount).map(([lang, count]) => ({
    name: lang,
    value: count,
  }))

  return (
    <div className="w-full h-96 mt-10 p-4 border rounded shadow bg-white">
      <h3 className="text-xl font-semibold mb-4 text-center">Language Breakdown</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
