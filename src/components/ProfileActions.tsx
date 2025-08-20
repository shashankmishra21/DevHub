'use client'

interface ProfileActionsProps {
  githubUrl: string
  userName: string
}

export default function ProfileActions({ githubUrl, userName }: ProfileActionsProps) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${userName} - GitHub Profile`,
        url: window.location.href
      })
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href)
      alert('Profile link copied to clipboard!')
    }
  }

  return (
    <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
      <a
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-xl hover:from-yellow-500 hover:to-orange-600 transform hover:scale-105 transition-all shadow-xl"
      >
        <span>View on GitHub</span>
        <span>↗</span>
      </a>
      <button
        onClick={handleShare}
        className="inline-flex items-center gap-2 px-6 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/30 transition-all border border-white/30"
      >
        <span>Share Profile</span>
        <span>📤</span>
      </button>
    </div>
  )
}
