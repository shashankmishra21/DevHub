'use client'

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useMemo } from 'react'

interface GitHubRepo {
  id: number
  language: string
}

const COLORS = [
  '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6',
  '#EC4899', '#06B6D4', '#84CC16', '#F97316', '#6366F1'
]

const LANGUAGE_COLORS: Record<string, string> = {
  'JavaScript': '#F7DF1E',
  'TypeScript': '#3178C6',
  'Python': '#3776AB',
  'Java': '#ED8B00',
  'C++': '#00599C',
  'C': '#A8B9CC',
  'HTML': '#E34F26',
  'CSS': '#1572B6',
  'React': '#61DAFB',
  'Vue': '#4FC08D',
  'Go': '#00ADD8',
  'Rust': '#000000',
  'PHP': '#777BB4',
  'Ruby': '#CC342D',
  'Swift': '#FA7343',
  'Kotlin': '#7F52FF',
}

export default function LanguagePieChart({ repos }: { repos: GitHubRepo[] }) {
  const chartData = useMemo(() => {
    const languageCount: Record<string, number> = {}

    repos.forEach((repo) => {
      const lang = repo.language || 'Other'
      languageCount[lang] = (languageCount[lang] || 0) + 1
    })

    return Object.entries(languageCount)
      .map(([lang, count]) => ({
        name: lang,
        value: count,
        percentage: ((count / repos.length) * 100).toFixed(1)
      }))
      .sort((a, b) => b.value - a.value)
  }, [repos])

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800">{data.name}</p>
          <p className="text-sm text-gray-600">
            {data.value} repositories ({data.percentage}%)
          </p>
        </div>
      )
    }
    return null
  }

  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    if (percent < 0.05) return null // Don't show labels for very small slices
    
    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="font-semibold text-xs"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  if (chartData.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-4">📊</div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">No Language Data</h3>
        <p className="text-gray-600 text-sm">No language information available for the repositories.</p>
      </div>
    )
  }

  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        📊 Language Distribution
      </h3>
      
      {/* Chart */}
      <div className="h-80 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={CustomLabel}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={LANGUAGE_COLORS[entry.name] || COLORS[index % COLORS.length]} 
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="space-y-2">
        {chartData.slice(0, 6).map((item, index) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: LANGUAGE_COLORS[item.name] || COLORS[index % COLORS.length] }}
              ></div>
              <span className="text-sm font-medium text-gray-700">{item.name}</span>
            </div>
            <div className="text-sm text-gray-500">
              {item.value} ({item.percentage}%)
            </div>
          </div>
        ))}
        {chartData.length > 6 && (
          <div className="text-xs text-gray-400 pt-2">
            +{chartData.length - 6} more languages
          </div>
        )}
      </div>
    </div>
  )
}
